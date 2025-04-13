// src/pages/User/Stores.tsx
import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../../api/apiClient";

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: string;
  userRating: number | null;
  owner: {
    name: string;
    email: string;
  };
}

export default function UserStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<Store[]>("/user/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data);
      } catch (err) {
        console.error("Failed to fetch stores", err);
      }
    };

    fetchStores();
  }, []);

  const submitRating = async (storeId: number, rating: number) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/user/rate-store",
        { storeId, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Rating submitted!");
      location.reload();
    } catch (err) {
      console.error("Rating failed", err);
      alert("Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">🏪 Browse Stores</h2>
      <div className="grid gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white p-6 rounded shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{store.name}</h3>
            <p className="text-gray-600">📍 {store.address}</p>
            <p className="text-gray-600">
              ⭐ Average: {store.averageRating} | Your Rating: {store.userRating ?? "N/A"}
            </p>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  disabled={submitting}
                  onClick={() => submitRating(store.id, star)}
                  className={`px-3 py-1 rounded-md text-sm font-semibold border transition ${
                    store.userRating === star
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {star} ⭐
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}
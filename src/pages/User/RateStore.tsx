// src/pages/User/RateStore.tsx
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
}

export default function RateStore() {
  const [stores, setStores] = useState<Store[]>([]);
  const [ratings, setRatings] = useState<Record<number, number>>({});

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

  const handleRatingChange = (storeId: number, rating: number) => {
    setRatings((prev) => ({ ...prev, [storeId]: rating }));
  };

  const handleSubmit = async (storeId: number) => {
    const token = localStorage.getItem("token");
    const rating = ratings[storeId];

    try {
      await api.post(
        "/user/rate-store",
        { storeId, rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Rating submitted successfully");
    } catch (err) {
        console.error("Rating submission failed:", err);
        alert("Failed to submit rating");
      }
      
  };

  return (
    <UserLayout>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">🏬 Rate Stores</h2>
      <div className="grid gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{store.name}</h3>
            <p className="text-sm text-gray-600">{store.address}</p>
            <p className="text-sm text-gray-600">⭐ Average Rating: {store.averageRating}</p>

            <div className="mt-4">
              <label className="block text-sm text-gray-700 mb-1">Your Rating</label>
              <select
                className="border px-4 py-2 rounded-md"
                value={ratings[store.id] || ""}
                onChange={(e) => handleRatingChange(store.id, parseInt(e.target.value))}
              >
                <option value="">Select rating</option>
                {[1, 2, 3, 4, 5].map((val) => (
                  <option key={val} value={val}>
                    {val} Star{val > 1 ? "s" : ""}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleSubmit(store.id)}
                className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}

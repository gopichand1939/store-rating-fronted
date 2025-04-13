// src/pages/Owner/Store.tsx
import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import OwnerLayout from "../../layouts/OwnerLayout";

interface Rating {
  rating: number;
  user: {
    name: string;
    email: string;
  };
}

interface Store {
  name: string;
  email: string;
  address: string;
  averageRating: string;
  totalRatings: number;
  ratedBy: Rating[];
}

export default function OwnerStore() {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<Store>("/owner/store", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStore(res.data);
      } catch (error) {
        console.error("Failed to fetch store info", error);
      }
    };

    fetchStore();
  }, []);

  return (
    <OwnerLayout>
      <h2 className="text-2xl font-bold mb-6 text-purple-700">🏬 My Store</h2>

      {store ? (
        <div className="bg-white shadow-md p-6 rounded-md">
          <p className="text-xl font-semibold">{store.name}</p>
          <p className="text-gray-600 mb-1">📧 {store.email}</p>
          <p className="text-gray-600 mb-1">📍 {store.address}</p>
          <p className="text-gray-800 mt-2">
            ⭐ {store.averageRating} ({store.totalRatings} ratings)
          </p>

          <div className="mt-4">
            <h3 className="font-bold mb-2">🗳 User Ratings:</h3>
            {store.ratedBy.map((entry, idx) => (
              <div key={idx} className="border p-2 rounded mb-2">
                <p className="text-sm">👤 {entry.user.name} ({entry.user.email})</p>
                <p className="text-yellow-600">⭐ Rating: {entry.rating}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading store info...</p>
      )}
    </OwnerLayout>
  );
}

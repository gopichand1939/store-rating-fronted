// src/pages/Admin/Stores.tsx
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/apiClient";

interface Store {
  id: number;
  name: string;
  email: string;
  address: string;
  averageRating: string;
  totalRatings: number;
  owner: {
    name: string;
    email: string;
  };
}

export default function AdminStores() {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<Store[]>("/admin/stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStores(res.data);
      } catch (err) {
        console.error("Failed to fetch stores", err);
      }
    };

    fetchStores();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">🏬 All Stores</h2>

      <div className="grid gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="bg-white p-6 rounded shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{store.name}</h3>
            <p className="text-gray-600">📧 {store.email}</p>
            <p className="text-gray-600">📍 {store.address}</p>
            <p className="text-gray-600">
              ⭐ {store.averageRating} ({store.totalRatings} ratings)
            </p>
            <p className="text-sm text-gray-500 mt-2">
              👤 Owner: {store.owner.name} ({store.owner.email})
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

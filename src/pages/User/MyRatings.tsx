// src/pages/User/MyRatings.tsx
import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../../api/apiClient";

interface Store {
  name: string;
  address: string;
}

interface Rating {
  id: number;
  rating: number;
  store: Store;
}

export default function MyRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<Rating[]>("/user/my-ratings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRatings(res.data);
      } catch (err) {
        console.error("Failed to fetch ratings", err);
      }
    };

    fetchRatings();
  }, []);

  return (
    <UserLayout>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">⭐ My Ratings</h2>

      <div className="grid gap-6">
        {ratings.length === 0 ? (
          <p>You haven’t rated any stores yet.</p>
        ) : (
          ratings.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-800">{r.store.name}</h3>
              <p className="text-gray-600">📍 {r.store.address}</p>
              <p className="text-indigo-600 font-medium">Your Rating: {r.rating}</p>
            </div>
          ))
        )}
      </div>
    </UserLayout>
  );
}

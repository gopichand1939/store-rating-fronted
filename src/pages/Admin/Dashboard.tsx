// src/pages/Admin/Dashboard.tsx
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/apiClient";

interface DashboardStats {
  users: number;
  stores: number;
  ratings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<DashboardStats>("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };
  
    fetchStats();
  }, []);
  

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">📊 Dashboard Overview</h2>
      {stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-4xl font-bold text-indigo-600">{stats.users}</p>
            <p className="text-gray-700 mt-2">Total Users</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-4xl font-bold text-indigo-600">{stats.stores}</p>
            <p className="text-gray-700 mt-2">Total Stores</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-4xl font-bold text-indigo-600">{stats.ratings}</p>
            <p className="text-gray-700 mt-2">Total Ratings</p>
          </div>
        </div>
      ) : (
        <p>Loading stats...</p>
      )}
    </AdminLayout>
  );
}

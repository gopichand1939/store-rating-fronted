import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import AdminLayout from "../../layouts/AdminLayout";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  ratingCount: number;
  store?: {
    id: number;
    name: string;
    email: string;
    address: string;
  } | null;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get<User[]>("/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">👥 All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Ratings</th>
              <th className="py-2 px-4">Store</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4 text-center">{user.ratingCount}</td>
                <td className="py-2 px-4">
                  {user.store ? (
                    <>
                      <div>{user.store.name}</div>
                      <div className="text-sm text-gray-500">{user.store.email}</div>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

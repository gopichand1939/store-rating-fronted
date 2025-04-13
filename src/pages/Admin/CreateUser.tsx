import { useState } from "react";
import api from "../../api/apiClient";
import AdminLayout from "../../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
       await api.post(
        "/admin/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ User Created");
      navigate("/admin/users");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error?.response?.data?.message || "Failed to create user";
      alert(message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">➕ Create New User</h2>

      <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full border px-4 py-2 rounded-md"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <select
          className="w-full border px-4 py-2 rounded-md"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="USER">USER</option>
          <option value="OWNER">OWNER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create User
        </button>
      </form>
    </AdminLayout>
  );
}

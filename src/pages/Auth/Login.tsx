import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient";

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "ADMIN" | "USER" | "OWNER";
  };
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<LoginResponse>("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id.toString());

      if (user.role === "ADMIN") navigate("/admin/dashboard");
      else if (user.role === "USER") navigate("/user/dashboard");
      else if (user.role === "OWNER") navigate("/owner/dashboard");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error?.response?.data?.message || "Login failed!";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

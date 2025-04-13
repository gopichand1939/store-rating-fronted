import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  address: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const validate = (): boolean => {
    const { name, email, password, address } = formData;

    if (name.length < 20 || name.length > 60) {
      alert("Name must be 20 to 60 characters.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be 8–16 chars with 1 uppercase & 1 special character.");
      return false;
    }

    if (address.length > 400) {
      alert("Address must be less than 400 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.post("/auth/register", {
        ...formData,
        role: "USER",
      });

      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
        if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          typeof (err as { response: { data?: { message?: string } } }).response === "object"
        ) {
          const typedErr = err as { response: { data?: { message?: string } } };
          alert(typedErr.response.data?.message || "Registration failed!");
        } else {
          alert("Something went wrong!");
        }
      }
      
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
          />

          <textarea
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border px-4 py-2 rounded-md"
            rows={3}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

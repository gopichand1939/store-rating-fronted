// src/layouts/UserLayout.tsx
import { useNavigate } from "react-router-dom";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

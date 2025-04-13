import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminStores from "./pages/Admin/Stores";
import CreateUser from "./pages/Admin/CreateUser";

import UserDashboard from "./pages/User/Dashboard";
import UserStores from "./pages/User/Stores";
import MyRatings from "./pages/User/MyRatings";

import OwnerDashboard from "./pages/Owner/Dashboard";
import OwnerStore from "./pages/Owner/Store";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/create-user"
          element={role === "ADMIN" ? <CreateUser /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/users"
          element={role === "ADMIN" ? <AdminUsers /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/stores"
          element={role === "ADMIN" ? <AdminStores /> : <Navigate to="/" />}
        />

        {/* User */}
        <Route
          path="/user/dashboard"
          element={role === "USER" ? <UserDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/user/stores"
          element={role === "USER" ? <UserStores /> : <Navigate to="/" />}
        />
        <Route
          path="/user/ratings"
          element={role === "USER" ? <MyRatings /> : <Navigate to="/" />}
        />

        {/* Owner */}
        <Route
          path="/owner/dashboard"
          element={role === "OWNER" ? <OwnerDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/owner/store"
          element={role === "OWNER" ? <OwnerStore /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

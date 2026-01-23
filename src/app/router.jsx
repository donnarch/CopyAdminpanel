import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Home from "../Pages/Home";
import Inventory from "../Pages/Inventory";
import SoldPhones from "../Pages/SoldPhones";
import Auth from "../Pages/Auth";
import Expenses from "../Pages/Expenses";
import Settings from "../Pages/Settings";
import TopSelling from "../Pages/TopSelling";

// ✅ Protected Route - Login qilmagan bo'lsa auth'ga yuboradi
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? element : <Navigate to="/auth" replace />;
};

export const router = createBrowserRouter([
  // ✅ AUTH PAGE
  {
    path: "/auth",
    element: <Auth />,
  },

  // ✅ PROTECTED ADMIN ROUTES
  {
    path: "/",
    element: <ProtectedRoute element={<AdminLayout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: "inventory", element: <Inventory /> },
      { path: "sold", element: <SoldPhones /> },
      { path: "expenses", element: <Expenses /> },
      { path: "settings", element: <Settings /> },
      { path: "top-selling", element: <TopSelling /> },
    ],
  },

  // ✅ 404 - Boshqa barcha route'larni homega yuborish
  { path: "*", element: <Navigate to="/" replace /> },
]);

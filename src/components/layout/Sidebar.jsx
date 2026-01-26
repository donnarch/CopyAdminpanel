import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Warehouse,
  ShoppingBag,
  TrendingUp,
  Coins,
  Settings,
  Smartphone,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Ombor", to: "/inventory", icon: Warehouse },
  { title: "Sotilgan", to: "/sold", icon: ShoppingBag, badge: "" },
  { title: "Top sotuv", to: "/top-selling", icon: TrendingUp },
  { title: "Chiqimlar", to: "/expenses", icon: Coins },
  { title: "Sozlamalar", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // ✅ Logout funksiyasi
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/auth");
  };

  // ✅ currentUser'ni localStorage'dan olish
  const currentUser = localStorage.getItem("currentUser");
  const user = currentUser ? JSON.parse(currentUser) : null;

  return (
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-black  md:flex md:flex-col">
      {/* ========== Header ========== */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white">
            <Smartphone size={18} />
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Phone Admin
            </p>
          </div>
        </div>
      </div>

      {/* ========== Navigation ========== */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white dark:bg-black dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <span className="rounded-full bg-black px-2 py-0.5 text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ========== User Profile & Logout ========== */}
      <div className="border-t border-gray-300 p-3 dark:border-black cursor-pointer">
        <div className="relative cursor-pointer">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white flex-shrink-0">
              <User size={18} />
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name || "Foydalanuvchi"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || "email@example.com"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                showUserMenu ? "rotate-180" : ""
              } text-gray-400 dark:text-gray-300`}
            />
          </button>

          {/* ========== Dropdown Menu ========== */}
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-black shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Settings size={16} />
                <span>Sozlamalar</span>
              </button>

              <div className="border-t border-gray-300 dark:border-black"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium cursor-pointer"
              >
                <LogOut size={16} />
                <span>Chiqish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

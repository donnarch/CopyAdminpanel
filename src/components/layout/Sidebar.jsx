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
  { title: "Sotilgan", to: "/sold", icon: ShoppingBag, badge: "NEW" },
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
    <aside className="sticky top-0 hidden h-screen w-64 border-r border-zinc-200 bg-white md:flex md:flex-col dark:border-zinc-800 dark:bg-zinc-900">
      {/* ========== Header ========== */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">
            <Smartphone size={18} />
          </div>

          <div>
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
              Phone Admin
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Admin Panel
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
                    ? "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200"
                }`
              }
            >
              <Icon size={20} className="flex-shrink-0" />

              <span className="flex-1">{item.title}</span>

              {item.badge && (
                <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ========== User Profile & Logout ========== */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800 cursor-pointer">
        <div className="relative cursor-pointer">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white flex-shrink-0">
              <User size={18} />
            </div>

            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {user?.name || "Foydalanuvchi"}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {user?.email || "email@example.com"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                showUserMenu ? "rotate-180" : ""
              } text-zinc-400`}
            />
          </button>

          {/* ========== Dropdown Menu ========== */}
          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <Settings size={16} />
                <span>Sozlamalar</span>
              </button>

              <div className="border-t border-zinc-200 dark:border-zinc-700"></div>

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

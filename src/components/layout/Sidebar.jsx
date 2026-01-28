import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
  X,
  Menu,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", to: "/", icon: LayoutDashboard },
  { title: "Ombor", to: "/inventory", icon: Warehouse },
  { title: "Sotilgan", to: "/sold", icon: ShoppingBag, badge: "" },
  { title: "Top sotuv", to: "/top-selling", icon: TrendingUp },
  { title: "Chiqimlar", to: "/expenses", icon: Coins },
  { title: "Sozlamalar", to: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // ✅ Ekran o'lchamini aniqlash
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // ✅ Mobile bo'lsa va route o'zgarsa sidebar yopish
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile]);
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
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
  fixed inset-y-0 left-0 z-40 w-64 flex flex-col
  border-r border-gray-300 bg-white shadow-xl
  transition-transform duration-300 ease-in-out
  dark:border-gray-800 dark:bg-zinc-900
  lg:relative lg:inset-y-auto lg:translate-x-0 lg:shadow-none
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
`}
      >
        {/* ========== Mobile Header ========== */}
        <div className="flex items-center justify-between border-b border-gray-300 p-4 lg:hidden dark:border-gray-800">
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
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Yopish"
          >
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
        {/* ========== Desktop Header ========== */}
        <div className="hidden p-6 pb-4 lg:block">
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
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-black text-white dark:bg-black dark:text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white"
                  }`
                }
                onClick={() => {
                  if (isMobile) onClose();
                }}
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
        <div className="border-t border-gray-300 p-3 dark:border-gray-800">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white flex-shrink-0">
                <User size={18} />
              </div>

              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {user?.name || "Foydalanuvchi"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email || "email@example.com"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform flex-shrink-0 ${
                  showUserMenu ? "rotate-180" : ""
                } text-gray-400 dark:text-gray-300`}
              />
            </button>

            {/* ========== Dropdown Menu ========== */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 z-50 bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-800 shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate("/settings");
                    if (isMobile) onClose();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings size={16} />
                  <span>Sozlamalar</span>
                </button>

                <div className="border-t border-gray-300 dark:border-gray-800"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium"
                >
                  <LogOut size={16} />
                  <span>Chiqish</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

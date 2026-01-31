import {
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  CreditCard,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Yangi xarajat qo'shildi",
      description: "Telefon sotib olish - $5,000",
      time: "5 daqiqa oldin",
      unread: true,
      icon: <CreditCard className="w-4 h-4" />,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Hisobot tayyor",
      description: "Oy yakunlari hisobot",
      time: "1 soat oldin",
      unread: true,
      icon: <Shield className="w-4 h-4" />,
      color: "bg-emerald-500",
    },
    {
      id: 3,
      title: "Tizim yangilanishi",
      description: "Yangi funksiyalar qo'shildi",
      time: "Kun oldin",
      unread: false,
      icon: <HelpCircle className="w-4 h-4" />,
      color: "bg-purple-500",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "shadow-2xl border-b border-white/10 dark:border-zinc-800/50"
          : "border-b border-zinc-100 dark:border-zinc-800"
      }`}
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(135deg, #09090b 0%, #18181b 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="lg:hidden p-3 rounded-2xl">
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Theme */}
          <button onClick={toggleTheme} className="p-3 rounded-2xl">
            {theme === "dark" ? <Sun /> : <Moon />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-3 rounded-2xl relative"
            >
              <Bell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">
                {notifications.map((n) => (
                  <div key={n.id} className="p-4 border-b dark:border-zinc-800">
                    <p className="font-semibold">{n.title}</p>
                    <p className="text-sm text-zinc-500">{n.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-2xl"
            >
              <img
                src="https://abcmedia.am/wp-content/uploads/2025/04/ywzjnzi3owjhodawnjvmny5t9klxwqapid9oaf_hgpzrguqulk4lzujp5xdotlp2mmg5evob_tnauk8uf-vhemkotrvpnslkvym-ydwg6mvfw_nol3sxsuer_uykolvzxlssvhxz-nglmwmuf7p6qrki07ulyejxo391gamgsbmce9maserbkxhvc-s_mvef.webp"
                className="h-9 w-9 rounded-full object-cover"
              />
              <ChevronDown size={16} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl">
                <Link
                  to="/profile"
                  className="flex gap-3 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <User /> Profilim
                </Link>
                <Link
                  to="/settings"
                  className="flex gap-3 p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <Settings /> Sozlamalar
                </Link>
                <button className="flex gap-3 p-4 text-red-500 w-full">
                  <LogOut /> Chiqish
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

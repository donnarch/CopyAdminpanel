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
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "Yangi buyurtma",
      description: "iPhone 15 sotib olindi",
      time: "5 daqiqa oldin",
      unread: true,
    },
    {
      id: 2,
      title: "Xabar",
      description: "Mijoz savoli mavjud",
      time: "1 soat oldin",
      unread: true,
    },
    {
      id: 3,
      title: "Tizim yangilanishi",
      description: "Yangi funksiyalar qo'shildi",
      time: "Kun oldin",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white/95 backdrop-blur-xl
                      dark:border-zinc-800/70 dark:bg-zinc-900/95 shadow-sm"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile menu toggle */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-xl p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800
                     transition-colors active:scale-95"
            aria-label={isSidebarOpen ? "Yopish" : "Ochish"}
          >
            {isSidebarOpen ? (
              <X size={22} className="text-zinc-700 dark:text-zinc-300" />
            ) : (
              <Menu size={22} className="text-zinc-700 dark:text-zinc-300" />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={toggleTheme}
            className="relative rounded-xl p-2.5 border border-zinc-200 bg-white shadow-sm
                     hover:bg-zinc-50 active:scale-95 transition-all duration-200
                     dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700
                     group overflow-hidden"
            aria-label={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 
                          group-hover:from-blue-500/10 group-hover:to-purple-500/10 
                          transition-all duration-300"
            />
            {theme === "dark" ? (
              <Sun
                size={20}
                className="relative text-zinc-200 group-hover:text-yellow-400 
                                      transition-colors duration-200"
              />
            ) : (
              <Moon
                size={20}
                className="relative text-zinc-700 group-hover:text-purple-600 
                                       transition-colors duration-200"
              />
            )}
          </button>

          {/* Notifications with dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-xl p-2.5 border border-zinc-200 bg-white shadow-sm
                       hover:bg-zinc-50 active:scale-95 transition-all duration-200
                       dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700
                       group"
              aria-label="Bildirishnomalar"
            >
              <Bell
                size={20}
                className="text-zinc-700 dark:text-zinc-200 
                         group-hover:text-blue-600 dark:group-hover:text-blue-400
                         transition-colors duration-200"
              />
              {unreadCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center 
                           rounded-full bg-red-500 text-xs font-semibold text-white
                           animate-pulse shadow-sm"
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-800 
                            border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl 
                            py-2 z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Bildirishnomalar
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {unreadCount} ta o'qilmagan
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 
                                transition-colors cursor-pointer ${
                                  notification.unread
                                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                                    : ""
                                }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.unread
                              ? "bg-blue-100 dark:bg-blue-900/30"
                              : "bg-zinc-100 dark:bg-zinc-700"
                          }`}
                        >
                          <Bell
                            size={14}
                            className={
                              notification.unread
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-zinc-500"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                            {notification.title}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5 truncate">
                            {notification.description}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-700 px-4 py-2.5">
                  <button
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                                   dark:hover:text-blue-300 font-medium w-full text-center py-2
                                   hover:bg-zinc-50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
                  >
                    Hammasini ko'rish
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile with dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 
                       bg-white px-3 py-2 hover:bg-zinc-50 transition-all duration-200
                       dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700
                       active:scale-95"
            >
              <div className="relative">
                <img
                  src="https://abcmedia.am/wp-content/uploads/2025/04/ywzjnzi3owjhodawnjvmny5t9klxwqapid9oaf_hgpzrguqulk4lzujp5xdotlp2mmg5evob_tnauk8uf-vhemkotrvpnslkvym-ydwg6mvfw_nol3sxsuer_uykolvzxlssvhxz-nglmwmuf7p6qrki07ulyejxo391gamgsbmce9maserbkxhvc-s_mvef.webp"
                  alt="Profile"
                  className="h-9 w-9 rounded-full object-cover border-2 border-white 
                           dark:border-zinc-700 shadow-sm"
                />
                <div
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full 
                              border-2 border-white dark:border-zinc-800 bg-emerald-500"
                />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Doniyor
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Admin
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`hidden lg:block text-zinc-500 transition-transform duration-200 
                         ${showProfileMenu ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mobile profile button */}
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="lg:hidden rounded-xl p-2.5 border border-zinc-200 bg-white 
                       hover:bg-zinc-50 transition-colors dark:border-zinc-700 
                       dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <User size={20} className="text-zinc-700 dark:text-zinc-200" />
            </button>

            {/* Profile dropdown menu */}
            {showProfileMenu && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 
                            border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl 
                            py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-700">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Doniyor
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    odiljonovd994@gmail.com
                  </p>
                </div>

                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm 
                                       text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 
                                       dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <User size={16} />
                    Profilim
                  </a>
                  <Link
                    to="settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm 
                                       text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 
                                       dark:hover:bg-zinc-700/50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings size={16} />
                    Sozlamalar
                  </Link>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-700 py-1">
                  <button
                    className="flex items-center gap-3 px-4 py-2.5 text-sm 
                                   text-red-600 dark:text-red-400 hover:bg-red-50 
                                   dark:hover:bg-red-900/10 w-full transition-colors"
                  >
                    <LogOut size={16} />
                    Chiqish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { Bell, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-30 w-full border-b border-zinc-200/70 bg-white/90 backdrop-blur-md
               dark:border-zinc-800 dark:bg-zinc-900/90"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3 md:px-6 lg:px-8">
        {/* Left section: Mobile menu button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile menu toggle button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label={isSidebarOpen ? "Yopish" : "Ochish"}
          >
            {isSidebarOpen ? (
              <X size={20} className="text-zinc-700 dark:text-zinc-300" />
            ) : (
              <Menu size={20} className="text-zinc-700 dark:text-zinc-300" />
            )}
          </button>
        </div>

        {/* Right section: Theme, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-xl p-2 border border-zinc-200 bg-white shadow-sm
                     hover:bg-zinc-50 active:scale-95 transition-transform
                     dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700
                     sm:rounded-2xl sm:p-2"
            aria-label={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-zinc-200 sm:size-[18px]" />
            ) : (
              <Moon size={18} className="text-zinc-700 sm:size-[18px]" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative rounded-xl p-2 border border-zinc-200 bg-white shadow-sm
                     hover:bg-zinc-50 active:scale-95 transition-transform
                     dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700
                     sm:rounded-2xl sm:p-2"
            aria-label="Bildirishnomalar"
          >
            <Bell
              size={18}
              className="text-zinc-700 dark:text-zinc-200 sm:size-[18px]"
            />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 
                           animate-pulse sm:right-2 sm:top-2"
            />
          </button>

          {/* Profile */}
          <div className="flex items-center">
            {/* Mobile profile */}
            <div className="md:hidden">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Seller profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-zinc-300 
                         dark:border-zinc-600 sm:h-9 sm:w-9"
              />
            </div>

            {/* Desktop profile */}
            <div
              className="hidden md:flex items-center gap-3 rounded-2xl border border-zinc-200 
                          bg-white px-3 py-2 hover:bg-zinc-50 cursor-pointer transition-colors
                          dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Seller profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-zinc-300 
                         dark:border-zinc-600 sm:h-9 sm:w-9"
              />
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Sotuvchi
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Admin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

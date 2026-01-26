import { Bell, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="z-20 border-b border-zinc-200/70 bg-white/80 backdrop-blur
                       dark:border-zinc-800 dark:bg-zinc-900/80"
    >
      <div className="flex items-center justify-between px-5 py-3 sm:px-6">
        <div />

        <div className="flex items-center gap-3">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm
                       hover:bg-zinc-50
                       dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-zinc-200" />
            ) : (
              <Moon size={18} className="text-zinc-700" />
            )}
          </button>

          {/* Bell */}
          <button
            className="relative rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm
                             dark:border-zinc-700 dark:bg-zinc-800"
          >
            <Bell size={18} className="text-zinc-700 dark:text-zinc-200" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
          </button>

          {/* Profile */}
          <div
            className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2
                          dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="h-8 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Sotuvchi
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

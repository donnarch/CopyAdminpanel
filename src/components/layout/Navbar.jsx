import { Bell, Search, Sun, Moon } from "lucide-react";

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.toggle("dark"); // toggle qiladi va natijani qaytaradi
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {}
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-zinc-950/70">
      <div className="flex items-center justify-between px-5 py-3 sm:px-6">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
            size={18}
          />
          <input
            className="w-[360px] rounded-2xl border border-zinc-200 bg-white px-10 py-2 text-sm text-zinc-900 outline-none transition
                       placeholder:text-zinc-400 hover:border-zinc-300
                       focus:border-zinc-300 focus:ring-4 focus:ring-zinc-200/60
                       dark:border-white/10 dark:bg-white/5 dark:text-zinc-100
                       dark:placeholder:text-zinc-500 dark:hover:border-white/15
                       dark:focus:border-white/20 dark:focus:ring-zinc-700/40"
            placeholder="Dashboard qidiruv (keyin ishlatamiz)"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle (no hook, no state) */}
          <button
            onClick={toggleTheme}
            className="group rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition
                       hover:bg-zinc-50 hover:shadow
                       focus:outline-none focus:ring-4 focus:ring-zinc-200/60
                       dark:border-white/10 dark:bg-white/5
                       dark:hover:bg-white/10
                       dark:focus:ring-zinc-700/40"
            aria-label="Toggle theme"
          >
            {/* Lightda Moon ko'rinsin */}
            <Moon size={18} className="block text-zinc-700 group-hover:text-zinc-900 dark:hidden" />
            {/* Darkda Sun ko'rinsin */}
            <Sun size={18} className="hidden text-zinc-200 group-hover:text-white dark:block" />
          </button>

          {/* Bell */}
          <button
            className="group relative rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm transition
                       hover:bg-zinc-50 hover:shadow
                       focus:outline-none focus:ring-4 focus:ring-zinc-200/60
                       dark:border-white/10 dark:bg-white/5
                       dark:hover:bg-white/10
                       dark:focus:ring-zinc-700/40"
            aria-label="Notifications"
          >
            <Bell
              size={18}
              className="text-zinc-700 transition group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white"
            />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-sm transition hover:shadow dark:border-white/10 dark:bg-white/5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-white/10 dark:to-white/5" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Sotuvchi</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

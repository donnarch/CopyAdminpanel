import { TrendingUp, TrendingDown } from "lucide-react";

export function PerformanceMetrics({ data, darkMode = true }) {
  return (
    <div
      className={`
      ${
        darkMode
          ? "bg-gradient-to-br border-none"
          : "bg-gradient-to-br from-white to-gray-50 border-none"
      }
      rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg transition-colors
    `}
    >
      <h2
        className={`text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Biznes ko'rsatkichlari
      </h2>

      {/* Responsive Grid: 1 col on mobile, 2 on sm, 2-4 on md+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
        {data.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`
                p-3 sm:p-4 rounded-lg border transition-colors duration-200
                ${
                  darkMode
                    ? " border-zinc-800/50 hover:bg-zinc-800/60"
                    : "bg-white/50 border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  className={`text-xs sm:text-sm font-bold ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.metric}
                </p>
                <div
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors ${item.color.replace(
                    "text",
                    "bg"
                  )}/10`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <p
                  className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </p>
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    item.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs sm:text-sm">
                <span className={darkMode ? "text-gray-500" : "text-gray-600"}>
                  Trend:
                </span>
                <span
                  className={
                    item.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {item.trend === "up" ? "Ijobiy" : "Salbiy"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

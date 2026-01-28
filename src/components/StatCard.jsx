import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  bgColor,
  iconColor,
  darkMode = true,
}) {
  return (
    <div
      className={`
      ${
        darkMode
          ? "bg-gradient-to-br border-none"
          : "bg-gradient-to-br from-white to-gray-50 border-none"
      } 
      rounded-lg sm:rounded-xl border p-3 sm:p-4 md:p-5 shadow-lg transition-all duration-200 hover:shadow-xl
    `}
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p
            className={`
            text-xs sm:text-sm mb-1 sm:mb-2 font-medium
            ${darkMode ? "text-gray-400" : "text-gray-600"}
          `}
          >
            {label}
          </p>
          <p
            className={`
            text-xl sm:text-2xl md:text-3xl font-bold truncate
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
          >
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-3 sm:mt-4 text-xs sm:text-sm">
        {trend === "up" ? (
          <TrendingUp
            className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
              darkMode ? "text-emerald-400" : "text-emerald-600"
            }`}
          />
        ) : (
          <TrendingDown
            className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${
              darkMode ? "text-red-400" : "text-red-600"
            }`}
          />
        )}
        <span
          className={`font-medium whitespace-nowrap ${
            trend === "up"
              ? darkMode
                ? "text-emerald-400"
                : "text-emerald-600"
              : darkMode
              ? "text-red-400"
              : "text-red-600"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}

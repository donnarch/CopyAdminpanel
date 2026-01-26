import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  bgColor,
  iconColor,
  darkMode = true, // Default value true
  
}) {
  return (
    <div
      className={`
      ${
        darkMode
          ? "bg-linear-to-br from-black-900 to-gray-950 border-none"
          : "bg-white border-none"
      } 
      rounded-xl border p-5 shadow-lg transition-colors
    `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`
            text-sm mb-2 
            ${darkMode ? "text-white" : "text-black"}
          `}
          >
            {label}
          </p>
          <p
            className={`
            text-2xl font-bold 
            ${darkMode ? "text-white" : "text-black"}
          `}
          >
            {value}
          </p>
        </div>
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4 text-sm">
        {trend === "up" ? (
          <TrendingUp
            className={`w-4 h-4 ${
              darkMode ? "text-emerald-400" : "text-emerald-600"
            }`}
          />
        ) : (
          <TrendingDown
            className={`w-4 h-4 ${darkMode ? "text-red-400" : "text-red-600"}`}
          />
        )}
        <span
          className={
            trend === "up"
              ? darkMode
                ? "text-emerald-400"
                : "text-emerald-600"
              : darkMode
              ? "text-red-400"
              : "text-red-600"
          }
        >
          {change}
        </span>
      </div>
    </div>
  );
}

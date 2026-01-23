import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  trend,
  bgColor,
  iconColor,
}) {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div
          className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4 text-sm">
        {trend === "up" ? (
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-400" />
        )}
        <span className={trend === "up" ? "text-emerald-400" : "text-red-400"}>
          {change}
        </span>
        <span className="text-gray-500">o'tgan davrga nisbatan</span>
      </div>
    </div>
  );
}

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload, label, formatMoney }) {
  if (!active || !payload?.length) return null;

  return (
    <div className=" border border-gray-800 rounded-lg p-2 sm:p-3 md:p-4 shadow-xl backdrop-blur-sm text-xs sm:text-sm">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-2 sm:gap-4 mb-1"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">
              {entry.name}
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap">
            {entry.name === "revenue" ||
            entry.name === "profit" ||
            entry.name === "sales"
              ? formatMoney(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart({ chartData, formatMoney }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 pt-6 sm:pt-8 md:pt-10 shadow-lg transition-colors">
      {/* Header with Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div />
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              Haqiqiy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
              Maqsad
            </span>
          </div>
        </div>
      </div>

      {/* Chart - Responsive Height */}
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 -mx-3 sm:-mx-4 md:-mx-5 px-3 sm:px-4 md:px-5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#9ca3af"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              width={40}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip formatMoney={formatMoney} />}
              cursor={{
                fill: "rgba(255, 255, 255, 0.05)",
              }}
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              isAnimationActive={true}
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorTarget)"
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

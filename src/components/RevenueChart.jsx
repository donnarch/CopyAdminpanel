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
    <div className=" rounded-lg p-3 sm:p-4 shadow-xl backdrop-blur-sm text-xs sm:text-sm min-w-[180px]">
      <p className="font-semibold  mb-2 text-sm">{label}</p>
      <div className="space-y-2">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs sm:text-sm  whitespace-nowrap">
                {entry.name === "revenue"
                  ? "Haqiqiy"
                  : entry.name === "target"
                  ? "Maqsad"
                  : entry.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
              {entry.name === "revenue" || entry.name === "target"
                ? formatMoney(entry.value)
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RevenueChart({ chartData, formatMoney }) {
  return (
    <div className=" rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg ">
      {/* Header with Title and Legend */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold ">Daromad O'sishi</h3>
          <p className="text-zinc-600 text-xs sm:text-sm mt-1">
            Oylik daromad va maqsadlarni kuzatish
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap bg-zinc-900/60 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm text-white whitespace-nowrap">
              Haqiqiy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded-full flex-shrink-0" />
            <span className="text-xs sm:text-sm text-white whitespace-nowrap">
              Maqsad
            </span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#3f3f46"
              vertical={false}
              strokeWidth={0.5}
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              stroke="#71717a"
              axisLine={false}
              tickLine={false}
              fontSize={11}
              tick={{ fontSize: 11 }}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={20}
            />

            {/* Y Axis */}
            <YAxis
              stroke="#71717a"
              axisLine={false}
              tickLine={false}
              fontSize={11}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                return value;
              }}
              width={40}
              tickMargin={5}
            />

            {/* Tooltip */}
            <Tooltip
              content={<CustomTooltip formatMoney={formatMoney} />}
              cursor={{
                stroke: "#3f3f46",
                strokeWidth: 1,
                strokeDasharray: "5 5",
              }}
              wrapperStyle={{ outline: "none" }}
            />

            {/* Revenue Area */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              isAnimationActive={true}
              animationDuration={1500}
              dot={{
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#1e40af",
                r: 4,
              }}
              activeDot={{
                stroke: "#1e40af",
                strokeWidth: 2,
                fill: "#3b82f6",
                r: 6,
              }}
            />

            {/* Target Area */}
            <Area
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorTarget)"
              isAnimationActive={true}
              animationDuration={1500}
              animationBegin={300}
              dot={{
                stroke: "#10b981",
                strokeWidth: 2,
                fill: "#065f46",
                r: 3,
              }}
              activeDot={{
                stroke: "#065f46",
                strokeWidth: 2,
                fill: "#10b981",
                r: 5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Footer */}
      <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
            <div>
              <p className="text-xs ">O'rtacha Daromad</p>
              <p className="text-sm sm:text-base font-semibold">
                {chartData.length > 0
                  ? formatMoney(
                      chartData.reduce((sum, item) => sum + item.revenue, 0) /
                        chartData.length
                    )
                  : formatMoney(0)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0" />
            <div>
              <p className="text-xs ">Maqsadga Yetish</p>
              <p className="text-sm sm:text-base font-semibold">
                {chartData.length > 0
                  ? `${Math.round(
                      (chartData[chartData.length - 1].revenue /
                        chartData[chartData.length - 1].target) *
                        100
                    )}%`
                  : "0%"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

function CustomBarTooltip({ active, payload, label, formatMoney, darkMode }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`
      ${darkMode ? "bg-gray-900 border-none" : "bg-white border-none"} 
      border rounded-lg p-3 sm:p-4 shadow-xl backdrop-blur-sm text-xs sm:text-sm
    `}
    >
      <p
        className={`
        font-semibold mb-2
        ${darkMode ? "text-white" : "text-gray-900"}
      `}
      >
        {label}
      </p>
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
            <span
              className={`
              text-xs sm:text-sm capitalize whitespace-nowrap
              ${darkMode ? "text-gray-300" : "text-gray-700"}
            `}
            >
              {entry.name}
            </span>
          </div>
          <span
            className={`
            text-xs sm:text-sm font-bold whitespace-nowrap
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
          >
            {entry.name === "sales"
              ? `${entry.value} ta`
              : formatMoney(entry.value * 1000000)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BarChartSection({
  barChartData,
  formatMoney,
  darkMode = true,
}) {
  const colors = {
    sales: {
      fill: darkMode ? "#3b82f6" : "#60a5fa",
      stroke: darkMode ? "#2563eb" : "#1d4ed8",
      light: darkMode ? "#3b82f6" : "#93c5fd",
    },
    profit: {
      fill: darkMode ? "#10b981" : "#34d399",
      stroke: darkMode ? "#059669" : "#059669",
      light: darkMode ? "#10b981" : "#6ee7b7",
    },
    expenses: {
      fill: darkMode ? "#ef4444" : "#f87171",
      stroke: darkMode ? "#dc2626" : "#dc2626",
      light: darkMode ? "#ef4444" : "#fca5a5",
    },
    grid: darkMode ? "#374151" : "#d1d5db",
    axis: darkMode ? "#9ca3af" : "#6b7280",
  };

  return (
    <div
      className={`
      ${
        darkMode
          ? "bg-gradient-to-br border-none shadow-lg shadow-gray-900/20"
          : "bg-white border-none shadow-lg shadow-gray-200/50"
      } 
      rounded-lg sm:rounded-xl border p-3 sm:p-4 md:p-5 mb-6 sm:mb-8 transition-colors
    `}
    >
      {/* Legend - Responsive Grid */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div></div>

        {/* Legend Items - Stack on mobile, row on tablet+ */}
        <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors.sales.light }}
            />
            <span
              className={`
              text-xs sm:text-sm whitespace-nowrap
              ${darkMode ? "text-gray-400" : "text-gray-600"}
            `}
            >
              Sotuvlar
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors.profit.light }}
            />
            <span
              className={`
              text-xs sm:text-sm whitespace-nowrap
              ${darkMode ? "text-gray-400" : "text-gray-600"}
            `}
            >
              Foyda
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors.expenses.light }}
            />
            <span
              className={`
              text-xs sm:text-sm whitespace-nowrap
              ${darkMode ? "text-gray-400" : "text-gray-600"}
            `}
            >
              Xarajatlar
            </span>
          </div>
        </div>
      </div>

      {/* Chart - Responsive Height */}
      <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 -mx-3 sm:-mx-4 md:-mx-5 px-3 sm:px-4 md:px-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke={colors.axis}
              axisLine={false}
              tickLine={false}
              fontSize={11}
              tick={{ fontSize: 12 }}
              interval={0}
              angle={0}
            />
            <YAxis
              stroke={colors.axis}
              axisLine={false}
              tickLine={false}
              fontSize={11}
              width={40}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              content={
                <CustomBarTooltip
                  formatMoney={formatMoney}
                  darkMode={darkMode}
                />
              }
              cursor={{
                fill: darkMode
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
              }}
              contentStyle={{
                backgroundColor: "transparent",
                border: "none",
                padding: "0",
              }}
            />

            <Bar
              dataKey="sales"
              name="Sotuvlar"
              radius={[4, 4, 0, 0]}
              fill={colors.sales.fill}
              stroke={colors.sales.stroke}
              strokeWidth={1}
              isAnimationActive={true}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-sales-${index}`}
                  fill={colors.sales.fill}
                  stroke={colors.sales.stroke}
                  strokeWidth={1}
                />
              ))}
            </Bar>

            <Bar
              dataKey="profit"
              name="Foyda"
              radius={[4, 4, 0, 0]}
              fill={colors.profit.fill}
              stroke={colors.profit.stroke}
              strokeWidth={1}
              isAnimationActive={true}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-profit-${index}`}
                  fill={colors.profit.fill}
                  stroke={colors.profit.stroke}
                  strokeWidth={1}
                />
              ))}
            </Bar>

            <Bar
              dataKey="expenses"
              name="Xarajatlar"
              radius={[4, 4, 0, 0]}
              fill={colors.expenses.fill}
              stroke={colors.expenses.stroke}
              strokeWidth={1}
              isAnimationActive={true}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-expenses-${index}`}
                  fill={colors.expenses.fill}
                  stroke={colors.expenses.stroke}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

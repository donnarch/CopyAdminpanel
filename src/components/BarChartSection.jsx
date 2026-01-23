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

function CustomBarTooltip({ active, payload, label, formatMoney }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-300 capitalize">
              {entry.name}
            </span>
          </div>
          <span className="text-sm font-bold text-white">
            {entry.name === "sales"
              ? `${entry.value} ta`
              : formatMoney(entry.value * 1000000)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function BarChartSection({ barChartData, formatMoney }) {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 p-5 shadow-lg mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">
            Sotuv va xarajatlar tahlili
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Sotuv hajmi, foyda va xarajatlarni solishtirma ko'rinishi
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Sotuvlar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Foyda</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-400">Xarajatlar</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barChartData}>
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
            />
            <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
            <Tooltip
              content={<CustomBarTooltip formatMoney={formatMoney} />}
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
            />
            <Bar
              dataKey="sales"
              name="Sotuvlar"
              radius={[4, 4, 0, 0]}
              fill="#3b82f6"
              stroke="#2563eb"
              strokeWidth={1}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#3b82f6"
                  stroke="#2563eb"
                  strokeWidth={1}
                />
              ))}
            </Bar>
            <Bar
              dataKey="profit"
              name="Foyda"
              radius={[4, 4, 0, 0]}
              fill="#10b981"
              stroke="#059669"
              strokeWidth={1}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#10b981"
                  stroke="#059669"
                  strokeWidth={1}
                />
              ))}
            </Bar>
            <Bar
              dataKey="expenses"
              name="Xarajatlar"
              radius={[4, 4, 0, 0]}
              fill="#ef4444"
              stroke="#dc2626"
              strokeWidth={1}
            >
              {barChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#ef4444"
                  stroke="#dc2626"
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

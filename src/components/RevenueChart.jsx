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
    <div className="bg-black-900 border border-black-800 rounded-lg p-4 shadow-xl">
      <p className="font-semibold text-white mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" />
            <span className="text-sm ">{entry.name}</span>
          </div>
          <span className="text-sm font-bold ">
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
    <div className="bg-linear-to-brrom-black-900 to-black-950 rounded-xl  p-5 pt-10 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div></div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-sm ">Haqiqiy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-sm ">Maqsad</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="103%" height="130%">
          <AreaChart data={chartData}>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip formatMoney={formatMoney} />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="blue"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke=""
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorTarget)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

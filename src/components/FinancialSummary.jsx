import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

export function FinancialSummary({
  financialData,
  profit,
  profitMargin,
  formatMoney,
}) {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Moliya hisoboti</h2>
          <p className="text-sm text-gray-400 mt-1">
            Aktivlar, qarzlar va likvidlik
          </p>
        </div>
        <Calendar className="w-5 h-5 text-blue-400" />
      </div>

      <div className="space-y-4">
        {financialData.map((item, idx) => (
          <div
            key={idx}
            className="p-4 hover:bg-gray-800/30 rounded-lg transition-colors border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">{item.label}</p>
                <p className="text-xl font-bold text-white">{item.value}</p>
              </div>
              <div
                className={`flex items-center gap-1 ${
                  item.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Sof foyda</p>
            <p className="text-2xl font-bold text-emerald-400">
              {formatMoney(profit)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Foyda marjasi</p>
            <p className="text-xl font-bold text-white">{profitMargin}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

export function FinancialSummary({
  financialData,
  profit,
  profitMargin,
  formatMoney,
}) {
  return (
    <div className="bg-linear-to-br from-black-900 to-black-950 rounded-xl  p-5 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold ">Moliya hisoboti</h2>
        </div>
        <Calendar className="w-5 h-5 text-blue-400" />
      </div>

      <div className="space-y-4">
        {financialData.map((item, idx) => (
          <div
            key={idx}
            className="p-4 hover:bg-black-800/30 rounded-lg transition-colors  "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black-400 mb-2 font-medium">
                  {item.label}
                </p>
                <p className="text-xl font-bold ">{item.value}</p>
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

      <div className="mt-6 p-4 bg-linear-to-r  rounded-lg border border-amber-200  ">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-black-400 font-bold">Sof foyda</p>
            <p className="text-2xl font-bold text-emerald-400">
              {formatMoney(profit)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-white">{profitMargin}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

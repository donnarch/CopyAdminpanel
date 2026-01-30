import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

export function FinancialSummary({
  financialData,
  profit,
  profitMargin,
  formatMoney,
}) {
  return (
    <div className="bg-gradient-to-br  rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-lg transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold ">
            Moliya hisoboti
          </h2>
        </div>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
      </div>

      {/* Financial Items */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {financialData.map((item, idx) => (
          <div
            key={idx}
            className="p-3 sm:p-4  rounded-lg transition-colors duration-200 cursor-pointer hover:lift hover:shadow-md bg-gradient-to-r"
          >
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm  mb-1 sm:mb-2 font-medium">
                  {item.label}
                </p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold  truncate">
                  {item.value}
                </p>
              </div>
              <div
                className={`flex items-center gap-1 flex-shrink-0 ${
                  item.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {item.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                  {item.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Net Profit Section */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 md:p-5 bg-gradient-to-r from-amber-400/10 to-amber-500/10 rounded-lg border border-amber-200/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-gray-400 font-bold mb-1 sm:mb-2">
              Sof foyda
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">
              {formatMoney(profit)}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {profitMargin}%
            </p>
            <p className="text-xs sm:text-sm text-gray-400">Marja</p>
          </div>
        </div>
      </div>
    </div>
  );
}

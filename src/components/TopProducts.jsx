import { DollarSign } from "lucide-react";

export function TopProducts({ products, formatMoney, darkMode = true }) {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br  border-none"
          : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
      } 
      rounded-lg sm:rounded-xl border p-3 sm:p-4 md:p-5 shadow-lg transition-colors
    `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2
            className={`
            text-base sm:text-lg md:text-xl font-bold 
            ${darkMode ? "text-white" : "text-gray-900"}
          `}
          >
            Yuqori rentabellik
          </h2>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {products.map((item, idx) => (
          <div
            key={idx}
            className={`
              flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 
              p-3 sm:p-4 rounded-lg transition-all duration-200 border
              ${
                darkMode
                  ? "border-gray-700/50 hover:bg-gray-800/50"
                  : "border-gray-200 hover:bg-gray-100/50"
              }
            `}
          >
            {/* Left Section: Index + Product Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div
                className={`
                w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-white 
                flex-shrink-0 shadow-lg transition-transform hover:scale-105
                ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-400 to-purple-500"
                }
              `}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-medium text-sm sm:text-base truncate ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.model}
                </p>
                <div className="flex items-center gap-2 mt-1 flex-wrap text-xs">
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.sold} ta
                  </span>
                  <span className="hidden sm:inline text-gray-500">•</span>
                  <span
                    className={`font-medium ${
                      darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    {item.margin}% marja
                  </span>
                  <span className="hidden sm:inline text-gray-500">•</span>
                  <span
                    className={`${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {item.stock} omborda
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Revenue + Profit */}
            <div className="text-left sm:text-right flex-shrink-0">
              <p
                className={`text-base sm:text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {formatMoney(item.revenue)}
              </p>
              <div className="flex items-center gap-1 mt-1 sm:justify-end text-xs sm:text-sm">
                <DollarSign
                  className={`w-3 h-3 flex-shrink-0 ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
                <span
                  className={`font-medium ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  {item.margin}% foyda
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

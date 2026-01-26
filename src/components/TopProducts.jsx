import { Smartphone, DollarSign } from "lucide-react";
export function TopProducts({ products, formatMoney, darkMode = true }) {
  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-black-900 to-black-950 border-none"
          : "bg-gradient-to-br from-white to-black-50 border-gray-200"
      } 
      rounded-xl border p-5 shadow-lg transition-colors
    `}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2
            className={`
            text-lg font-bold 
            ${darkMode ? "text-white" : "text-black-900"}
          `}
          >
            Yuqori rentabellik
          </h2>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
      <div className="space-y-4">
        {products.map((item, idx) => (
          <div
            key={idx}
            className={`
              flex items-center justify-between p-4 rounded-lg transition-colors border
              ${
                darkMode
                  ? "border-gray-800 hover:bg-black-800/50"
                  : "border-gray-200 hover:bg-black-100/70"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-lg
                ${
                  darkMode
                    ? "bg-gradient-to-br  text-white"
                    : "bg-gradient-to-br from-gray-600 to-gray-600 text-white"
                }
              `}
              >
                {idx + 1}
              </div>
              <div>
                <p
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.model}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.sold} ta sotilgan
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    {item.margin}% marja
                  </span>
                  <span
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.stock} ta omborda
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {formatMoney(item.revenue)}
              </p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                <DollarSign
                  className={`w-3 h-3 ${
                    darkMode ? "text-emerald-400" : "text-emerald-600"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
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

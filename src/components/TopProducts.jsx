import { Smartphone, DollarSign } from "lucide-react";

export function TopProducts({ products, formatMoney }) {
  return (
    <div className="bg-linear-to-br from-gray-900 to-gray-950 rounded-xl border border-gray-800 p-5 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white">Yuqori rentabellik</h2>
          <p className="text-sm text-gray-400 mt-1">
            Eng yuqori marjali mahsulotlar
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-blue-400">
            {products.length} mahsulot
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 hover:bg-gray-800/50 rounded-lg transition-colors border border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                {idx + 1}
              </div>
              <div>
                <p className="font-medium text-white">{item.model}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-400">
                    {item.sold} ta sotilgan
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    {item.margin}% marja
                  </span>
                  <span className="text-xs text-gray-400">
                    {item.stock} ta omborda
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-white">
                {formatMoney(item.revenue)}
              </p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">
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

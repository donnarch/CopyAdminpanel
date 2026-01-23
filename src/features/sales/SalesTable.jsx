import { ArrowUpRight } from "lucide-react";

const money = (n) => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

const paymentMap = {
  cash: { label: "Naqd", cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" },
  card: { label: "Karta", cls: "bg-sky-500/10 text-sky-700 dark:text-sky-300" },
  transfer: { label: "O‘tkazma", cls: "bg-amber-500/10 text-amber-700 dark:text-amber-300" },
};

export default function SalesTable({ items, onRowClick }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Sotuvlar ro‘yxati
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Qator ustiga bos — detallarni ko‘rasan.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3">Sana</th>
              <th className="px-4 py-3">Telefon</th>
              <th className="px-4 py-3">Mijoz</th>
              <th className="px-4 py-3">IMEI</th>
              <th className="px-4 py-3">Olingan</th>
              <th className="px-4 py-3">Sotilgan</th>
              <th className="px-4 py-3">Foyda</th>
              <th className="px-4 py-3">To‘lov</th>
              <th className="px-4 py-3 text-right">Detail</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-zinc-500 dark:text-zinc-400">
                  Hech narsa topilmadi. Filterlarni o‘zgartirib ko‘ring.
                </td>
              </tr>
            ) : (
              items.map((s) => {
                const profit = s.sellPrice - s.buyPrice;
                const pay = paymentMap[s.payment] || paymentMap.cash;

                return (
                  <tr
                    key={s.id}
                    onClick={() => onRowClick?.(s)}
                    className="cursor-pointer border-t border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/30"
                  >
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {s.soldAt}
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {s.model}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {s.brand} • {s.storage}GB • {s.color}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {s.customerName || "—"}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {s.customerPhone || "—"}
                      </p>
                    </td>

                    <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-200">
                      {s.imei}
                    </td>

                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {money(s.buyPrice)}
                    </td>

                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {money(s.sellPrice)}
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                        {money(profit)}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${pay.cls}`}>
                        {pay.label}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                        Ko‘rish <ArrowUpRight size={14} />
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

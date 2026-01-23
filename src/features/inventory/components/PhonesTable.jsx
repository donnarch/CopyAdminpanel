import { Pencil, Trash2, CircleDot } from "lucide-react";

const money = (n) => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

const statusMap = {
  in_stock: {
    label: "Omborda",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  reserved: {
    label: "Rezerv",
    cls: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  sold: {
    label: "Sotilgan",
    cls: "bg-zinc-500/10 text-zinc-700 dark:text-zinc-200",
  },
};

export default function PhonesTable({ items, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Telefonlar ro‘yxati
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Edit/Delete, keyinroq “sold” ga o‘tkazish ham qo‘shamiz.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[920px] w-full text-left text-sm">
          <thead className="bg-zinc-50 text-xs text-zinc-600 dark:bg-zinc-900/40 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">IMEI</th>
              <th className="px-4 py-3">Xotira</th>
              <th className="px-4 py-3">Rang</th>
              <th className="px-4 py-3">Olingan narx</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Amallar</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-zinc-500 dark:text-zinc-400">
                  Hech narsa topilmadi. Filterlarni tozalab ko‘ring.
                </td>
              </tr>
            ) : (
              items.map((p) => {
                const st = statusMap[p.status] || statusMap.in_stock;
                return (
                  <tr
                    key={p.id}
                    className="border-t border-zinc-200 dark:border-zinc-800"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
                          <CircleDot size={16} className="text-zinc-700 dark:text-zinc-200" />
                        </span>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {p.model}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {p.brand}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-200">
                      {p.imei}
                    </td>

                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {p.storage} GB
                    </td>

                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {p.color}
                    </td>

                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-200">
                      {money(p.buyPrice)}
                    </td>

                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${st.cls}`}>
                        {st.label}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(p)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => onDelete(p.id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-rose-300 dark:hover:bg-rose-500/10"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
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

import { Search, X } from "lucide-react";

export default function SalesFiltersBar({
  query,
  onQuery,
  from,
  onFrom,
  to,
  onTo,
  payment,
  onPayment,
  totalShown,
  onClear,
}) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Qidiruv & Filter
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Ko‘rsatilmoqda: <span className="font-semibold">{totalShown}</span> ta
          </p>
        </div>

        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-200 dark:hover:bg-zinc-900/60"
        >
          <X size={14} />
          Tozalash
        </button>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {/* search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Qidirish: mijoz, model, IMEI, tel..."
              className="w-full rounded-2xl border border-zinc-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* from */}
        <Field label="Dan (sana)">
          <input
            type="date"
            value={from}
            onChange={(e) => onFrom(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </Field>

        {/* to */}
        <Field label="Gacha (sana)">
          <input
            type="date"
            value={to}
            onChange={(e) => onTo(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
        </Field>

        {/* payment */}
        <Field label="To‘lov turi">
          <select
            value={payment}
            onChange={(e) => onPayment(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          >
            <option value="all">Barchasi</option>
            <option value="cash">Naqd</option>
            <option value="card">Karta</option>
            <option value="transfer">O‘tkazma</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}

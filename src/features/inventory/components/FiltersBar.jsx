import { Search, SlidersHorizontal, X } from "lucide-react";

export default function FiltersBar({
  query,
  onQuery,
  brand,
  onBrand,
  status,
  onStatus,
  storage,
  onStorage,
  brands,
  storages,
  totalShown,
  totalAll,
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
            Ko‘rsatilmoqda: <span className="font-semibold">{totalShown}</span> / {totalAll}
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Qidirish: model, brand, IMEI..."
              className="w-full rounded-2xl border border-zinc-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </div>
        </div>

        {/* brand */}
        <Select
          value={brand}
          onChange={(e) => onBrand(e.target.value)}
          label="Brand"
          icon={SlidersHorizontal}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === "all" ? "Barchasi" : b}
            </option>
          ))}
        </Select>

        {/* status */}
        <Select value={status} onChange={(e) => onStatus(e.target.value)} label="Status">
          <option value="all">Barchasi</option>
          <option value="in_stock">Omborda</option>
          <option value="reserved">Rezerv</option>
          <option value="sold">Sotilgan</option>
        </Select>

        {/* storage */}
        <Select value={storage} onChange={(e) => onStorage(e.target.value)} label="Xotira">
          {storages.map((s) => (
            <option key={s} value={s}>
              {s === "all" ? "Barchasi" : `${s} GB`}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
      >
        {children}
      </select>
    </label>
  );
}

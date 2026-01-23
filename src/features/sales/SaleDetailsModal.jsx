import { X } from "lucide-react";

const money = (n) => new Intl.NumberFormat("uz-UZ").format(n) + " so‘m";

const paymentLabel = {
  cash: "Naqd",
  card: "Karta",
  transfer: "O‘tkazma",
};

export default function SaleDetailsModal({ open, data, onClose }) {
  if (!open || !data) return null;

  const profit = data.sellPrice - data.buyPrice;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Sotuv detali
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {data.soldAt} • {data.model}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
          >
            <X size={18} className="text-zinc-700 dark:text-zinc-200" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Box label="Telefon" value={`${data.brand} • ${data.model}`} />
          <Box label="Xotira / Rang" value={`${data.storage}GB • ${data.color}`} />
          <Box label="IMEI" value={data.imei} mono />
          <Box label="To‘lov turi" value={paymentLabel[data.payment] || "—"} />
          <Box label="Olingan narx" value={money(data.buyPrice)} />
          <Box label="Sotilgan narx" value={money(data.sellPrice)} />
          <Box label="Sof foyda" value={money(profit)} strong />
          <Box label="Mijoz" value={`${data.customerName || "—"} • ${data.customerPhone || "—"}`} />
          <div className="sm:col-span-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Izoh</p>
            <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
              {data.note?.trim() ? data.note : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Box({ label, value, mono, strong }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</p>
      <p
        className={[
          "mt-1 text-sm text-zinc-900 dark:text-zinc-100",
          mono ? "font-mono text-xs" : "",
          strong ? "font-semibold" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

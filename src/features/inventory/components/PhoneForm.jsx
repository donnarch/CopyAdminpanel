import { useEffect, useMemo, useState } from "react";
import { X, Save } from "lucide-react";

export default function PhoneForm({ open, onClose, initial, onSubmit }) {
  const isEdit = !!initial;

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [storage, setStorage] = useState(128);
  const [color, setColor] = useState("");
  const [imei, setImei] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  useEffect(() => {
    if (!open) return;

    setModel(initial?.model || "");
    setBrand(initial?.brand || "");
    setStorage(initial?.storage || 128);
    setColor(initial?.color || "");
    setImei(initial?.imei || "");
    setBuyPrice(initial?.buyPrice ? String(initial.buyPrice) : "");
  }, [open, initial]);

  const canSave = useMemo(() => {
    return (
      model.trim().length >= 2 &&
      brand.trim().length >= 2 &&
      String(imei).trim().length >= 8 &&
      Number(buyPrice) > 0
    );
  }, [model, brand, imei, buyPrice]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!canSave) return;

    onSubmit({
      model: model.trim(),
      brand: brand.trim(),
      storage: Number(storage),
      color: color.trim() || "—",
      imei: String(imei).trim(),
      buyPrice: Number(buyPrice),
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {isEdit ? "Telefonni tahrirlash" : "Yangi telefon qo‘shish"}
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              IMEI va narxlar bo‘yicha keyin validatsiyalarni kuchaytiramiz.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-2xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900/40"
          >
            <X size={18} className="text-zinc-700 dark:text-zinc-200" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Model">
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Masalan: iPhone 13"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </Field>

          <Field label="Brand">
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Masalan: Apple"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </Field>

          <Field label="Xotira (GB)">
            <select
              value={storage}
              onChange={(e) => setStorage(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {[64, 128, 256, 512, 1024].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Rang">
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Masalan: Black"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </Field>

          <Field label="IMEI" className="sm:col-span-2">
            <input
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              placeholder="15-17 xonali"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </Field>

          <Field label="Olingan narx (so‘m)" className="sm:col-span-2">
            <input
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="Masalan: 3500000"
              className="w-full rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
            />
          </Field>

          <div className="sm:col-span-2 mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900/40"
            >
              Bekor qilish
            </button>

            <button
              disabled={!canSave}
              type="submit"
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                canSave
                  ? "bg-zinc-900 text-white hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              <Save size={16} />
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-zinc-600 dark:text-zinc-400">
        {label}
      </span>
      {children}
    </label>
  );
}

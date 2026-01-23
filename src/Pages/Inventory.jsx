import { useMemo, useState } from "react";
import FiltersBar from "../features/inventory/components/FiltersBar";
import PhonesTable from "../features/inventory/components/PhonesTable";
import PhoneForm from "../features/inventory/components/PhoneForm";

const demoPhones = [
  {
    id: "p1",
    model: "iPhone 13",
    brand: "Apple",
    storage: 128,
    color: "Midnight",
    imei: "353245110012345",
    buyPrice: 6800000,
    sellPrice: 0,
    status: "in_stock",
    createdAt: "2026-01-15",
  },
  {
    id: "p2",
    model: "Samsung A54",
    brand: "Samsung",
    storage: 256,
    color: "Black",
    imei: "356789990076543",
    buyPrice: 3200000,
    sellPrice: 0,
    status: "in_stock",
    createdAt: "2026-01-14",
  },
  {
    id: "p3",
    model: "Redmi Note 12",
    brand: "Xiaomi",
    storage: 128,
    color: "Blue",
    imei: "861234560011223",
    buyPrice: 2100000,
    sellPrice: 0,
    status: "reserved",
    createdAt: "2026-01-13",
  },
  {
    id: "p4",
    model: "iPhone 11",
    brand: "Apple",
    storage: 64,
    color: "White",
    imei: "353245110099991",
    buyPrice: 3400000,
    sellPrice: 0,
    status: "in_stock",
    createdAt: "2026-01-12",
  },
];

export default function Inventory() {
  const [phones, setPhones] = useState(demoPhones);

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [status, setStatus] = useState("all");
  const [storage, setStorage] = useState("all");

  const [openForm, setOpenForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);

  const brands = useMemo(() => {
    const set = new Set(phones.map((p) => p.brand));
    return ["all", ...Array.from(set)];
  }, [phones]);

  const storages = useMemo(() => {
    const set = new Set(phones.map((p) => p.storage));
    return ["all", ...Array.from(set).sort((a, b) => a - b)];
  }, [phones]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return phones.filter((p) => {
      const matchQuery =
        !q ||
        p.model.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.imei.includes(q);

      const matchBrand = brand === "all" || p.brand === brand;
      const matchStatus = status === "all" || p.status === status;
      const matchStorage =
        storage === "all" || String(p.storage) === String(storage);

      return matchQuery && matchBrand && matchStatus && matchStorage;
    });
  }, [phones, query, brand, status, storage]);

  const stats = useMemo(() => {
    const total = phones.length;
    const inStock = phones.filter((p) => p.status === "in_stock").length;
    const reserved = phones.filter((p) => p.status === "reserved").length;
    const sold = phones.filter((p) => p.status === "sold").length;
    return { total, inStock, reserved, sold };
  }, [phones]);

  const handleAdd = () => {
    setEditingPhone(null);
    setOpenForm(true);
  };

  const handleEdit = (phone) => {
    setEditingPhone(phone);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    setPhones((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (payload) => {
    if (editingPhone) {
      setPhones((prev) =>
        prev.map((p) => (p.id === editingPhone.id ? { ...p, ...payload } : p))
      );
    } else {
      setPhones((prev) => [
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString().slice(0, 10),
          status: "in_stock",
          ...payload,
        },
        ...prev,
      ]);
    }
    setOpenForm(false);
    setEditingPhone(null);
  };

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Ombor (Telefonlar)
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Barcha telefonlar ro‘yxati — qidirish, filtrlash, qo‘shish,
            tahrirlash va o‘chirish.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          + Yangi telefon
        </button>
      </div>

      {/* mini stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MiniStat label="Jami" value={stats.total} />
        <MiniStat label="Omborda" value={stats.inStock} />
        <MiniStat label="Rezerv" value={stats.reserved} />
        <MiniStat label="Sotilgan" value={stats.sold} />
      </div>

      {/* filters */}
      <FiltersBar
        query={query}
        onQuery={setQuery}
        brand={brand}
        onBrand={setBrand}
        status={status}
        onStatus={setStatus}
        storage={storage}
        onStorage={setStorage}
        brands={brands}
        storages={storages}
        totalShown={filtered.length}
        totalAll={phones.length}
        onClear={() => {
          setQuery("");
          setBrand("all");
          setStatus("all");
          setStorage("all");
        }}
      />

      {/* table */}
      <PhonesTable
        items={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* modal form */}
      <PhoneForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingPhone(null);
        }}
        initial={editingPhone}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}

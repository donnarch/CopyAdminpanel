import { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  Package,
  ShoppingCart,
  DollarSign,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  Calendar,
  Cpu,
  Palette,
  Barcode,
  TrendingUp,
} from "lucide-react";

/* ------------------ DEMO DATA ------------------ */
const demoPhones = [
  {
    id: "p1",
    model: "iPhone 13",
    brand: "Apple",
    storage: 128,
    color: "Midnight",
    imei: "353245110012345",
    buyPrice: 6800000,
    sellPrice: 8500000,
    status: "in_stock",
    createdAt: "2026-01-15",
    image:
      "https://images.unsplash.com/photo-1592286927505-1def25115558?w=200&h=200&fit=crop",
  },
  {
    id: "p2",
    model: "Samsung A54",
    brand: "Samsung",
    storage: 256,
    color: "Black",
    imei: "356789990076543",
    buyPrice: 3200000,
    sellPrice: 4200000,
    status: "in_stock",
    createdAt: "2026-01-14",
    image:
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=200&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
  },
  {
    id: "p4",
    model: "iPhone 11",
    brand: "Apple",
    storage: 64,
    color: "White",
    imei: "353245110099991",
    buyPrice: 3400000,
    sellPrice: 4200000,
    status: "sold",
    createdAt: "2026-01-12",
    image:
      "https://images.unsplash.com/photo-1517654443271-a3e853e71594?w=200&h=200&fit=crop",
  },
  {
    id: "p5",
    model: "OnePlus 11",
    brand: "OnePlus",
    storage: 256,
    color: "Green",
    imei: "864567890123456",
    buyPrice: 4500000,
    sellPrice: 5800000,
    status: "in_stock",
    createdAt: "2026-01-11",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
  },
  {
    id: "p6",
    model: "Google Pixel 7",
    brand: "Google",
    storage: 128,
    color: "Obsidian",
    imei: "987654321098765",
    buyPrice: 5200000,
    sellPrice: 6500000,
    status: "in_stock",
    createdAt: "2026-01-10",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200&h=200&fit=crop",
  },
];

/* ------------------ MAIN ------------------ */
export default function Inventory() {
  const [phones, setPhones] = useState(demoPhones);
  const [query, setQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const filtered = useMemo(() => {
    return phones.filter(
      (p) =>
        p.model.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.imei.includes(query)
    );
  }, [phones, query]);

  const paginatedPhones = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const stats = useMemo(() => {
    const total = phones.length;
    const inStock = phones.filter((p) => p.status === "in_stock").length;
    const sold = phones.filter((p) => p.status === "sold").length;
    const profit = phones.reduce(
      (sum, p) => sum + (p.sellPrice - p.buyPrice),
      0
    );
    return { total, inStock, sold, profit };
  }, [phones]);

  const handleSubmit = (data) => {
    if (editingPhone) {
      setPhones((prev) =>
        prev.map((p) => (p.id === editingPhone.id ? { ...p, ...data } : p))
      );
    } else {
      setPhones((prev) => [
        {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString().slice(0, 10),
          status: "in_stock",
          ...data,
        },
        ...prev,
      ]);
    }
    setOpenForm(false);
    setEditingPhone(null);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setPhones((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
              Ombor (Telefonlar)
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              Barcha telefonlar ro'yxati
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPhone(null);
              setOpenForm(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus size={18} className="sm:w-5 sm:h-5" />
            <span>Yangi telefon</span>
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Stat
            label="Jami"
            value={stats.total}
            icon={<Package size={20} className="sm:w-6 sm:h-6" />}
          />
          <Stat
            label="Omborda"
            value={stats.inStock}
            icon={<ShoppingCart size={20} className="sm:w-6 sm:h-6" />}
          />
          <Stat
            label="Sotilgan"
            value={stats.sold}
            icon={<DollarSign size={20} className="sm:w-6 sm:h-6" />}
          />
          <Stat
            label="Foyda"
            value={`${stats.profit.toLocaleString()} so'm`}
            icon={<TrendingUp size={20} className="sm:w-6 sm:h-6" />}
          />
        </div>

        {/* SEARCH */}
        <div className="mb-4 sm:mb-6 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Model, brend yoki IMEI bo'yicha qidirish..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
        </div>

        {/* TABLE - Mobile card view / Desktop table view */}
        <div className="rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  {["Telefon", "IMEI", "Holat", "Narx", "Sana", "Amallar"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {paginatedPhones.length > 0 ? (
                  paginatedPhones.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                            alt={p.model}
                          />
                          <div>
                            <p className="font-semibold text-sm sm:text-base">
                              {p.model}
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                              {p.brand}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                          {p.imei}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-semibold text-green-600 dark:text-green-400 text-sm sm:text-base">
                          {p.sellPrice > 0
                            ? `${p.sellPrice.toLocaleString()} so'm`
                            : "-"}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                          {p.createdAt}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => setSelectedPhone(p)}
                            className="p-1.5 sm:p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                            title="Ko'rish"
                          >
                            <Eye size={16} className="sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingPhone(p);
                              setOpenForm(true);
                            }}
                            className="p-1.5 sm:p-2 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors"
                            title="Tahrirlash"
                          >
                            <Edit2 size={16} className="sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 sm:p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 size={16} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <Smartphone className="mx-auto mb-4 text-zinc-400 dark:text-zinc-600 w-12 h-12" />
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Hech qanday telefon topilmadi
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile card view */}
          <div className="lg:hidden">
            <div className="space-y-3 p-3 sm:p-4">
              {paginatedPhones.length > 0 ? (
                paginatedPhones.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4"
                  >
                    <div className="flex gap-3">
                      <img
                        src={p.image}
                        className="w-16 h-16 rounded-lg object-cover"
                        alt={p.model}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">
                              {p.model}
                            </h3>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              {p.brand}
                            </p>
                          </div>
                          <StatusBadge status={p.status} />
                        </div>

                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Barcode size={12} className="text-zinc-500" />
                            <span className="font-mono">{p.imei}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Palette size={12} className="text-zinc-500" />
                            <span>{p.color}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Cpu size={12} className="text-zinc-500" />
                            <span>{p.storage}GB</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Calendar size={12} className="text-zinc-500" />
                            <span>{p.createdAt}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
                          <div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                              Narx
                            </p>
                            <p className="font-semibold text-green-600 dark:text-green-400">
                              {p.sellPrice > 0
                                ? `${p.sellPrice.toLocaleString()} so'm`
                                : "-"}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedPhone(p)}
                              className="p-1.5 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setEditingPhone(p);
                                setOpenForm(true);
                              }}
                              className="p-1.5 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Smartphone className="mx-auto mb-4 text-zinc-400 dark:text-zinc-600 w-12 h-12" />
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Hech qanday telefon topilmadi
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 sm:mt-8">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Jami {filtered.length} ta telefon, {paginatedPhones.length} ta
              ko'rsatilmoqda
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DETAIL VIEW MODAL */}
      {selectedPhone && (
        <DetailModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
        />
      )}

      {/* FORM MODAL */}
      {openForm && (
        <PhoneForm
          initial={editingPhone}
          onClose={() => {
            setOpenForm(false);
            setEditingPhone(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function Stat({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-300 dark:border-zinc-700 p-4 sm:p-5 transition-colors">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            {label}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl font-bold mt-1">
            {value}
          </p>
        </div>
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    in_stock:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
    reserved:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    sold: "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300",
  };

  const labels = {
    in_stock: "Omborda",
    reserved: "Zaxira",
    sold: "Sotilgan",
  };

  return (
    <span
      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function DetailModal({ phone, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto border border-zinc-300 dark:border-zinc-800">
        <div className="sticky top-0 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate">
            {phone.model}
          </h2>
          <button onClick={onClose} className="hover:opacity-80 p-1">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <img
              src={phone.image}
              alt={phone.model}
              className="w-full sm:w-40 h-48 sm:h-40 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <DetailRow
                  label="Brend"
                  value={phone.brand}
                  icon={<Smartphone size={16} />}
                />
                <DetailRow
                  label="Model"
                  value={phone.model}
                  icon={<Smartphone size={16} />}
                />
                <DetailRow
                  label="IMEI"
                  value={phone.imei}
                  icon={<Barcode size={16} />}
                />
                <DetailRow
                  label="Rang"
                  value={phone.color}
                  icon={<Palette size={16} />}
                />
                <DetailRow
                  label="Xotira"
                  value={`${phone.storage}GB`}
                  icon={<Cpu size={16} />}
                />
                <DetailRow
                  label="Holat"
                  value={<StatusBadge status={phone.status} />}
                  icon={<ShoppingCart size={16} />}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 sm:pt-6">
            <h3 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
              Narx ma'lumotlari
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Sotib olish narxi
                </p>
                <p className="text-lg sm:text-xl font-bold mt-1">
                  {phone.buyPrice.toLocaleString()} so'm
                </p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Sotish narxi
                </p>
                <p className="text-lg sm:text-xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {phone.sellPrice > 0
                    ? `${phone.sellPrice.toLocaleString()} so'm`
                    : "-"}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg col-span-1 sm:col-span-2">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Foyda
                </p>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">
                  {(phone.sellPrice - phone.buyPrice).toLocaleString()} so'm
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 sm:pt-6">
            <DetailRow
              label="Qo'shilgan sana"
              value={phone.createdAt}
              icon={<Calendar size={16} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="text-zinc-500">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
        <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}

function PhoneForm({ initial, onSubmit, onClose }) {
  const [data, setData] = useState(
    initial || {
      model: "",
      brand: "",
      storage: "",
      color: "",
      imei: "",
      buyPrice: 0,
      sellPrice: 0,
      image:
        "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=200",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:
        name === "buyPrice" || name === "sellPrice" || name === "storage"
          ? Number(value)
          : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto border border-zinc-300 dark:border-zinc-800">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">
            {initial ? "Tahrirlash" : "Yangi telefon"}
          </h2>
          <button onClick={onClose} className="hover:opacity-80 p-1">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(data);
          }}
          className="p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          {[
            { name: "model", placeholder: "Model" },
            { name: "brand", placeholder: "Brend" },
            { name: "color", placeholder: "Rangi" },
            { name: "storage", placeholder: "Xotira (GB)", type: "number" },
            { name: "imei", placeholder: "IMEI" },
            {
              name: "buyPrice",
              placeholder: "Sotib olish narxi",
              type: "number",
            },
            { name: "sellPrice", placeholder: "Sotish narxi", type: "number" },
          ].map((f) => (
            <div key={f.name}>
              <input
                type={f.type || "text"}
                name={f.name}
                placeholder={f.placeholder}
                value={data[f.name]}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                required={["model", "brand", "imei"].includes(f.name)}
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 sm:py-3 rounded-lg font-semibold bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors text-sm sm:text-base"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all text-sm sm:text-base"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

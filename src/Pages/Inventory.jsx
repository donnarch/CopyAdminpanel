import { useMemo, useState, useEffect } from "react";
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
  Filter,
  MoreVertical,
  Download,
  Upload,
  Menu,
  Grid,
  List,
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // 'table' yoki 'grid'
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Ekran o'lchamini kuzatish
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setViewMode("grid");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filtered = useMemo(() => {
    return phones.filter((p) => {
      const matchesSearch =
        p.model.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.imei.includes(query);
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [phones, query, statusFilter]);

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
    if (window.confirm("Ushbu telefonni rostdan ham o'chirmoqchimisiz?")) {
      setPhones((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Export funksiyasi (soddalashtirilgan)
  const handleExport = () => {
    alert(
      "Export funksiyasi ishga tushdi! Haqiqiy loyihada fayl yuklab olinadi."
    );
  };

  // Import funksiyasi (soddalashtirilgan)
  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.csv";
    input.onchange = (e) => {
      alert("Fayl tanlandi! Haqiqiy loyihada import qilinadi.");
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-3 sm:p-4 md:p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - Mobile optimallashtirilgan */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="w-full sm:w-auto">
            <div className="flex items-center justify-between sm:block">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                  Telefonlar Ombori
                </h1>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  Barcha telefonlar ro'yxati
                </p>
              </div>
              {/* Mobile menu toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 sm:hidden"
                >
                  <Menu size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Actions - Mobile va Desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Mobile view mode toggle */}
            {!isMobile && (
              <div className="hidden sm:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded ${
                    viewMode === "table"
                      ? "bg-white dark:bg-zinc-700 shadow-sm"
                      : ""
                  }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-zinc-700 shadow-sm"
                      : ""
                  }`}
                >
                  <Grid size={16} />
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleImport}
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Upload size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>
              <button
                onClick={handleExport}
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Download size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={() => {
                  setEditingPhone(null);
                  setOpenForm(true);
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs sm:text-sm flex-1 sm:flex-none"
              >
                <Plus size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Yangi telefon</span>
                <span className="xs:hidden">Qo'shish</span>
              </button>
            </div>
          </div>
        </div>

        {/* STATS - Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Stat
            label="Jami"
            value={stats.total}
            icon={
              <Package
                className="text-blue-600 dark:text-blue-400"
                size={isMobile ? 16 : 20}
              />
            }
            compact={isMobile}
          />
          <Stat
            label="Omborda"
            value={stats.inStock}
            icon={
              <ShoppingCart
                className="text-emerald-600 dark:text-emerald-400"
                size={isMobile ? 16 : 20}
              />
            }
            compact={isMobile}
          />
          <Stat
            label="Sotilgan"
            value={stats.sold}
            icon={
              <DollarSign
                className="text-violet-600 dark:text-violet-400"
                size={isMobile ? 16 : 20}
              />
            }
            compact={isMobile}
          />
          <Stat
            label="Foyda"
            value={`${(stats.profit / 1000000).toFixed(1)}M`}
            subtitle="so'm"
            icon={
              <TrendingUp
                className="text-amber-600 dark:text-amber-400"
                size={isMobile ? 16 : 20}
              />
            }
            compact={isMobile}
          />
        </div>

        {/* FILTERS & SEARCH - Mobile optimallashtirilgan */}
        <div
          className={`bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 mb-4 sm:mb-6 ${
            showFilters || !isMobile ? "block" : "hidden sm:block"
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                size={isMobile ? 16 : 18}
              />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Qidirish..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex-1 sm:flex-none">
                <Filter
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={isMobile ? 14 : 16}
                />
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full sm:w-auto pl-9 sm:pl-10 pr-8 py-2 sm:py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                >
                  <option value="all">Barchasi</option>
                  <option value="in_stock">Omborda</option>
                  <option value="reserved">Zaxirada</option>
                  <option value="sold">Sotilgan</option>
                </select>
              </div>
              {!isMobile && (
                <button className="p-2 sm:p-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                  <MoreVertical size={isMobile ? 16 : 18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TABLE / GRID VIEW - Responsive */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          {/* Desktop Table View */}
          {viewMode === "table" && !isMobile ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hidden md:table-cell">
                      IMEI
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Holat
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hidden sm:table-cell">
                      Narxlar
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hidden lg:table-cell">
                      Sana
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {paginatedPhones.length > 0 ? (
                    paginatedPhones.map((phone) => (
                      <tr
                        key={phone.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={phone.image}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                              alt={phone.model}
                            />
                            <div>
                              <p className="font-medium text-sm sm:text-base text-zinc-900 dark:text-white">
                                {phone.model}
                              </p>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                {phone.brand} • {phone.color}
                              </p>
                              <p className="text-xs text-zinc-500 dark:text-zinc-500 md:hidden">
                                IMEI: {phone.imei.slice(0, 10)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <div className="font-mono text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                            {phone.imei}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <StatusBadge
                            status={phone.status}
                            compact={isMobile}
                          />
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                          <div className="space-y-1">
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">
                              {phone.buyPrice.toLocaleString()} so'm
                            </div>
                            <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                              {phone.sellPrice > 0
                                ? `${phone.sellPrice.toLocaleString()} so'm`
                                : "-"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            {phone.createdAt}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setSelectedPhone(phone)}
                              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
                              title="Ko'rish"
                            >
                              <Eye size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingPhone(phone);
                                setOpenForm(true);
                              }}
                              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                              title="Tahrirlash"
                            >
                              <Edit2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(phone.id)}
                              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                              title="O'chirish"
                            >
                              <Trash2 size={14} className="sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 sm:px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-400 dark:text-zinc-600 mb-3" />
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                            Hech qanday telefon topilmadi
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            /* Mobile Grid View */
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-3 sm:gap-4">
                {paginatedPhones.length > 0 ? (
                  paginatedPhones.map((phone) => (
                    <div
                      key={phone.id}
                      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={phone.image}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          alt={phone.model}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="min-w-0">
                              <h3 className="font-medium text-sm text-zinc-900 dark:text-white truncate">
                                {phone.model}
                              </h3>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                {phone.brand} • {phone.color}
                              </p>
                            </div>
                            <StatusBadge status={phone.status} compact={true} />
                          </div>

                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center gap-2 text-xs">
                              <Barcode
                                size={10}
                                className="text-zinc-500 flex-shrink-0"
                              />
                              <span className="font-mono truncate">
                                {phone.imei}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Cpu
                                size={10}
                                className="text-zinc-500 flex-shrink-0"
                              />
                              <span>{phone.storage}GB</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-zinc-200 dark:border-zinc-800">
                            <div>
                              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                Sotish narxi
                              </p>
                              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                {phone.sellPrice > 0
                                  ? `${phone.sellPrice.toLocaleString()} so'm`
                                  : "-"}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setSelectedPhone(phone)}
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingPhone(phone);
                                  setOpenForm(true);
                                }}
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDelete(phone.id)}
                                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center">
                    <Smartphone className="w-12 h-12 mx-auto text-zinc-400 dark:text-zinc-600 mb-3" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Hech qanday telefon topilmadi
                    </p>
                  </div>
                )}
              </div>

              {/* Tablet Grid View (md: ekranlar uchun) */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedPhones.length > 0 &&
                  paginatedPhones.map((phone) => (
                    <PhoneCard
                      key={phone.id}
                      phone={phone}
                      onView={setSelectedPhone}
                      onEdit={() => {
                        setEditingPhone(phone);
                        setOpenForm(true);
                      }}
                      onDelete={() => handleDelete(phone.id)}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* PAGINATION - Responsive */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium">{filtered.length}</span> ta natija,{" "}
              <span className="font-medium">{paginatedPhones.length}</span> tasi
              ko'rsatilmoqda
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={isMobile ? 16 : 18} />
              </button>

              <div className="flex gap-1">
                {Array.from(
                  { length: Math.min(totalPages, isMobile ? 3 : 5) },
                  (_, i) => {
                    let page;
                    if (totalPages <= (isMobile ? 3 : 5)) {
                      page = i + 1;
                    } else if (currentPage <= (isMobile ? 2 : 3)) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - (isMobile ? 1 : 2)) {
                      page = totalPages - (isMobile ? 2 : 4) + i;
                    } else {
                      page = currentPage - (isMobile ? 1 : 2) + i;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 sm:p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={isMobile ? 16 : 18} />
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
          isMobile={isMobile}
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
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function Stat({ label, value, icon, subtitle, compact = false }) {
  return (
    <div
      className={`bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 sm:p-4 ${
        compact ? "" : "hover:border-zinc-300 dark:hover:border-zinc-700"
      } transition-colors`}
    >
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div
          className={`p-1.5 sm:p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${
            compact ? "" : "sm:p-2.5"
          }`}
        >
          {icon}
        </div>
      </div>
      <div>
        <p
          className={`text-zinc-600 dark:text-zinc-400 mb-1 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <p
            className={`font-bold text-zinc-900 dark:text-white ${
              compact ? "text-lg" : "text-xl sm:text-2xl"
            }`}
          >
            {value}
          </p>
          {subtitle && (
            <span className="text-xs text-zinc-500 dark:text-zinc-500">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status, compact = false }) {
  const config = {
    in_stock: {
      label: "Omborda",
      className:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    },
    reserved: {
      label: "Zaxirada",
      className:
        "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
    },
    sold: {
      label: "Sotilgan",
      className:
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 ${
        compact ? "px-2 py-1 text-xs" : "px-2.5 py-1.5 text-xs"
      } rounded-full font-medium ${className}`}
    >
      <div
        className={`rounded-full ${compact ? "w-1.5 h-1.5" : "w-2 h-2"}`}
      ></div>
      {label}
    </span>
  );
}

function PhoneCard({ phone, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <img
            src={phone.image}
            className="w-16 h-16 rounded-lg object-cover"
            alt={phone.model}
          />
          <StatusBadge status={phone.status} />
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
            {phone.model}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            {phone.brand} • {phone.color} • {phone.storage}GB
          </p>
          <div className="text-xs text-zinc-500 dark:text-zinc-500 font-mono">
            {phone.imei}
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Narx</p>
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {phone.sellPrice > 0
                ? `${phone.sellPrice.toLocaleString()} so'm`
                : "-"}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onView(phone)}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Eye size={14} />
            </button>
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ phone, onClose, isMobile }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-full ${
          isMobile ? "max-h-[90vh]" : "max-w-2xl"
        } overflow-y-auto border border-zinc-200 dark:border-zinc-800`}
      >
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 flex justify-between items-center">
          <div className="flex-1 min-w-0">
            <h2
              className={`font-bold text-zinc-900 dark:text-white mb-1 ${
                isMobile ? "text-lg" : "text-xl"
              }`}
            >
              {phone.model}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
              {phone.brand} • {phone.color} • {phone.storage}GB
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors ml-4 flex-shrink-0"
          >
            <X size={isMobile ? 18 : 20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div
            className={`${
              isMobile ? "" : "grid grid-cols-1 lg:grid-cols-3 gap-6"
            } mb-6`}
          >
            <div className={isMobile ? "mb-4" : "lg:col-span-1"}>
              <img
                src={phone.image}
                alt={phone.model}
                className={`w-full ${
                  isMobile ? "h-48" : "h-64"
                } rounded-xl object-cover`}
              />
            </div>
            <div className={isMobile ? "" : "lg:col-span-2"}>
              <div
                className={`grid ${
                  isMobile ? "grid-cols-1 gap-3" : "grid-cols-2 gap-4"
                }`}
              >
                <DetailRow
                  label="IMEI"
                  value={phone.imei}
                  icon={<Barcode size={isMobile ? 14 : 16} />}
                  compact={isMobile}
                />
                <DetailRow
                  label="Rang"
                  value={phone.color}
                  icon={<Palette size={isMobile ? 14 : 16} />}
                  compact={isMobile}
                />
                <DetailRow
                  label="Xotira"
                  value={`${phone.storage}GB`}
                  icon={<Cpu size={isMobile ? 14 : 16} />}
                  compact={isMobile}
                />
                <DetailRow
                  label="Holat"
                  value={
                    <StatusBadge status={phone.status} compact={isMobile} />
                  }
                  icon={<ShoppingCart size={isMobile ? 14 : 16} />}
                  compact={isMobile}
                />
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <DetailRow
                  label="Qo'shilgan sana"
                  value={phone.createdAt}
                  icon={<Calendar size={isMobile ? 14 : 16} />}
                  compact={isMobile}
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 sm:p-5">
            <h3
              className={`font-semibold text-zinc-900 dark:text-white mb-3 ${
                isMobile ? "text-base" : ""
              }`}
            >
              Narx ma'lumotlari
            </h3>
            <div
              className={`grid ${
                isMobile
                  ? "grid-cols-1 gap-3"
                  : "grid-cols-1 md:grid-cols-3 gap-4"
              }`}
            >
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                  Sotib olish narxi
                </p>
                <p
                  className={`font-bold text-zinc-900 dark:text-white ${
                    isMobile ? "text-base" : "text-lg"
                  }`}
                >
                  {phone.buyPrice.toLocaleString()} so'm
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                  Sotish narxi
                </p>
                <p
                  className={`font-bold text-emerald-600 dark:text-emerald-400 ${
                    isMobile ? "text-base" : "text-lg"
                  }`}
                >
                  {phone.sellPrice > 0
                    ? `${phone.sellPrice.toLocaleString()} so'm`
                    : "Narx belgilanmagan"}
                </p>
              </div>
              <div className="p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-1">
                  Foyda
                </p>
                <p
                  className={`font-bold text-blue-600 dark:text-blue-400 ${
                    isMobile ? "text-base" : "text-lg"
                  }`}
                >
                  {(phone.sellPrice - phone.buyPrice).toLocaleString()} so'm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, icon, compact = false }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${
        compact ? "" : ""
      }`}
    >
      <div
        className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 ${
          compact ? "" : ""
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`text-zinc-600 dark:text-zinc-400 ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {label}
        </p>
        <p
          className={`font-medium text-zinc-900 dark:text-white truncate ${
            compact ? "text-sm" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function PhoneForm({ initial, onSubmit, onClose, isMobile }) {
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
      <div
        className={`bg-white dark:bg-zinc-900 rounded-xl w-full ${
          isMobile ? "max-h-[90vh]" : "max-w-md"
        } overflow-y-auto border border-zinc-200 dark:border-zinc-800`}
      >
        <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 flex justify-between items-center">
          <h2
            className={`font-bold text-zinc-900 dark:text-white ${
              isMobile ? "text-lg" : "text-xl"
            }`}
          >
            {initial ? "Telefonni tahrirlash" : "Yangi telefon"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors ml-4 flex-shrink-0"
          >
            <X size={isMobile ? 18 : 20} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(data);
          }}
          className="p-4 sm:p-6 space-y-4"
        >
          <div
            className={`grid ${
              isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
            } gap-3 sm:gap-4`}
          >
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="iPhone 13"
                value={data.model}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Brend
              </label>
              <input
                type="text"
                name="brand"
                placeholder="Apple"
                value={data.brand}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Xotira (GB)
              </label>
              <input
                type="number"
                name="storage"
                placeholder="128"
                value={data.storage}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Rang
              </label>
              <input
                type="text"
                name="color"
                placeholder="Midnight"
                value={data.color}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div className={isMobile ? "" : "sm:col-span-2"}>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                IMEI raqami
              </label>
              <input
                type="text"
                name="imei"
                placeholder="353245110012345"
                value={data.imei}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Sotib olish narxi
              </label>
              <input
                type="number"
                name="buyPrice"
                placeholder="6800000"
                value={data.buyPrice}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                Sotish narxi
              </label>
              <input
                type="number"
                name="sellPrice"
                placeholder="8500000"
                value={data.sellPrice}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors text-sm"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

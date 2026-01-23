import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  X,
  Phone,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";

const demoSales = [
  {
    id: "s1",
    soldAt: "2026-01-18",
    model: "iPhone 13",
    brand: "Apple",
    storage: 128,
    color: "Midnight",
    imei: "353245110012345",
    buyPrice: 6800000,
    sellPrice: 7600000,
    customerName: "Azizbek",
    customerPhone: "+998901234567",
    note: "Aksessuar bilan",
    payment: "cash",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&h=800&fit=crop",
  },
  {
    id: "s2",
    soldAt: "2026-01-16",
    model: "Samsung A54",
    brand: "Samsung",
    storage: 256,
    color: "Black",
    imei: "356789990076543",
    buyPrice: 3200000,
    sellPrice: 3650000,
    customerName: "Dilshod",
    customerPhone: "+998911112233",
    note: "",
    payment: "transfer",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop",
  },
  {
    id: "s3",
    soldAt: "2026-01-12",
    model: "Redmi Note 12",
    brand: "Xiaomi",
    storage: 128,
    color: "Blue",
    imei: "861234560011223",
    buyPrice: 2100000,
    sellPrice: 2350000,
    customerName: "Malika",
    customerPhone: "+998993334455",
    note: "2 oy kafolat",
    payment: "card",
    image:
      "https://cdn-files.kimovil.com/default/0008/83/thumb_782823_default_big.jpg",
  },
  {
    id: "s4",
    soldAt: "2026-01-10",
    model: "iPhone 14 Pro",
    brand: "Apple",
    storage: 256,
    color: "Gold",
    imei: "353245110098765",
    buyPrice: 12000000,
    sellPrice: 13500000,
    customerName: "Sardor",
    customerPhone: "+998905556677",
    note: "VIP mijoz",
    payment: "cash",
    image:
      "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=800&h=800&fit=crop",
  },
  {
    id: "s5",
    soldAt: "2026-01-09",
    model: "Galaxy S23",
    brand: "Samsung",
    storage: 512,
    color: "Cream",
    imei: "356789990054321",
    buyPrice: 8500000,
    sellPrice: 9200000,
    customerName: "Nigora",
    customerPhone: "+998907778899",
    note: "",
    payment: "transfer",
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=850&h=850&fit=crop",
  },
  {
    id: "s6",
    soldAt: "2026-01-08",
    model: "Redmi 13C",
    brand: "Xiaomi",
    storage: 64,
    color: "Green",
    imei: "861234560099887",
    buyPrice: 1500000,
    sellPrice: 1750000,
    customerName: "Jasur",
    customerPhone: "+998991112233",
    note: "Chegirma berildi",
    payment: "cash",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=850&h=850&fit=crop",
  },
  {
    id: "s7",
    soldAt: "2026-01-07",
    model: "OnePlus 11",
    brand: "OnePlus",
    storage: 256,
    color: "White",
    imei: "864567890123456",
    buyPrice: 5000000,
    sellPrice: 5600000,
    customerName: "Anora",
    customerPhone: "+998998765432",
    note: "",
    payment: "card",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=850&h=850&fit=crop",
  },
  {
    id: "s8",
    soldAt: "2026-01-06",
    model: "Pixel 7 Pro",
    brand: "Google",
    storage: 512,
    color: "Obsidian",
    imei: "867890123456789",
    buyPrice: 7500000,
    sellPrice: 8200000,
    customerName: "Qodir",
    customerPhone: "+998999887766",
    note: "3 oy kafolat",
    payment: "transfer",
    image:
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=850&h=850&fit=crop",
  },
  {
    id: "s9",
    soldAt: "2026-01-05",
    model: "iPhone 12",
    brand: "Apple",
    storage: 64,
    color: "Blue",
    imei: "353245110055555",
    buyPrice: 5500000,
    sellPrice: 6200000,
    customerName: "Feruza",
    customerPhone: "+998997776655",
    note: "",
    payment: "cash",
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=850&h=850&fit=crop",
  },
];

function SalesFiltersBar({
  query,
  onQuery,
  from,
  onFrom,
  to,
  onTo,
  payment,
  onPayment,
  onClear,
}) {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Qidirish..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          type="date"
          value={from}
          onChange={(e) => onFrom(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => onTo(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        />
        <select
          value={payment}
          onChange={(e) => onPayment(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="all">Barcha to'lovlar</option>
          <option value="cash">Naqd</option>
          <option value="card">Karta</option>
          <option value="transfer">O'tkazma</option>
        </select>
      </div>
      {(query || from || to || payment !== "all") && (
        <button
          onClick={onClear}
          className="mt-3 text-sm text-blue-400 hover:text-blue-300"
        >
          Tozalash
        </button>
      )}
    </div>
  );
}

function SaleCard({ item, onClick }) {
  const profit = item.sellPrice - item.buyPrice;

  return (
    <div
      onClick={onClick}
      className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden hover:border-blue-500 transition cursor-pointer hover:shadow-lg hover:shadow-blue-500/20"
    >
      {/* Image - Medium Size */}
      <div className="relative h-60 bg-slate-700 flex items-center justify-center overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.model}
            className="w-full h-full object-cover hover:scale-105 transition rounded"
          />
        ) : (
          <Smartphone className="w-12 h-12 text-slate-500" />
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{item.model}</h3>
        <p className="text-sm text-slate-400 mb-3">{item.brand}</p>

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-600/30 text-blue-300 text-xs rounded">
            {item.storage}GB
          </span>
          <span className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded">
            {item.color}
          </span>
        </div>

        {/* Price */}
        <div className="space-y-2 pb-4 border-b border-slate-700">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Xarid:</span>
            <span className="text-slate-300">{money(item.buyPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Sotish:</span>
            <span className="text-white font-semibold">
              {money(item.sellPrice)}
            </span>
          </div>
        </div>

        {/* Profit */}
        <div className="mt-4 py-3 bg-green-600/20 rounded-lg text-center">
          <p className="text-xs text-slate-400 mb-1">Foyda</p>
          <p className="text-lg font-bold text-green-400">+{money(profit)}</p>
        </div>

        {/* Customer */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-sm text-white font-medium">{item.customerName}</p>
          <p className="text-xs text-slate-400">{item.customerPhone}</p>
        </div>

        {/* Click to view */}
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition">
          Batafsil
        </button>
      </div>
    </div>
  );
}

function SaleDetailsModal({ open, data, onClose }) {
  if (!open || !data) return null;

  const profit = data.sellPrice - data.buyPrice;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4 border border-slate-700 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-white">{data.model}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image - Medium Size */}
        <div className="w-full h-48 rounded-lg overflow-hidden bg-slate-700 flex items-center justify-center mb-6">
          {data.image ? (
            <img
              src={data.image}
              alt={data.model}
              className="w-40 h-40 object-cover"
            />
          ) : (
            <Smartphone className="w-16 h-16 text-slate-500" />
          )}
        </div>

        {/* Brand & Details */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-3">{data.brand}</p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg">
              {data.storage}GB
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg">
              {data.color}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">IMEI:</span>
            <span className="text-white font-mono text-sm">{data.imei}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Sana:</span>
            <span className="text-white">{data.soldAt}</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Mijoz:</span>
            <span className="text-white">{data.customerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400">Telefon:</span>
            <span className="text-white">{data.customerPhone}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">To'lov:</span>
            <span className="px-2 py-1 bg-slate-700 rounded text-white text-sm capitalize">
              {data.payment === "cash"
                ? "Naqd"
                : data.payment === "card"
                ? "Karta"
                : "O'tkazma"}
            </span>
          </div>
          {data.note && (
            <div className="flex gap-3">
              <span className="text-slate-400">Izoh:</span>
              <span className="text-white">{data.note}</span>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Xarid narxi</span>
            <span className="text-white font-semibold">
              {money(data.buyPrice)}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-600 pt-3">
            <span className="text-slate-400">Sotish narxi</span>
            <span className="text-white font-semibold">
              {money(data.sellPrice)}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-600 pt-3">
            <span className="text-green-400 font-semibold">Sof Foyda</span>
            <span className="text-green-400 font-bold text-lg">
              +{money(profit)}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Yopish
        </button>
      </div>
    </div>
  );
}

export default function SoldPhones() {
  const [sales] = useState(demoSales);
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [payment, setPayment] = useState("all");
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3; // 3 cards per page

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sales.filter((s) => {
      const matchQuery =
        !q ||
        s.model.toLowerCase().includes(q) ||
        s.brand.toLowerCase().includes(q) ||
        s.imei.includes(q) ||
        (s.customerName || "").toLowerCase().includes(q) ||
        (s.customerPhone || "").includes(q);
      const matchPayment = payment === "all" || s.payment === payment;
      const soldAt = s.soldAt;
      const matchFrom = !from || soldAt >= from;
      const matchTo = !to || soldAt <= to;
      return matchQuery && matchPayment && matchFrom && matchTo;
    });
  }, [sales, query, from, to, payment]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  useMemo(() => {
    setCurrentPage(1);
  }, [query, from, to, payment]);

  const summary = useMemo(() => {
    const count = filtered.length;
    const revenue = filtered.reduce((sum, s) => sum + s.sellPrice, 0);
    const cost = filtered.reduce((sum, s) => sum + s.buyPrice, 0);
    const profit = revenue - cost;
    return { count, revenue, profit };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Sotilgan Telefonlar
            </h1>
            <p className="text-slate-400 mt-1">
              Kimga sotildi, qachon sotildi, narxlar va sof foyda
            </p>
          </div>

          <div className="bg-slate-800 rounded-lg border border-slate-700 px-6 py-4 text-sm">
            <p className="text-slate-400 text-xs mb-2">STATISTIKA</p>
            <div className="space-y-2">
              <div className="text-white font-semibold">
                {summary.count} ta telefon
              </div>
              <div className="text-slate-300">
                Tushum:{" "}
                <span className="text-blue-400">{money(summary.revenue)}</span>
              </div>
              <div className="text-slate-300">
                Foyda:{" "}
                <span className="text-green-400">{money(summary.profit)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <SalesFiltersBar
          query={query}
          onQuery={setQuery}
          from={from}
          onFrom={setFrom}
          to={to}
          onTo={setTo}
          payment={payment}
          onPayment={setPayment}
          onClear={() => {
            setQuery("");
            setFrom("");
            setTo("");
            setPayment("all");
          }}
        />

        {/* Cards Grid - Smaller */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((item) => (
              <SaleCard
                key={item.id}
                item={item}
                onClick={() => setSelected(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Smartphone className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">
              Hech qanday telefon topilmadi
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-700 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Modal */}
        <SaleDetailsModal
          open={!!selected}
          data={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
}

function money(n) {
  return new Intl.NumberFormat("uz-UZ").format(n) + " so'm";
}

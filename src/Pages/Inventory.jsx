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

const isDarkMode = () => document.documentElement.classList.contains("dark");

/* ------------------ MAIN ------------------ */
export default function Inventory() {
  const [phones, setPhones] = useState(demoPhones);
  const [query, setQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const darkMode = isDarkMode();

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
  }, [filtered, currentPage]);

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? " " : " "
      } p-6`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Ombor (Telefonlar)</h1>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Barcha telefonlar ro'yxati
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPhone(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg transition"
          >
            <Plus size={20} />
            Yangi telefon
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat
            label="Jami"
            value={stats.total}
            icon={<Package size={24} />}
            darkMode={darkMode}
          />
          <Stat
            label="Omborda"
            value={stats.inStock}
            icon={<ShoppingCart size={24} />}
            darkMode={darkMode}
          />
          <Stat
            label="Sotilgan"
            value={stats.sold}
            icon={<DollarSign size={24} />}
            darkMode={darkMode}
          />
          <Stat
            label="Foyda"
            value={`${stats.profit.toLocaleString()} so'm`}
            icon={<DollarSign size={24} />}
            darkMode={darkMode}
          />
        </div>

        {/* SEARCH */}
        <div
          className={`mb-6 relative ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <Search className="absolute left-3 top-3" size={18} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Qidirish..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                : "bg-white border-gray-200 placeholder-gray-400"
            }`}
          />
        </div>

        {/* TABLE */}
        <div
          className={`rounded-lg overflow-hidden border transition-colors ${
            darkMode
              ? "border-gray-800 bg-gray-900"
              : "border-gray-200 bg-white"
          }`}
        >
          <table className="w-full">
            <thead className={darkMode ? "bg-gray-800" : "bg-gray-100"}>
              <tr>
                {["Telefon", "IMEI", "Holat", "Narx", "Sana", "Amallar"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-sm font-semibold"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                darkMode ? "divide-gray-800" : "divide-gray-200"
              }`}
            >
              {paginatedPhones.length > 0 ? (
                paginatedPhones.map((p) => (
                  <tr
                    key={p.id}
                    className={`transition-colors ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={p.image}
                        className="w-12 h-12 rounded object-cover"
                        alt={p.model}
                      />
                      <div>
                        <p className="font-semibold">{p.model}</p>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {p.brand}
                        </p>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 font-mono text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {p.imei}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.status} darkMode={darkMode} />
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      {p.sellPrice.toLocaleString()} so'm
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {p.createdAt}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => setSelectedPhone(p)}
                        className={`p-2 rounded transition ${
                          darkMode
                            ? "hover:bg-blue-900/30 text-blue-400"
                            : "hover:bg-blue-100 text-blue-600"
                        }`}
                        title="Ko'rish"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setEditingPhone(p);
                          setOpenForm(true);
                        }}
                        className={`p-2 rounded transition ${
                          darkMode
                            ? "hover:bg-green-900/30 text-green-400"
                            : "hover:bg-green-100 text-green-600"
                        }`}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className={`p-2 rounded transition ${
                          darkMode
                            ? "hover:bg-red-900/30 text-red-400"
                            : "hover:bg-red-100 text-red-600"
                        }`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <Package
                      size={48}
                      className={`mx-auto mb-4 ${
                        darkMode ? "text-gray-600" : "text-gray-300"
                      }`}
                    />
                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
                      Hech qanday telefon topilmadi
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded transition disabled:opacity-50 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white disabled:cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded font-semibold transition ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
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
              className={`p-2 rounded transition disabled:opacity-50 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white disabled:cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </button>

            <span
              className={`ml-4 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentPage} / {totalPages}
            </span>
          </div>
        )}
      </div>

      {/* DETAIL VIEW MODAL */}
      {selectedPhone && (
        <DetailModal
          phone={selectedPhone}
          onClose={() => setSelectedPhone(null)}
          darkMode={darkMode}
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
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function Stat({ label, value, icon, darkMode }) {
  return (
    <div
      className={`p-4 rounded-lg border transition-colors flex items-start justify-between ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div>
        <p
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          {label}
        </p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={darkMode ? "text-blue-400" : "text-blue-600"}>{icon}</div>
    </div>
  );
}

function StatusBadge({ status, darkMode }) {
  const colors = {
    in_stock: darkMode
      ? "bg-green-900/30 text-green-400"
      : "bg-green-100 text-green-800",
    reserved: darkMode
      ? "bg-yellow-900/30 text-yellow-400"
      : "bg-yellow-100 text-yellow-800",
    sold: darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800",
  };

  const labels = {
    in_stock: "Omborda",
    reserved: "Zaxira",
    sold: "Sotilgan",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function DetailModal({ phone, onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto transition-colors ${
          darkMode
            ? "bg-gray-900 border border-gray-800"
            : "bg-white border border-gray-200"
        }`}
      >
        <div className="sticky top-0 flex justify-between items-center p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-2xl font-bold">{phone.model}</h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-6">
            <img
              src={phone.image}
              alt={phone.model}
              className="w-40 h-40 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-3">
              <DetailRow
                label="Brend"
                value={phone.brand}
                darkMode={darkMode}
              />
              <DetailRow
                label="Model"
                value={phone.model}
                darkMode={darkMode}
              />
              <DetailRow label="IMEI" value={phone.imei} darkMode={darkMode} />
              <DetailRow label="Rang" value={phone.color} darkMode={darkMode} />
              <DetailRow
                label="Xotira"
                value={`${phone.storage}GB`}
                darkMode={darkMode}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <h3 className="font-semibold mb-3 text-lg">Narx ma'lumotlari</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Sotib olish narxi
                </p>
                <p className="text-xl font-bold">
                  {phone.buyPrice.toLocaleString()} so'm
                </p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Sotish narxi
                </p>
                <p className="text-xl font-bold text-green-500">
                  {phone.sellPrice.toLocaleString()} so'm
                </p>
              </div>
              <div
                className={`p-4 rounded-lg col-span-2 ${
                  darkMode ? "bg-blue-900/30" : "bg-blue-100"
                }`}
              >
                <p
                  className={`text-sm ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Foyda
                </p>
                <p
                  className={`text-2xl font-bold ${
                    darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {(phone.sellPrice - phone.buyPrice).toLocaleString()} so'm
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <DetailRow
              label="Holat"
              value={<StatusBadge status={phone.status} darkMode={darkMode} />}
              darkMode={darkMode}
            />
            <DetailRow
              label="Qo'shilgan sana"
              value={phone.createdAt}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, darkMode }) {
  return (
    <div className="flex justify-between items-center py-2">
      <span
        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        {label}
      </span>
      <span
        className={`font-semibold ${
          darkMode ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function PhoneForm({ initial, onSubmit, onClose, darkMode }) {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`rounded-lg w-full max-w-md max-h-96 overflow-y-auto transition-colors ${
          darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"
        }`}
      >
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {initial ? "Tahrirlash" : "Yangi telefon"}
          </h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(data);
          }}
          className="p-6 space-y-4"
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
            <input
              key={f.name}
              type={f.type || "text"}
              name={f.name}
              placeholder={f.placeholder}
              value={data[f.name]}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded border transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 placeholder-gray-400"
              }`}
              required={["model", "brand", "imei"].includes(f.name)}
            />
          ))}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2 rounded font-semibold transition ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Bekor
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded font-semibold transition"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

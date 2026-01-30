import React, { useState, useEffect } from "react";
import {
  Trash2,
  DollarSign,
  Calendar,
  TrendingUp,
  Filter,
  Download,
  ShoppingBag,
  CheckCircle,
  Clock,
  ChevronDown,
  Plus,
  MoreVertical,
  Edit2,
} from "lucide-react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Telefon sotib olish",
      amount: 5000,
      date: "2024-01-15",
      category: "Xarid",
      status: "completed",
      description: "Yangi iPhone 15 Pro Max",
    },
  ]);

  const categories = ["Xarid", "Ijara", "Kommunal", "Boshqa"];
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showActions, setShowActions] = useState(null);

  useEffect(() => {
    const update = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    setShowActions(null);
  };

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const filteredExpenses =
    selectedCategory === "Hammasi"
      ? expenses
      : expenses.filter((e) => e.category === selectedCategory);

  // Rang sxemalari
  const bg = isDarkMode ? "bg-zinc-900" : "bg-white";
  const borderColor = isDarkMode ? "border-zinc-800" : "border-zinc-300";
  const cardBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const secondaryText = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const hoverBg = isDarkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-50";

  const colors = (c) =>
    c === "Xarid"
      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
      : c === "Ijara"
      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
      : c === "Kommunal"
      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
      : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800";

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${bg}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Xarajatlar</h1>
              <p className={`text-sm ${secondaryText} mt-2`}>
                Xarajatlarni boshqarish va kuzatish
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className={`${cardBg} ${borderColor} border px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors`}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Hisobot</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Qo'shish</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div
              className={`${cardBg} ${borderColor} border rounded-xl p-5 shadow-sm`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${secondaryText} mb-1`}>
                    Jami xarajat
                  </p>
                  <p className="text-2xl font-bold">
                    ${totalExpenses.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    +12% o'tgan oydan
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div
              className={`${cardBg} ${borderColor} border rounded-xl p-5 shadow-sm`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${secondaryText} mb-1`}>
                    O'rtacha xarajat
                  </p>
                  <p className="text-2xl font-bold">
                    ${averageExpense.toFixed(0)}
                  </p>
                  <p className="text-xs text-blue-500 mt-1">Har bir xarajat</p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div
              className={`${cardBg} ${borderColor} border rounded-xl p-5 shadow-sm`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-sm ${secondaryText} mb-1`}>
                    Xarajatlar soni
                  </p>
                  <p className="text-2xl font-bold">{expenses.length}</p>
                  <p className="text-xs text-orange-500 mt-1">Jami yozuvlar</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div
          className={`${cardBg} ${borderColor} border rounded-xl overflow-hidden shadow-sm`}
        >
          {/* Table Header */}
          <div className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-bold text-lg">Xarajatlar ro'yxati</h2>
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-48">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full pl-10 pr-8 py-2 ${borderColor} border rounded-lg appearance-none bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="Hammasi">Hammasi</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${borderColor}`}>
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Nomi</th>
                  <th className="text-left p-4 font-medium text-sm">Miqdori</th>
                  <th className="text-left p-4 font-medium text-sm">Sana</th>
                  <th className="text-left p-4 font-medium text-sm">
                    Kategoriya
                  </th>
                  <th className="text-left p-4 font-medium text-sm">Holati</th>
                  <th className="text-left p-4 font-medium text-sm">
                    Harakatlar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredExpenses.map((e) => (
                  <tr key={e.id} className={`${hoverBg} transition-colors`}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl border ${colors(
                            e.category
                          )}`}
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{e.title}</p>
                          <p className={`text-xs ${secondaryText}`}>
                            {e.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-lg">
                        ${e.amount.toLocaleString()}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{e.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium border ${colors(
                          e.category
                        )}`}
                      >
                        {e.category}
                      </span>
                    </td>
                    <td className="p-4">
                      {e.status === "completed" ? (
                        <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">To'langan</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                          <Clock className="w-5 h-5" />
                          <span className="font-medium">Kutilmoqda</span>
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowActions(showActions === e.id ? null : e.id)
                          }
                          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {showActions === e.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg z-10">
                            <button
                              className="w-full px-4 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center gap-2"
                              onClick={() => setShowActions(null)}
                            >
                              <Edit2 className="w-4 h-4" />
                              Tahrirlash
                            </button>
                            <button
                              className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                              onClick={() => handleDeleteExpense(e.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                              O'chirish
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredExpenses.length === 0 && (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-zinc-400" />
              </div>
              <p className="text-lg font-medium mb-2">Xarajat topilmadi</p>
              <p className={`text-sm ${secondaryText}`}>
                Yangi xarajat qo'shish uchun "Qo'shish" tugmasini bosing
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className={`mt-6 text-sm ${secondaryText} text-center`}>
          <p>Jami {expenses.length} ta xarajat • Oxirgi yangilanish: bugun</p>
        </div>
      </div>
    </div>
  );
}

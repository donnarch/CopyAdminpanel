import React, { useState } from "react";
import {
  Trash2,
  Plus,
  DollarSign,
  Calendar,
  TrendingUp,
  Filter,
  Download,
  MoreVertical,
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
    },
    {
      id: 2,
      title: "Do'kon ijara",
      amount: 2000,
      date: "2024-01-10",
      category: "Ijara",
      status: "pending",
    },
    {
      id: 3,
      title: "Elektr",
      amount: 500,
      date: "2024-01-12",
      category: "Kommunal",
      status: "completed",
    },
    {
      id: 4,
      title: "Internet",
      amount: 200,
      date: "2024-01-14",
      category: "Kommunal",
      status: "completed",
    },
  ]);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Xarid",
  });
  const categories = ["Xarid", "Ijara", "Kommunal", "Boshqa"];
  const [selectedCategory, setSelectedCategory] = useState("Hammasi");
  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount) {
      setExpenses([
        ...expenses,
        {
          id: Date.now(),
          ...newExpense,
          amount: parseFloat(newExpense.amount),
          status: "completed",
        },
      ]);
      setNewExpense({
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Xarid",
      });
    }
  };
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyChange = 12.5; // foizda o'zgarish
  const filteredExpenses =
    selectedCategory === "Hammasi"
      ? expenses
      : expenses.filter((exp) => exp.category === selectedCategory);
  return (
    <div className="min-h-screen bg-linear-to-br p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold  mb-2">Xarajatlar Boshqaruvi</h1>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            <Download className="w-5 h-5" />
            Hisobot
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-r  rounded-2xl p-6 border border-gray-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">Jami Xarajat</p>
                <p className="text-3xl font-bold ">
                  ${totalExpenses.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">
                    +{monthlyChange}% oyiga
                  </span>
                </div>
              </div>
              <div className="bg-red-500/10 p-3 rounded-xl">
                <DollarSign className="w-8 h-8 text-red-400" />
              </div>
            </div>
          </div>
          <div
            className="bg-linear-to-r 
           border border-gray-300 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">O'rtacha Xarajat</p>
                <p className="text-3xl font-bold ">
                  ${(totalExpenses / expenses.length || 0).toFixed(0)}
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Har bir xarajat uchun
                </p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-xl">
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-linear-to-r  border border-gray-300 rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-2">Xarajatlar Soni</p>
                <p className="text-3xl font-bold">{expenses.length}</p>
                <p className="text-slate-500 text-sm mt-2">
                  Barcha kategoriyalar
                </p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className=" ml-50 border border-gray-300 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-8 border-b border-gray-500">
              <div className="flex justify-between items-center">
                <h2 className=" font-bold text-xl">Xarajatlar Ro'yxati</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 border border-gray-700 rounded-xl px-4 py-2">
                    <Filter className="w-4 h-4 " />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent text-black focus:outline-none"
                    >
                      <option value="Hammasi">Hammasi</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Xarajat
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Summa
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Sana
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Kategoriya
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider">
                      Holati
                    </th>
                    <th className="px-6 py-4 text-right font-semibold text-sm uppercase tracking-wider">
                      Amallar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {filteredExpenses.map((exp) => (
                    <tr
                      key={exp.id}
                      className=" transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              exp.category === "Xarid"
                                ? "bg-blue-500/10"
                                : exp.category === "Ijara"
                                ? "bg-purple-500/10"
                                : exp.category === "Kommunal"
                                ? "bg-green-500/10"
                                : "bg-orange-500/10"
                            }`}
                          >
                            <DollarSign
                              className={`w-4 h-4 ${
                                exp.category === "Xarid"
                                  ? "text-blue-400"
                                  : exp.category === "Ijara"
                                  ? "text-purple-400"
                                  : exp.category === "Kommunal"
                                  ? "text-green-400"
                                  : "text-orange-400"
                              }`}
                            />
                          </div>
                          <div>
                            <p className=" font-medium">{exp.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xl font-bold ">
                          ${exp.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            exp.category === "Xarid"
                              ? "bg-blue-500/20 text-blue-500"
                              : exp.category === "Ijara"
                              ? "bg-purple-500/20 text-purple-500"
                              : exp.category === "Kommunal"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-orange-500/20 text-orange-600"
                          }`}
                        >
                          {exp.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            exp.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {exp.status === "completed"
                            ? "To'langan"
                            : "Kutilmoqda"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredExpenses.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <DollarSign className="w-12 h-12 text-slate-600" />
                </div>
                <h3 className="text-xl text-white font-semibold mb-2">
                  Xarajatlar topilmadi
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  {selectedCategory === "Hammasi"
                    ? "Hozircha xarajatlar mavjud emas. Yangi xarajat qo'shish uchun formani to'ldiring."
                    : `"${selectedCategory}" kategoriyasida xarajatlar mavjud emas.`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

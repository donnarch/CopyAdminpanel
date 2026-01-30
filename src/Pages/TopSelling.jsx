import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Star,
  DollarSign,
  ShoppingCart,
  ChevronRight,
  Award,
  Zap,
  Users,
  BarChart3,
  PieChart as PieChartIcon,
  Smartphone,
  TrendingDown,
  Crown,
  Target,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function TopSelling() {
  const [topPhones] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro",
      brand: "Apple",
      sold: 245,
      revenue: 122500,
      rating: 4.8,
      growth: "+18%",
    },
    {
      id: 2,
      name: "Samsung S24",
      brand: "Samsung",
      sold: 189,
      revenue: 94500,
      rating: 4.6,
      growth: "+12%",
    },
    {
      id: 3,
      name: "Xiaomi 14",
      brand: "Xiaomi",
      sold: 156,
      revenue: 39000,
      rating: 4.4,
      growth: "+8%",
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      sold: 142,
      revenue: 56800,
      rating: 4.5,
      growth: "+15%",
    },
    {
      id: 5,
      name: "Pixel 8",
      brand: "Google",
      sold: 128,
      revenue: 64000,
      rating: 4.7,
      growth: "+10%",
    },
  ]);

  const [monthlyData] = useState([
    { month: "Yan", sales: 2400, revenue: 120000 },
    { month: "Fev", sales: 3210, revenue: 160500 },
    { month: "Mar", sales: 2290, revenue: 114500 },
    { month: "Apr", sales: 2000, revenue: 100000 },
    { month: "May", sales: 2181, revenue: 109050 },
    { month: "Iyun", sales: 2500, revenue: 125000 },
    { month: "Iyul", sales: 2800, revenue: 140000 },
    { month: "Avg", sales: 3100, revenue: 155000 },
  ]);

  const brandData = [
    { name: "Apple", value: 245, color: "#3b82f6" },
    { name: "Samsung", value: 189, color: "#10b981" },
    { name: "Xiaomi", value: 156, color: "#f59e0b" },
    { name: "OnePlus", value: 142, color: "#ef4444" },
    { name: "Google", value: 128, color: "#8b5cf6" },
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode tekshirish
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const totalSales = topPhones.reduce((sum, phone) => sum + phone.sold, 0);
  const totalRevenue = topPhones.reduce((sum, phone) => sum + phone.revenue, 0);
  const avgRating = (
    topPhones.reduce((sum, phone) => sum + phone.rating, 0) / topPhones.length
  ).toFixed(1);
  // Border va background ranglari
  const borderColor = isDarkMode ? "border-gray-800" : "border-zinc-300";
  const bgColor = isDarkMode ? "bg-zinc-900" : "bg-zinc-50";
  const textColor = isDarkMode ? "text-white" : "text-zinc-900";
  const secondaryText = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const cardBg = isDarkMode ? "bg-zinc-900" : "bg-white";
  return (
    <div className={`min-h-screen p-4 sm:p-6 ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
                Eng Ko'p Sotiladigan Telefonlar
              </h1>
              <p className={`text-sm ${secondaryText}`}>
                Eng yaxshi sotuvchi modellar va statistikalar
              </p>
            </div>
            <button
              className={`${cardBg} ${borderColor} border px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Hisobot</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Total Sales */}
          <div
            className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border ${borderColor} ${cardBg}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs sm:text-sm mb-2 ${secondaryText}`}>
                  Jami Sotuvlar
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {totalSales.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12.5%</span>
                  </div>
                  <span className="text-xs text-zinc-500">o'tgan oy</span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div
            className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border ${borderColor} ${cardBg}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs sm:text-sm mb-2 ${secondaryText}`}>
                  Jami Daromad
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  ${(totalRevenue / 1000).toFixed(0)}K
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>+8.3%</span>
                  </div>
                  <span className="text-xs text-zinc-500">o'tgan oy</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-2 sm:p-3 rounded-lg">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          {/* Active Brands */}
          <div
            className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border ${borderColor} ${cardBg}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs sm:text-sm mb-2 ${secondaryText}`}>
                  Aktiv Brendlar
                </p>
                <p className="text-xl sm:text-2xl font-bold">
                  {brandData.length}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-blue-500">
                    <Users className="w-3 h-3" />
                    <span>+2 yangi</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 sm:p-3 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          {/* Average Rating */}
          <div
            className={`rounded-lg sm:rounded-xl p-4 sm:p-5 border ${borderColor} ${cardBg}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-xs sm:text-sm mb-2 ${secondaryText}`}>
                  O'rtacha Reyting
                </p>
                <p className="text-xl sm:text-2xl font-bold">{avgRating}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3 h-3" />
                    <span>Yuqori</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/20 p-2 sm:p-3 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Monthly Sales Chart */}
          <div
            className={`rounded-xl border ${borderColor} p-4 sm:p-5 ${cardBg}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Oylik Sotuvlar Trendi
                </h3>
              </div>
            </div>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis
                    stroke={isDarkMode ? "#9ca3af" : "#6b7280"}
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value} ta`, "Sotuvlar"]}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Brand Distribution */}
          <div
            className={`rounded-xl border ${borderColor} p-4 sm:p-5 ${cardBg}`}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                <PieChartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Brend Bo'yicha Taqsimot
                </h3>
              </div>
            </div>
            <div className="h-56 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={brandData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    innerRadius={30}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {brandData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={isDarkMode ? "#1f2937" : "#ffffff"}
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} ta`, "Sotuv"]}
                    contentStyle={{
                      backgroundColor: isDarkMode ? "#0000" : "#ffffff",
                      borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center">
              {brandData.map((brand, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  <span className="text-xs font-medium">{brand.name}</span>
                  <span className="text-xs text-zinc-500">{brand.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div
          className={`rounded-xl border ${borderColor} overflow-hidden ${cardBg}`}
        >
          <div className="p-4 sm:p-5 border-b ${borderColor}">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-lg">
                  <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    Eng Ko'p Sotiladigan Modellar
                  </h3>
                  <p className={`text-xs ${secondaryText}`}>Top 5 telefonlar</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>Jami: {totalSales} sotuv</span>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    #
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Model
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Brend
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Sotuvlar
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Daromad
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    O'sish
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Reyting
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {topPhones.map((phone, index) => (
                  <tr
                    key={phone.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === 0
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                            : index === 1
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            : index === 2
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <span className="font-bold">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                          <Smartphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">
                            {phone.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          phone.brand === "Apple"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : phone.brand === "Samsung"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : phone.brand === "Xiaomi"
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            : phone.brand === "OnePlus"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                        }`}
                      >
                        {phone.brand}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="font-bold">
                        {phone.sold.toLocaleString()} ta
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        ${(phone.revenue / 1000).toFixed(0)}K
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-1 text-green-500">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs font-medium">
                          {phone.growth}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(phone.rating)
                                  ? "fill-amber-500 text-amber-500"
                                  : "fill-zinc-300 dark:fill-zinc-700 text-zinc-300 dark:text-zinc-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {phone.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            <div className="p-4 space-y-4">
              {topPhones.map((phone, index) => (
                <div
                  key={phone.id}
                  className={`rounded-lg border ${borderColor} p-4`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          index === 0
                            ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                            : index === 1
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                            : index === 2
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        <span className="font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{phone.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              phone.brand === "Apple"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                : phone.brand === "Samsung"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                                : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {phone.brand}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-green-500">
                            <TrendingUp className="w-3 h-3" />
                            {phone.growth}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">
                        {phone.rating}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Sotuvlar</div>
                      <div className="font-bold">
                        {phone.sold.toLocaleString()} ta
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">Daromad</div>
                      <div className="font-bold text-green-600 dark:text-green-400">
                        ${(phone.revenue / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import {
  Download,
  BarChart3,
  RefreshCw,
  ShoppingBag,
  Wallet,
  Coins,
  Warehouse,
  Target,
} from "lucide-react";
import { Segmented } from "../components/Segmented";
import { StatCard } from "../components/StatCard";
import { RevenueChart } from "../components/RevenueChart";
import { TopProducts } from "../components/TopProducts";
import { BarChartSection } from "../components/BarChartSection";
import { PerformanceMetrics } from "../components/PerformanceMetrics";
import { FinancialSummary } from "../components/FinancialSummary";
import {
  formatMoney,
  getChartData,
  getBarChartData,
  calculateStats,
} from "../utils/helpers";
import { RANGE_OPTIONS, TOP_MODELS } from "../utils/constants";
import { usePerformanceData } from "../hooks/usePerformanceData";
import { useFinancialData } from "../hooks/useFinancialData";
export default function Home() {
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    }
    return false;
  });
  const stats = useMemo(() => calculateStats(), []);
  const chartData = useMemo(() => getChartData(range), [range]);
  const barChartData = useMemo(() => getBarChartData(range), [range]);
  const performanceData = usePerformanceData(stats);
  const financialData = useFinancialData();
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    };
    handleThemeChange();
    window.addEventListener("themeChanged", handleThemeChange);
    const interval = setInterval(handleThemeChange, 500);
    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
      clearInterval(interval);
    };
  }, []);
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };
  const handleExport = () => {
    const data = [
      ["Metric", "Value"],
      ["Sold Products", stats.soldCount],
      ["Revenue", stats.revenue],
      ["Expenses", stats.expenses],
      ["In Stock", stats.inStock],
      ["Profit", stats.profit],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "dashboard-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div
      className={`p-4 md:p-6 min-h-screen transition-colors ${
        darkMode ? "bg-black-900" : "bg-gray-50"
      }`}
    >
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
          <div className="flex items-center gap-3">
            <h1
              className={`text-2xl md:text-3xl font-bold ${
                darkMode ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Dashboard Analytics
            </h1>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-300"
                  : "hover:bg-gray-200 text-gray-600"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              title="Ma'lumotlarni yangilash"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Segmented
              value={range}
              onChange={setRange}
              items={RANGE_OPTIONS}
            />
            <button
              onClick={handleExport}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                darkMode
                  ? "bg-black-800 border border-gray-700 text-black-100 hover:bg-black font-bold"
                  : "bg-white border border-black text-black font-bold"
              }`}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={ShoppingBag}
          label="Sotilgan mahsulotlar"
          value={`${stats.soldCount} ta`}
          change="+8.4%"
          trend="up"
          bgColor={darkMode ? "bg-gray-800/40" : "bg-blue-100"}
          iconColor={darkMode ? "text-gray-100" : "text-blue-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Wallet}
          label="Jami daromad"
          value={formatMoney(stats.revenue)}
          change="+12.4%"
          trend="up"
          bgColor={darkMode ? "bg-gray-800/40" : "bg-emerald-100"}
          iconColor={darkMode ? "text-gray-100" : "text-emerald-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Coins}
          label="Xarajatlar"
          value={formatMoney(stats.expenses)}
          change="+1.6%"
          trend="down"
          bgColor={darkMode ? "bg-gray-800/40" : "bg-red-100"}
          iconColor={darkMode ? "text-gray-100" : "text-red-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Warehouse}
          label="Ombor qoldiq"
          value={`${stats.inStock} ta`}
          change="+2.0%"
          trend="up"
          bgColor={darkMode ? "bg-gray-800/40" : "bg-purple-100"}
          iconColor={darkMode ? "text-gray-100" : "text-purple-600"}
          darkMode={darkMode}
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart
          chartData={chartData}
          formatMoney={formatMoney}
          darkMode={darkMode}
        />
        <TopProducts
          products={TOP_MODELS}
          formatMoney={formatMoney}
          darkMode={darkMode}
        />
      </div>
      <BarChartSection
        barChartData={barChartData}
        formatMoney={formatMoney}
        darkMode={darkMode}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PerformanceMetrics data={performanceData} darkMode={darkMode} />
        <FinancialSummary
          financialData={financialData}
          profit={stats.profit}
          profitMargin={stats.profitMargin}
          formatMoney={formatMoney}
          darkMode={darkMode}
        />
      </div>
      <div
        className={`rounded-xl border p-5 shadow-xl transition-colors ${
          darkMode ? "bg-black-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode ? "bg-gray-700" : "bg-blue-400"
              }`}
            >
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className={`text-lg font-bold mb-1 ${
                  darkMode ? "text-white-100" : "text-gray-900"
                }`}
              >
                Haftalik hisobot
              </h3>
              <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                Maqsadlarga erishish:{" "}
                <span className="font-bold text-emerald-400">89.2%</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`text-right hidden md:block ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <p className="text-sm">Quyi maqsadlar</p>
              <p
                className={`text-lg font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                +15% sotuv o'sishi
              </p>
            </div>
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Batafsil tahlil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

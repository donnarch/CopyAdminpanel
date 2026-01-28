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
      className={`p-3 sm:p-4 md:p-6 min-h-screen transition-colors ${
        darkMode ? "" : "bg-gray-50"
      }`}
    >
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          {/* Title & Refresh Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard Analytics
            </h1>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-400 hover:text-gray-300"
                  : "hover:bg-gray-200 text-gray-600 hover:text-gray-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              title="Ma'lumotlarni yangilash"
            >
              <RefreshCw
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>

          {/* Controls: Range Selector & Export Button */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
            <Segmented
              value={range}
              onChange={setRange}
              items={RANGE_OPTIONS}
            />
            <button
              onClick={handleExport}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg transition-all font-semibold text-xs sm:text-sm ${
                darkMode
                  ? " border border-gray-700 text-gray-100 hover:bg-gray-700"
                  : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid - Responsive 1-2-3-4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8">
        <StatCard
          icon={ShoppingBag}
          label="Sotilgan mahsulotlar"
          value={`${stats.soldCount} ta`}
          change="+8.4%"
          trend="up"
          bgColor={darkMode ? "bg-blue-500/20" : "bg-blue-100"}
          iconColor={darkMode ? "text-blue-400" : "text-blue-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Wallet}
          label="Jami daromad"
          value={formatMoney(stats.revenue)}
          change="+12.4%"
          trend="up"
          bgColor={darkMode ? "bg-emerald-500/20" : "bg-emerald-100"}
          iconColor={darkMode ? "text-emerald-400" : "text-emerald-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Coins}
          label="Xarajatlar"
          value={formatMoney(stats.expenses)}
          change="+1.6%"
          trend="down"
          bgColor={darkMode ? "bg-red-500/20" : "bg-red-100"}
          iconColor={darkMode ? "text-red-400" : "text-red-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Warehouse}
          label="Ombor qoldiq"
          value={`${stats.inStock} ta`}
          change="+2.0%"
          trend="up"
          bgColor={darkMode ? "bg-purple-500/20" : "bg-purple-100"}
          iconColor={darkMode ? "text-purple-400" : "text-purple-600"}
          darkMode={darkMode}
        />
      </div>

      {/* Charts Section - 1 col mobile, 2 col lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
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

      {/* Bar Chart - Full Width */}
      <div className="mb-6 sm:mb-8">
        <BarChartSection
          barChartData={barChartData}
          formatMoney={formatMoney}
          darkMode={darkMode}
        />
      </div>

      {/* Metrics & Financial Summary - 1 col mobile, 2 col lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
        <PerformanceMetrics data={performanceData} darkMode={darkMode} />
        <FinancialSummary
          financialData={financialData}
          profit={stats.profit}
          profitMargin={stats.profitMargin}
          formatMoney={formatMoney}
          darkMode={darkMode}
        />
      </div>

      {/* Weekly Report Card - Responsive Layout */}
      <div
        className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 md:p-5 shadow-lg transition-colors ${
          darkMode ? " border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Left: Icon & Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                darkMode ? "" : "bg-blue-400"
              }`}
            >
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-base sm:text-lg md:text-xl font-bold mb-1 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Haftalik hisobot
              </h3>
              <p
                className={`text-xs sm:text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Maqsadlarga erishish:{" "}
                <span className="font-bold text-emerald-400">89.2%</span>
              </p>
            </div>
          </div>

          {/* Right: Goals & Button */}
          <div className="flex items-center gap-3 sm:gap-4 justify-between sm:justify-start">
            <div
              className={`text-left sm:text-right hidden sm:block text-xs sm:text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="mb-1">Quyi maqsadlar</p>
              <p
                className={`font-bold ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                +15% sotuv o'sishi
              </p>
            </div>
            <button
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all shadow-lg flex-shrink-0 ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="hidden sm:inline">Batafsil tahlil</span>
              <span className="sm:hidden">Tahlil</span>
            </button>
          </div>
        </div>

        {/* Mobile Goal Display */}
        <div
          className={`sm:hidden mt-3 pt-3 border-t ${
            darkMode
              ? "border-gray-700 text-gray-400"
              : "border-gray-200 text-gray-600"
          }`}
        >
          <p className="text-xs mb-1">Quyi maqsadlar</p>
          <p
            className={`text-sm font-bold ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            +15% sotuv o'sishi
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import {
  Download,
  BarChart3,
  ChevronRight,
  RefreshCw,
  ShoppingBag,
  Wallet,
  Coins,
  Warehouse,
  Target,
  Moon,
  Sun,
} from "lucide-react";
// Components
import { Segmented } from "../components/Segmented";
import { StatCard } from "../components/StatCard";
import { RevenueChart } from "../components/RevenueChart";
import { TopProducts } from "../components/TopProducts";
import { BarChartSection } from "../components/BarChartSection";
import { PerformanceMetrics } from "../components/PerformanceMetrics";
import { FinancialSummary } from "../components/FinancialSummary";
// Utils
import {
  formatMoney,
  getChartData,
  getBarChartData,
  calculateStats,
} from "../utils/helpers";
import { RANGE_OPTIONS, TOP_MODELS } from "../utils/constants";
// Hooks
import { usePerformanceData } from "../hooks/usePerformanceData";
import { useFinancialData } from "../hooks/useFinancialData";

export default function Home() {
  const [range, setRange] = useState("week");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Hooks va data
  const stats = useMemo(() => calculateStats(), []);
  const chartData = useMemo(() => getChartData(range), [range]);
  const barChartData = useMemo(() => getBarChartData(range), [range]);
  const performanceData = usePerformanceData(stats);
  const financialData = useFinancialData();

  // Handlers
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleExport = () => {
    console.log("Export button clicked");
    // Export logic here
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`p-4 md:p-6 min-h-screen transition-colors ${
        darkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      {/* ========== Header ========== */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-4">
          <div>
            <div
              className={`flex items-center text-sm mb-2 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>Bosh sahifa</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              <h1
                className={`text-2xl md:text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Dashboard Analytics
              </h1>
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-200 text-gray-600"
                }`}
                title="Ma'lumotlarni yangilash"
              >
                <RefreshCw
                  className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Segmented
              value={range}
              onChange={setRange}
              items={RANGE_OPTIONS}
            />
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              title="Dark/Light Mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleExport}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                darkMode
                  ? "bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* ========== Stats Grid ========== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={ShoppingBag}
          label="Sotilgan mahsulotlar"
          value={`${stats.soldCount} ta`}
          change="+8.4%"
          trend="up"
          bgColor={darkMode ? "bg-blue-900/30" : "bg-blue-100"}
          iconColor={darkMode ? "text-blue-400" : "text-blue-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Wallet}
          label="Jami daromad"
          value={formatMoney(stats.revenue)}
          change="+12.4%"
          trend="up"
          bgColor={darkMode ? "bg-emerald-900/30" : "bg-emerald-100"}
          iconColor={darkMode ? "text-emerald-400" : "text-emerald-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Coins}
          label="Xarajatlar"
          value={formatMoney(stats.expenses)}
          change="+1.6%"
          trend="down"
          bgColor={darkMode ? "bg-red-900/30" : "bg-red-100"}
          iconColor={darkMode ? "text-red-400" : "text-red-600"}
          darkMode={darkMode}
        />
        <StatCard
          icon={Warehouse}
          label="Ombor qoldiq"
          value={`${stats.inStock} ta`}
          change="+2.0%"
          trend="up"
          bgColor={darkMode ? "bg-purple-900/30" : "bg-purple-100"}
          iconColor={darkMode ? "text-purple-400" : "text-purple-600"}
          darkMode={darkMode}
        />
      </div>

      {/* ========== Charts Section ========== */}
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

      {/* ========== Bar Chart Section ========== */}
      <BarChartSection
        barChartData={barChartData}
        formatMoney={formatMoney}
        darkMode={darkMode}
      />

      {/* ========== Metrics Section ========== */}
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

      {/* ========== Bottom Summary ========== */}
      <div
        className={`rounded-xl border p-5 shadow-xl transition-colors ${
          darkMode
            ? "bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border-gray-800"
            : "bg-gradient-to-r from-white via-gray-50 to-white border-gray-200"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                darkMode
                  ? "bg-gradient-to-br from-blue-600 to-blue-700"
                  : "bg-gradient-to-br from-blue-400 to-blue-500"
              }`}
            >
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className={`text-lg font-bold mb-1 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Haftalik hisobot
              </h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Maqsadlarga erishish:{" "}
                <span className="font-bold text-emerald-400">89.2%</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`text-right hidden md:block ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p className="text-sm">Quyi maqsadlar</p>
              <p
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                +15% sotuv o'sishi
              </p>
            </div>
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
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

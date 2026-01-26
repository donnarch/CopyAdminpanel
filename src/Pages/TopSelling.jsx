import React, { useState } from "react";
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
  LineChart,
  Line,
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
      color: "#3B82F6",
    },
    {
      id: 2,
      name: "Samsung S24",
      brand: "Samsung",
      sold: 189,
      revenue: 94500,
      rating: 4.6,
      color: "#10B981",
    },
    {
      id: 3,
      name: "Xiaomi 14",
      brand: "Xiaomi",
      sold: 156,
      revenue: 39000,
      rating: 4.4,
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      sold: 142,
      revenue: 56800,
      rating: 4.5,
      color: "#EF4444",
    },
    {
      id: 5,
      name: "Pixel 8",
      brand: "Google",
      sold: 128,
      revenue: 64000,
      rating: 4.7,
      color: "#8B5CF6",
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
    { name: "Apple", value: 245, color: "#3B82F6" },
    { name: "Samsung", value: 189, color: "#10B981" },
    { name: "Xiaomi", value: 156, color: "#F59E0B" },
    { name: "OnePlus", value: 142, color: "#EF4444" },
    { name: "Google", value: 128, color: "#8B5CF6" },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  const totalSales = topPhones.reduce((sum, phone) => sum + phone.sold, 0);
  const totalRevenue = topPhones.reduce((sum, phone) => sum + phone.revenue, 0);
  const avgRating = (
    topPhones.reduce((sum, phone) => sum + phone.rating, 0) / topPhones.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-linear-to-br p-4 md:p-8">
      {/* Header Section */}
      <div className="mb-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r ">
                  Eng Ko'p Sotilayotgan Telefonlar
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Cards with Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Jami Sotuvlar",
            value: totalSales.toLocaleString(),
            icon: ShoppingCart,
            color: "from-blue-500 to-cyan-500",
            change: "+12.5%",
            bgIcon: "🛒",
          },
          {
            title: "Jami Daromad",
            value: `$${(totalRevenue / 1000).toFixed(0)}K`,
            icon: DollarSign,
            color: "from-emerald-500 to-green-500",
            change: "+8.3%",
            bgIcon: "💰",
          },
          {
            title: "Aktiv Brendlar",
            value: brandData.length,
            icon: Users,
            color: "from-purple-500 to-violet-500",
            change: "+2 yangi",
            bgIcon: "🏢",
          },
          {
            title: "O'rtacha Reyting",
            value: `${avgRating} ⭐`,
            icon: Star,
            color: "from-amber-500 to-orange-500",
            change: "Yuqori",
            bgIcon: "⭐",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br  p-6  transition-all duration-300 hover:scale-[1.02]"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{
                background: stat.color
                  .replace("from-", "")
                  .replace("to-", "")
                  .split(" "),
              }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className=" text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl md:text-3xl font-bold ">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                      {stat.change}
                    </span>
                    <span className="text-xs text-slate-500">
                      o'tgan oyga nisbatan
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Sales Chart */}
        <div className="group relative bg-gradient-to-br  backdrop-blur-sm rounded-2xlp-6  transition-all duration-300">
          <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-blue-500 to-cyan-900 rounded-full text-sm font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Oylik Sotuvlar Trendi
          </div>
          <div className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white dark:black",
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                    borderRadius: "12px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  formatter={(value) => [`${value} ta`, "Sotuvlar"]}
                />
                <Bar
                  dataKey="sales"
                  fill="url(#colorSales)"
                  name="Sotuvlar"
                  radius={[12, 12, 0, 0]}
                  animationDuration={1500}
                />
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Brand Distribution */}
        <div className="group relative bg-gradient-to-br  backdrop-blur-sm rounded-2xl   p-6  transition-all duration-300">
          <div className="absolute -top-3 left-6 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold text-white flex items-center gap-2">
            <PieChartIcon className="w-4 h-4" />
            Brend Bo'yicha Taqsimot
          </div>
          <div className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={brandData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  innerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {brandData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(17, 24, 39, 0.5)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} ta`, "Sotuv"]}
                  contentStyle={{
                    backgroundColor: "rgba(17, 24, 39, 0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(75, 85, 99, 0.5)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {brandData.map((brand, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  <span className="text-sm text-slate-300">{brand.name}</span>
                  <span className="text-sm text-slate-500">
                    {brand.value} ta
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="group relative bg-gradient-to-br backdrop-blur-sm rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300">
        <div className="absolute top-2   left-6 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-sm font-semibold text-white flex items-center gap-2">
          <Award className="w-4 h-4" />
          Eng Ko'p Sotilayotgan Modellar
        </div>

        <div className="px-6 pt-8 pb-4">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-medium ">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Model</div>
            <div className="col-span-2">Brend</div>
            <div className="col-span-2">Sotuvlar</div>
            <div className="col-span-2">Daromad</div>
            <div className="col-span-2">Reyting</div>
          </div>

          <div className="space-y-2 mt-2">
            {topPhones.map((phone, index) => (
              <div
                key={phone.id}
                className="group/item grid grid-cols-12 gap-4 px-4 py-4 rounded-xl cursor-pointer hover-lift shadow-glow"
              >
                <div className="col-span-1 flex items-center">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-400/20 to-gray-500/20 border border-gray-500/30"
                          : index === 2
                          ? "bg-gradient-to-br from-amber-700/20 to-amber-800/20 border border-amber-700/30"
                          : "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700"
                      }`}
                    >
                      <span className="text-lg font-bold">
                        {index === 0
                          ? "1"
                          : index === 1
                          ? "2"
                          : index === 2
                          ? "3"
                          : index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br  flex items-center justify-center text-2xl">
                    {phone.image}
                  </div>
                  <div>
                    <div className="font-semibold">{phone.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-amber-500" />
                      <span className="text-emerald-400">{phone.growth}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="px-3 py-1.5 rounded-lg  border border-gray-700">
                    <span className=" font-medium">{phone.brand}</span>
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="text-blue-400 font-bold text-lg">
                    {phone.sold}
                  </div>
                  <div className="ml-2 text-xs text-slate-500">ta</div>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="text-emerald-400 font-bold text-lg">
                    ${(phone.revenue / 1000).toFixed(0)}K
                  </div>
                </div>

                <div className="col-span-2 flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(phone.rating)
                              ? "fill-amber-500 text-amber-500"
                              : "fill-gray-700 text-black-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold ml-2">
                      {phone.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .shadow-glow {
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

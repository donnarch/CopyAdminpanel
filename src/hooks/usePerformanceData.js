import { TrendingUp, Users, CreditCard, Package } from "lucide-react";
import { formatMoney } from "../utils/helpers";

export const usePerformanceData = (stats) => {
  return [
    {
      metric: "Foyda marjasi",
      value: `${stats.profitMargin}%`,
      change: "+2.4%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      metric: "O'rtacha buyurtma",
      value: formatMoney(stats.avgOrderValue),
      change: "",
      trend: "up",
      icon: CreditCard,
      color: "text-blue-400",
    },
    {
      metric: "Mijozlar bazasi",
      value: "1,247",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-400",
    },
    {
      metric: "Qaytish darajasi",
      value: "2.1%",
      change: "-0.8%",
      trend: "down",
      icon: Package,
      color: "text-red-400",
    },
  ];
};

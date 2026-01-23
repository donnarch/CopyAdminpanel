import { formatMoney } from "../utils/helpers";

export const useFinancialData = () => {
  return [
    {
      label: "Jami aktivlar",
      value: formatMoney(245_000_000),
      change: "+15.2%",
      trend: "up",
    },
    {
      label: "Aylanma mablag'",
      value: formatMoney(42_000_000),
      change: "+8.4%",
      trend: "up",
    },
    {
      label: "Debitorlik",
      value: formatMoney(18_500_000),
      change: "-3.2%",
      trend: "down",
    },
    {
      label: "Kreditorlik",
      value: formatMoney(12_300_000),
      change: "+1.6%",
      trend: "up",
    },
  ];
};

import { CHART_DATA, BAR_CHART_DATA } from "./constants";

export const formatMoney = (n) =>
  new Intl.NumberFormat("uz-UZ").format(n) + " ";

export const getChartData = (range) => CHART_DATA[range] || CHART_DATA.week;

export const getBarChartData = (range) =>
  BAR_CHART_DATA[range] || BAR_CHART_DATA.week;

export const calculateStats = () => {
  const revenue = 128_500_000;
  const expenses = 12_300_000;
  const profit = revenue - expenses;

  return {
    soldCount: 38,
    revenue,
    expenses,
    profit,
    inStock: 74,
    profitMargin: ((profit / revenue) * 100).toFixed(1),
    avgOrderValue: revenue / 38,
  };
};

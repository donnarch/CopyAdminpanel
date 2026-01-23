export const CHART_DATA = {
  week: [
    { name: "Du", sold: 5, profit: 12, revenue: 4500000, target: 6 },
    { name: "Se", sold: 4, profit: 10, revenue: 3800000, target: 5 },
    { name: "Ch", sold: 6, profit: 15, revenue: 5200000, target: 6 },
    { name: "Pa", sold: 3, profit: 8, revenue: 2800000, target: 5 },
    { name: "Ju", sold: 8, profit: 18, revenue: 6200000, target: 7 },
    { name: "Sh", sold: 7, profit: 16, revenue: 5800000, target: 8 },
    { name: "Ya", sold: 5, profit: 11, revenue: 4600000, target: 6 },
  ],
  month: [
    {
      name: "1-hafta",
      sold: 18,
      profit: 40,
      revenue: 15000000,
      target: 20,
    },
    {
      name: "2-hafta",
      sold: 22,
      profit: 52,
      revenue: 18000000,
      target: 25,
    },
    {
      name: "3-hafta",
      sold: 14,
      profit: 36,
      revenue: 12000000,
      target: 18,
    },
    {
      name: "4-hafta",
      sold: 20,
      profit: 48,
      revenue: 16500000,
      target: 22,
    },
  ],
  year: [
    { name: "Yan", sold: 60, profit: 120, revenue: 45000000, target: 65 },
    { name: "Fev", sold: 48, profit: 95, revenue: 38000000, target: 55 },
    { name: "Mar", sold: 70, profit: 140, revenue: 52000000, target: 70 },
    { name: "Apr", sold: 66, profit: 132, revenue: 48000000, target: 65 },
    { name: "May", sold: 58, profit: 110, revenue: 42000000, target: 60 },
    { name: "Iyun", sold: 62, profit: 128, revenue: 46000000, target: 65 },
  ],
};

export const BAR_CHART_DATA = {
  week: [
    { name: "Du", sales: 5, profit: 12, expenses: 3 },
    { name: "Se", sales: 4, profit: 10, expenses: 2 },
    { name: "Ch", sales: 6, profit: 15, expenses: 4 },
    { name: "Pa", sales: 3, profit: 8, expenses: 2 },
    { name: "Ju", sales: 8, profit: 18, expenses: 5 },
    { name: "Sh", sales: 7, profit: 16, expenses: 4 },
    { name: "Ya", sales: 5, profit: 11, expenses: 3 },
  ],
  month: [
    { name: "1-hafta", sales: 18, profit: 40, expenses: 12 },
    { name: "2-hafta", sales: 22, profit: 52, expenses: 15 },
    { name: "3-hafta", sales: 14, profit: 36, expenses: 10 },
    { name: "4-hafta", sales: 20, profit: 48, expenses: 13 },
  ],
  year: [
    { name: "Yan", sales: 60, profit: 120, expenses: 35 },
    { name: "Fev", sales: 48, profit: 95, expenses: 30 },
    { name: "Mar", sales: 70, profit: 140, expenses: 40 },
    { name: "Apr", sales: 66, profit: 132, expenses: 38 },
    { name: "May", sales: 58, profit: 110, expenses: 32 },
    { name: "Iyun", sales: 62, profit: 128, expenses: 36 },
  ],
};

export const TOP_MODELS = [
  {
    model: "iPhone 15 Pro",
    sold: 12,
    revenue: 127_000_000,
    margin: 28,
    stock: 8,
  },
  {
    model: "Samsung S24",
    sold: 8,
    revenue: 94_000_000,
    margin: 25,
    stock: 12,
  },
  {
    model: "Xiaomi 14",
    sold: 7,
    revenue: 82_000_000,
    margin: 22,
    stock: 15,
  },
  {
    model: "iPhone 13",
    sold: 6,
    revenue: 35_400_000,
    margin: 18,
    stock: 5,
  },
  {
    model: "OnePlus 12",
    sold: 5,
    revenue: 45_000_000,
    margin: 20,
    stock: 7,
  },
];

export const RANGE_OPTIONS = [
  { label: "Hafta", value: "week" },
  { label: "Oy", value: "month" },
  { label: "Yil", value: "year" },
];

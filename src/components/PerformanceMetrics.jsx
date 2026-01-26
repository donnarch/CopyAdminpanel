export function PerformanceMetrics({ data }) {
  return (
    <div className="bg-linear-to-br  rounded-xl  p-5 ">
      <h2 className="text-lg font-bold  mb-6">Biznes ko'rsatkichlari</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="p-4  rounded-lg  border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold ">{item.metric}</p>
                <div
                  className={`p-2 rounded-lg ${item.color.replace(
                    "text",
                    "bg"
                  )}/10`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{item.value}</p>
                <span
                  className={`text-sm font-medium ${
                    item.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <span className="text-gray-500">trend:</span>
                <span
                  className={
                    item.trend === "up" ? "text-emerald-400" : "text-red-400"
                  }
                >
                  {item.trend === "up" ? "Ijobiy" : "Salbiy"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

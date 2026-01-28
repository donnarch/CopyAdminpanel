export function Segmented({ value, onChange, items }) {
  return (
    <div className="inline-flex rounded-lg sm:rounded-lg border border-gray-700  p-1 sm:p-1.5 gap-1 flex-wrap sm:flex-nowrap">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`
            rounded-md px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium 
            transition-all duration-200 whitespace-nowrap
            ${
              it.value === value
                ? "bg-white text-gray-900 shadow-md cursor-pointer"
                : "  hover:bg-gray-500/50 cursor-pointer"
            }
          `}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

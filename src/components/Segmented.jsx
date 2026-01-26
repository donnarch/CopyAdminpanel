export function Segmented({ value, onChange, items }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-800 bg-black-900 p-1">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            it.value === value
              ? " "
              : " "
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

import { formatCurrency } from '@/utils/formatters'

export default function SpendingBreakdown({ data }) {
  if (!data?.length) return null

  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.name} className="grid grid-cols-[140px_1fr_88px] items-center gap-3">
          {/* Label */}
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-base shrink-0">{d.icon}</span>
            <span className="text-slate-700 dark:text-slate-300 truncate">{d.name}</span>
          </div>

          {/* Bar */}
          <div className="h-2 rounded-full bg-slate-100 dark:bg-[#1e2538] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${d.pct}%`, background: d.color }}
            />
          </div>

          {/* Amount */}
          <p className="text-[12px] font-semibold font-mono text-slate-600 dark:text-slate-400 text-right">
            {formatCurrency(d.value)}
          </p>
        </div>
      ))}
    </div>
  )
}
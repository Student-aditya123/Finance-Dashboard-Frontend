import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/utils/formatters'
import { ProgressBar } from '@/components/ui/Index'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="card px-3 py-2 text-[12px] shadow-xl">
      <p className="font-semibold text-slate-700 dark:text-slate-200">{d.icon} {d.name}</p>
      <p className="text-slate-500 dark:text-slate-400 mt-0.5">
        {formatCurrency(d.value)} · {d.pct}%
      </p>
    </div>
  )
}

export default function SpendingDonutChart({ data }) {
  if (!data?.length) return null

  return (
    <div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={54}
            outerRadius={78}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 space-y-2.5">
        {data.slice(0, 6).map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="text-[13px] w-5 shrink-0">{d.icon}</span>
            <span className="text-[12px] text-slate-600 dark:text-slate-400 flex-1 truncate">
              {d.name}
            </span>
            <div className="w-20">
              <ProgressBar pct={d.pct} color={d.color} />
            </div>
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 w-8 text-right shrink-0">
              {d.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

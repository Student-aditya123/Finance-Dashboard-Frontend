import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { formatCurrencyCompact, formatCurrency } from '@/utils/formatters'
import { useTheme } from '@/hooks'

const SERIES = [
  { key: 'income',  label: 'Income',   color: '#22c55e' },
  { key: 'expense', label: 'Expenses', color: '#ef4444' },
  { key: 'balance', label: 'Balance',  color: '#6872f5', dashed: true },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="card px-3 py-2.5 text-[12px] shadow-xl">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-slate-500 dark:text-slate-400 w-16">{p.name}</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 ml-auto pl-4">
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TrendLineChart({ data }) {
  const { isDark } = useTheme()
  const gridColor   = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
  const tickColor   = isDark ? '#5c6485' : '#94a3b8'

  const chartData = data.labels.map((label, i) => ({
    label,
    income:  data.income[i],
    expense: data.expense[i],
    balance: data.balance[i],
  }))

  return (
    <div>
      {/* Custom legend */}
      <div className="flex items-center gap-5 mb-4 flex-wrap">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5 text-[12px] text-slate-500 dark:text-slate-400">
            <span
              className="w-6 h-0.5 rounded-full inline-block"
              style={{
                background: s.color,
                backgroundImage: s.dashed
                  ? `repeating-linear-gradient(90deg, ${s.color} 0 6px, transparent 6px 10px)`
                  : undefined,
              }}
            />
            {s.label}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: tickColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: tickColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrencyCompact}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          {SERIES.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={2}
              dot={{ r: 3.5, fill: s.color, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
              strokeDasharray={s.dashed ? '6 3' : undefined}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

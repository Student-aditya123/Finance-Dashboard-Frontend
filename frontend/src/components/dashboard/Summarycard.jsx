import clsx from 'clsx'
import { formatCurrency } from '@/utils/formatters'

const VARIANTS = {
  balance: {
    label:      'Total Balance',
    icon:       '◈',
    textColor:  'text-brand-500',
    iconBg:     'bg-brand-50 dark:bg-[rgba(94,110,247,0.12)]',
    iconColor:  'text-brand-500',
    accentBg:   'before:bg-brand-400',
  },
  income: {
    label:      'Total Income',
    icon:       '↑',
    textColor:  'text-emerald-500',
    iconBg:     'bg-emerald-50 dark:bg-emerald-950',
    iconColor:  'text-emerald-500',
    accentBg:   'before:bg-emerald-400',
  },
  expense: {
    label:      'Total Expenses',
    icon:       '↓',
    textColor:  'text-red-500',
    iconBg:     'bg-red-50 dark:bg-red-950',
    iconColor:  'text-red-500',
    accentBg:   'before:bg-red-400',
  },
}

export default function SummaryCard({ variant, amount, changePct, loading }) {
  const v = VARIANTS[variant]

  if (loading) {
    return (
      <div className="card p-5 space-y-3">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-7 w-40 rounded" />
        <div className="skeleton h-2.5 w-20 rounded" />
      </div>
    )
  }

  const changePositive = changePct >= 0

  return (
    <div className={clsx(
      'card p-5 relative overflow-hidden',
      'before:absolute before:top-0 before:right-0 before:w-20 before:h-20',
      'before:opacity-10 before:rounded-bl-full',
      v.accentBg,
    )}>
      {/* Icon */}
      <div className={clsx(
        'absolute top-4 right-4 w-9 h-9 rounded-xl flex items-center justify-center text-lg',
        v.iconBg, v.iconColor,
      )}>
        {v.icon}
      </div>

      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
        {v.label}
      </p>

      <p className={clsx('text-[24px] font-bold tracking-tight font-mono mb-1.5', v.textColor)}>
        {formatCurrency(amount)}
      </p>

      {changePct !== undefined && (
        <div className="flex items-center gap-1.5 text-[12px] font-medium">
          <span className={changePositive ? 'text-emerald-500' : 'text-red-500'}>
            {changePositive ? '▲' : '▼'} {Math.abs(changePct).toFixed(1)}%
          </span>
          <span className="text-slate-400 dark:text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  )
}

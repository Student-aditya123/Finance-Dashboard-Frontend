import clsx from 'clsx'
import { ProgressBar } from '@/components/ui/Index'

export default function InsightCard({
  icon,
  label,
  value,
  subtext,
  pct = 0,
  barColor = '#5e6ef7',
  valueColor,
  iconBg = 'bg-brand-50 dark:bg-[rgba(94,110,247,0.12)]',
}) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      {/* Icon */}
      <div className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0',
        iconBg,
      )}>
        {icon}
      </div>

      {/* Label */}
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {label}
      </p>

      {/* Value */}
      <p className={clsx('text-[22px] font-bold tracking-tight', valueColor ?? 'text-slate-900 dark:text-white')}>
        {value}
      </p>

      {/* Subtext */}
      {subtext && (
        <p className="text-[12px] text-slate-500 dark:text-slate-400 -mt-2">{subtext}</p>
      )}

      {/* Progress bar */}
      <ProgressBar pct={pct} color={barColor} />
    </div>
  )
}

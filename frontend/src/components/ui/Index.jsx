import clsx from 'clsx'

// ── Card ──────────────────────────────────────────────────────────────────────
export function Card({ className, children, ...props }) {
  return (
    <div className={clsx('card p-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {title}
      </h3>
      {action}
    </div>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
export function Badge({ type }) {
  return (
    <span className={clsx('badge', type === 'income' ? 'badge-income' : 'badge-expense')}>
      {type}
    </span>
  )
}

// ── Category chip ─────────────────────────────────────────────────────────────
export function CategoryChip({ icon, name }) {
  return (
    <span className="
      inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium
      bg-slate-100 dark:bg-[#252d42]
      border border-slate-200 dark:border-[#2a3352]
      text-slate-600 dark:text-slate-400
    ">
      {icon} {name}
    </span>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
export function Skeleton({ className }) {
  return <div className={clsx('skeleton', className)} />
}

export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-36" />
      <Skeleton className="h-2.5 w-20" />
    </div>
  )
}

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({ icon = '📂', title = 'No results', subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <span className="text-4xl">{icon}</span>
      <p className="text-[15px] font-semibold text-slate-600 dark:text-slate-300">{title}</p>
      {subtitle && (
        <p className="text-[13px] text-slate-400 dark:text-slate-500">{subtitle}</p>
      )}
    </div>
  )
}

// ── Stat mini ─────────────────────────────────────────────────────────────────
export function StatPill({ label, value, positive }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-medium">
      <span className={positive ? 'text-emerald-500' : 'text-red-500'}>
        {positive ? '▲' : '▼'} {Math.abs(value).toFixed(1)}%
      </span>
      <span className="text-slate-400 dark:text-slate-500">{label}</span>
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────
export function ProgressBar({ pct, color = '#5e6ef7' }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-200 dark:bg-[#1e2538] overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, pct)}%`, background: color }}
      />
    </div>
  )
}

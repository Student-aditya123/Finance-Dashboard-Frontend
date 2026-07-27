import clsx from 'clsx'
import { useRole } from '@/hooks'

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Overview',      icon: OverviewIcon    },
  { id: 'transactions', label: 'Transactions',  icon: TransactionsIcon },
  { id: 'insights',     label: 'Insights',      icon: InsightsIcon    },
]

export default function Sidebar({ page, onNavigate }) {
  const { role, toggleRole, isAdmin } = useRole()

  return (
    <aside className="
      w-55 min-w-55 flex flex-col
      bg-white dark:bg-[#161b27]
      border-r border-slate-200 dark:border-[#2a3352]
      h-screen overflow-y-auto shrink-0
      max-sm:hidden
    ">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200 dark:border-[#2a3352]">
        <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-centervshrink-0">
          <LogoIcon />
        </div>
        <span className="font-bold text-[16px] tracking-tight text-slate-900 dark:text-white">
          Fin<span className="text-brand-500">Flow</span>
        </span>
      </div>

      {/* Navigation */ }
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="nav-section-label">Menu</p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={clsx('nav-item', page === id && 'active')}
          >
            <Icon className="w-8.5 h-3.5 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Role switcher */}
      <div className="p-3 border-t border-slate-200 dark:border-[#2a3352]">
        <button
          onClick={toggleRole}
          title="Click to switch role"
          className="
            w-full flex items-center gap-2.5 p-3 rounded-xl
            border border-slate-200 dark:border-[#2a3352]
            bg-slate-50 dark:bg-[#1e2538]
            hover:border-brand-400 transition-all duration-150 cursor-pointer
            text-left
          "
        >
          <span className={clsx(
            'w-2 h-2 rounded-full shrink-0',
            isAdmin ? 'bg-emerald-400' : 'bg-amber-400'
          )} />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-100 truncate">
              {isAdmin ? 'Admin' : 'Viewer'}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">Click to switch role</p>
          </div>
          <SwapIcon className="w-4 h-4 text-slate-400 shrink-0" />
        </button>
      </div>
    </aside>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function NavSectionLabel({ children }) {
  return (
    <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
      {children}
    </p>
  )
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 13L8 3L14.5 13H1.5Z" fill="white" />
    </svg>
  )
}
function OverviewIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" />
      <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" />
      <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" />
      <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" />
    </svg>
  )
}
function TransactionsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5h12M3 9h12M3 13h8" strokeLinecap="round" />
    </svg>
  )
}
function InsightsIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="2,14 6,8 10,11 16,4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function SwapIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5h10M3 11h10M10 2l3 3-3 3M6 8l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

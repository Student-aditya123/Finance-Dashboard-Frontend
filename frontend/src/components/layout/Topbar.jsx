import toast from 'react-hot-toast'
import { useRole, useTheme, useTransactions } from '@/hooks'
import { exportToCSV } from '@/utils/formatters'
import { useState } from 'react'
import TransactionModal from '@/components/transactions/TransactionModal'

const PAGE_TITLES = {
  dashboard:    { title: 'Overview',     subtitle: 'Your financial summary' },
  transactions: { title: 'Transactions', subtitle: 'All income and expenses' },
  insights:     { title: 'Insights',     subtitle: 'Spending analysis' },
}

export default function Topbar({ page, onAddClick }) {
  const { isAdmin } = useRole()
  const { theme, toggleTheme, isDark } = useTheme()
  const { filteredTransactions } = useTransactions()
  const [modalOpen, setModalOpen] = useState(false)

  const { title, subtitle } = PAGE_TITLES[page] ?? PAGE_TITLES.dashboard

  const handleExport = () => {
    exportToCSV(filteredTransactions)
    toast.success('CSV exported successfully')
  }

  return (
    <>
      <header className="
        flex items-center gap-3 px-5 py-4 shrink-0
        bg-white dark:bg-[#161b27]
        border-b border-slate-200 dark:border-[#2a3352]
      ">
        {/* Page title */}
        <div className="flex-1">
          <h1 className="text-[16px] font-bold tracking-tight text-slate-900 dark:text-white leading-none">
            {title}
          </h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button onClick={toggleTheme} className="btn text-[12px]">
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* CSV Export */}
          <button onClick={handleExport} className="btn text-[12px]">
            <DownloadIcon />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Add transaction — admin only */}
          {isAdmin && (
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary text-[12px]"
            >
              <PlusIcon />
              <span>Add Transaction</span>
            </button>
          )}

          {/* Avatar */}
          <div className="
            w-8 h-8 rounded-full flex items-center justify-center
            bg-brand-50 dark:bg-[rgba(94,110,247,0.12)]
            border-2 border-brand-400
            text-brand-600 dark:text-brand-400
            text-[11px] font-bold shrink-0
          ">
            JD
          </div>
        </div>
      </header>

      {modalOpen && (
        <TransactionModal
          txn={null}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function PlusIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v12M2 8h12" strokeLinecap="round"/></svg>
}
function DownloadIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2v9M4 7l4 4 4-4M2 13h12" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function SunIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="3"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/></svg>
}
function MoonIcon() {
  return <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13.5 10A6 6 0 016 2.5a6 6 0 100 11 6 6 0 007.5-3.5z" strokeLinejoin="round"/></svg>
}
import { useEffect } from 'react'
import useFinanceStore from '@/store/useFinanceStore'

// ── useTheme ─────────────────────────────────────────────────────────────────
// Syncs theme state to <html> class for Tailwind dark mode

export function useTheme() {
  const { theme, toggleTheme } = useFinanceStore((s) => ({
    theme: s.theme,
    toggleTheme: s.toggleTheme,
  }))

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  return { theme, toggleTheme, isDark: theme === 'dark' }
}

// ── useTransactions ──────────────────────────────────────────────────────────

export function useTransactions() {
  const store = useFinanceStore()
  return {
    transactions:           store.transactions,
    filteredTransactions:   store.getFilteredTransactions(),
    stats:                  store.getStats(),
    search:                 store.search,
    filterType:             store.filterType,
    filterCat:              store.filterCat,
    sortCol:                store.sortCol,
    sortDir:                store.sortDir,
    setSearch:              store.setSearch,
    setFilterType:          store.setFilterType,
    setFilterCat:           store.setFilterCat,
    setSort:                store.setSort,
    resetFilters:           store.resetFilters,
    addTransaction:         store.addTransaction,
    updateTransaction:      store.updateTransaction,
    deleteTransaction:      store.deleteTransaction,
  }
}

// ── useRole ──────────────────────────────────────────────────────────────────

export function useRole() {
  const { role, toggleRole } = useFinanceStore((s) => ({
    role: s.role,
    toggleRole: s.toggleRole,
  }))
  return { role, toggleRole, isAdmin: role === 'admin' }
}

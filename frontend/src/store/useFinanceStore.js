import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SEED_TRANSACTIONS } from '@/utils/seedData'

const useFinanceStore = create(
  persist(
    (set, get) => ({
      // ── Data ────────────────────────────────────────────────
      transactions: SEED_TRANSACTIONS,

      // ── Role ────────────────────────────────────────────────
      role: 'admin', // 'admin' | 'viewer'
      setRole: (role) => set({ role }),
      toggleRole: () =>
        set((s) => ({ role: s.role === 'admin' ? 'viewer' : 'admin' })),

      // ── Theme ───────────────────────────────────────────────
      theme: 'dark', // 'dark' | 'light'
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // ── Filters ─────────────────────────────────────────────
      search: '',
      filterType: 'all',   // 'all' | 'income' | 'expense'
      filterCat: 'all',
      sortCol: 'date',
      sortDir: 'desc',

      setSearch: (search) => set({ search }),
      setFilterType: (filterType) => set({ filterType }),
      setFilterCat: (filterCat) => set({ filterCat }),
      setSort: (col) =>
        set((s) => ({
          sortCol: col,
          sortDir: s.sortCol === col && s.sortDir === 'desc' ? 'asc' : 'desc',
        })),
      resetFilters: () =>
        set({ search: '', filterType: 'all', filterCat: 'all' }),

      // ── CRUD ────────────────────────────────────────────────
      addTransaction: (txn) =>
        set((s) => ({
          transactions: [
            { ...txn, id: Date.now() },
            ...s.transactions,
          ],
        })),

      updateTransaction: (id, data) =>
        set((s) => ({
          transactions: s.transactions.map((t) =>
            t.id === id ? { ...t, ...data } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((s) => ({
          transactions: s.transactions.filter((t) => t.id !== id),
        })),

      // ── Derived (selectors) ─────────────────────────────────
      getFilteredTransactions: () => {
        const { transactions, search, filterType, filterCat, sortCol, sortDir } = get()
        let list = [...transactions]

        if (filterType !== 'all') list = list.filter((t) => t.type === filterType)
        if (filterCat !== 'all') list = list.filter((t) => t.category === filterCat)
        if (search) {
          const q = search.toLowerCase()
          list = list.filter(
            (t) =>
              t.description.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q)
          )
        }

        list.sort((a, b) => {
          let av = a[sortCol]
          let bv = b[sortCol]
          if (sortCol === 'amount') {
            av = a.type === 'expense' ? -a.amount : a.amount
            bv = b.type === 'expense' ? -b.amount : b.amount
          }
          if (sortDir === 'asc') return av > bv ? 1 : -1
          return av < bv ? 1 : -1
        })

        return list
      },

      getStats: () => {
        const { transactions } = get()
        const income = transactions
          .filter((t) => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0)
        const expense = transactions
          .filter((t) => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0)
        return { income, expense, balance: income - expense }
      },
    }),
    {
      name: 'finflow-storage',
      partialize: (s) => ({
        transactions: s.transactions,
        role: s.role,
        theme: s.theme,
      }),
    }
  )
)

export default useFinanceStore


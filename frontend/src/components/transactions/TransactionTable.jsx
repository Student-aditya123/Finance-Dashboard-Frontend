import { useState } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useTransactions, useRole } from '@/hooks'
import { formatDate, formatCurrency } from '@/utils/formatters'
import { CATEGORIES } from '@/utils/seedData'
import { Badge, CategoryChip, EmptyState } from '@/components/ui/Index'
import TransactionModal from './TransactionModal'

const COLS = [
  { key: 'date',        label: 'Date',        sortable: true  },
  { key: 'description', label: 'Description', sortable: true  },
  { key: 'category',    label: 'Category',    sortable: false },
  { key: 'type',        label: 'Type',        sortable: false },
  { key: 'amount',      label: 'Amount',      sortable: true  },
]

export default function TransactionTable({ limit }) {
  const { filteredTransactions, sortCol, sortDir, setSort, deleteTransaction } = useTransactions()
  const { isAdmin } = useRole()
  const [editTxn, setEditTxn] = useState(null)

  const rows = limit ? filteredTransactions.slice(0, limit) : filteredTransactions

  const handleDelete = (id) => {
    deleteTransaction(id)
    toast.success('Transaction deleted')
  }

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span className="opacity-25 ml-1">↕</span>
    return <span className="text-brand-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  if (!rows.length) {
    return (
      <EmptyState
        icon="📂"
        title="No transactions found"
        subtitle="Try adjusting your search or filter"
      />
    )
  }

  return (
    <>
      <div className="overflow-x-auto -mx-5">
        <table className="w-full min-w-640px">
          <thead>
            <tr className="border-b border-slate-200 dark:border-[#2a3352]">
              {COLS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && setSort(col.key)}
                  className={clsx(
                    'px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest',
                    'text-slate-400 dark:text-slate-500',
                    col.sortable && 'cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 select-none',
                  )}
                >
                  {col.label}
                  {col.sortable && <SortIcon col={col.key} />}
                </th>
              ))}
              {isAdmin && (
                <th className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((txn) => {
              const cat = CATEGORIES[txn.category]
              return (
                <tr
                  key={txn.id}
                  className="border-b border-slate-100 dark:border-[#1e2538] hover:bg-slate-50 dark:hover:bg-[#1e2538] transition-colors"
                >
                  <td className="px-5 py-3 text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(txn.date)}
                  </td>
                  <td className="px-5 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-100 max-w-200px truncate">
                    {txn.description}
                  </td>
                  <td className="px-5 py-3">
                    <CategoryChip icon={cat?.icon} name={txn.category} />
                  </td>
                  <td className="px-5 py-3">
                    <Badge type={txn.type} />
                  </td>
                  <td className="px-5 py-3 font-mono text-[13px] font-semibold whitespace-nowrap">
                    <span className={txn.type === 'income' ? 'text-emerald-500' : 'text-red-500'}>
                      {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditTxn(txn)}
                          className="btn text-[11px] px-2.5 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(txn.id)}
                          className="btn btn-danger text-[11px] px-2.5 py-1"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {editTxn && (
        <TransactionModal
          txn={editTxn}
          onClose={() => setEditTxn(null)}
        />
      )}
    </>
  )
}
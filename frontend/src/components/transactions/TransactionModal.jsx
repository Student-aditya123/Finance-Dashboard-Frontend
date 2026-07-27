import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTransactions } from '@/hooks'
import { ALL_CATEGORIES } from '@/utils/seedData'

const EMPTY_FORM = {
  description: '',
  amount:      '',
  date:        new Date().toISOString().split('T')[0],
  type:        'expense',
  category:    'Food',
}

export default function TransactionModal({ txn, onClose }) {
  const { addTransaction, updateTransaction } = useTransactions()
  const isEdit = Boolean(txn)

  const [form, setForm] = useState(
    txn
      ? { ...txn, amount: String(txn.amount) }
      : EMPTY_FORM
  )
  const [errors, setErrors] = useState({})

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      errs.amount = 'Enter a valid amount'
    if (!form.date) errs.date = 'Required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
    }
    if (isEdit) {
      updateTransaction(txn.id, payload)
      toast.success('Transaction updated')
    } else {
      addTransaction(payload)
      toast.success('Transaction added')
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="
        card w-full max-w-460px p-6 animate-slide-up
        shadow-2xl
      ">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-bold text-slate-900 dark:text-white">
            {isEdit ? 'Edit' : 'Add'} Transaction
          </h2>
          <button
            onClick={onClose}
            className="btn btn-icon w-8 h-8 text-[14px] flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <label className="label">Description</label>
            <input
              className={`input ${errors.description ? 'border-red-400' : ''}`}
              placeholder="e.g. Monthly Salary"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
            />
            {errors.description && (
              <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Amount (₹)</label>
              <input
                className={`input ${errors.amount ? 'border-red-400' : ''}`}
                type="number"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
              />
              {errors.amount && (
                <p className="text-[11px] text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="label">Date</label>
              <input
                className={`input ${errors.date ? 'border-red-400' : ''}`}
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Type + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Type</label>
              <select
                className="input"
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {ALL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button onClick={onClose} className="btn">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn btn-primary">
            {isEdit ? 'Update' : 'Add'} Transaction
          </button>
        </div>
      </div>
    </div>
  )
}

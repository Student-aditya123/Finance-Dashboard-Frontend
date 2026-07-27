import { format, parseISO } from 'date-fns'
import { CATEGORIES } from './seedData'

// ── Currency Formatters ──────────────────────────────────────────────────────

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount))

export const formatCurrencyCompact = (amount) => {
  const abs = Math.abs(amount)
  if (abs >= 10_00_000) return `₹${(abs / 10_00_000).toFixed(1)}L`
  if (abs >= 1_000)     return `₹${(abs / 1_000).toFixed(0)}K`
  return `₹${abs}`
}

// ── Date Formatters ──────────────────────────────────────────────────────────

export const formatDate = (dateStr) =>
  format(parseISO(dateStr), 'dd MMM yyyy')

export const formatDateShort = (dateStr) =>
  format(parseISO(dateStr), 'dd MMM')

export const getMonthKey = (dateStr) =>
  format(parseISO(dateStr), 'yyyy-MM')

export const getMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-')
  return format(new Date(Number(year), Number(month) - 1), 'MMM')
}

// ── Chart Data ───────────────────────────────────────────────────────────────

export const buildMonthlyChartData = (transactions, months = 6) => {
  const map = {}

  transactions.forEach((t) => {
    const key = getMonthKey(t.date)
    if (!map[key]) map[key] = { income: 0, expense: 0 }
    if (t.type === 'income') map[key].income += t.amount
    else map[key].expense += t.amount
  })

  const sorted = Object.keys(map).sort().slice(-months)

  return {
    labels:   sorted.map(getMonthLabel),
    income:   sorted.map((k) => map[k].income),
    expense:  sorted.map((k) => map[k].expense),
    balance:  sorted.map((k) => map[k].income - map[k].expense),
    rawKeys:  sorted,
  }
}

export const buildCategoryData = (transactions) => {
  const map = {}
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })

  const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
  const total = entries.reduce((s, [, v]) => s + v, 0)

  return entries.map(([name, value]) => ({
    name,
    value,
    pct: total ? Math.round((value / total) * 100) : 0,
    color: CATEGORIES[name]?.color ?? '#888',
    icon:  CATEGORIES[name]?.icon  ?? '●',
  }))
}

// ── Insights ─────────────────────────────────────────────────────────────────

export const buildInsights = (transactions) => {
  const catData = buildCategoryData(transactions)
  const monthly = buildMonthlyChartData(transactions)
  const n = monthly.expense.length

  const lastExp  = monthly.expense[n - 1]  ?? 0
  const prevExp  = monthly.expense[n - 2]  ?? 0
  const lastInc  = monthly.income[n - 1]   ?? 0
  const prevInc  = monthly.income[n - 2]   ?? 0

  const expChange = prevExp ? ((lastExp - prevExp) / prevExp) * 100 : 0
  const incChange = prevInc ? ((lastInc - prevInc) / prevInc) * 100 : 0

  const totalIncome  = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const savingsRate  = totalIncome ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

  return {
    topCategory: catData[0] ?? { name: 'N/A', value: 0, pct: 0 },
    catData,
    expChange,
    incChange,
    savingsRate,
    monthly,
  }
}

// ── CSV Export ───────────────────────────────────────────────────────────────

export const exportToCSV = (transactions, filename = 'finflow-transactions.csv') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
  const rows = transactions.map((t) => [
    t.date,
    `"${t.description}"`,
    t.category,
    t.type,
    t.type === 'expense' ? `-${t.amount}` : t.amount,
  ])

  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// ── Misc ─────────────────────────────────────────────────────────────────────

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const pctChange = (curr, prev) =>
  prev === 0 ? 0 : ((curr - prev) / prev) * 100


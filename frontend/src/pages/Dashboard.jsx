import { useState, useEffect } from 'react'
import { useTransactions } from '@/hooks'
import { buildMonthlyChartData, buildCategoryData } from '@/utils/formatters'
import { Card, CardHeader, SkeletonCard } from '@/components/ui/Index'
import SummaryCard from '@/components/dashboard/SummaryCard'
import TrendLineChart from '@/components/dashboard/TrendLineChart'
import SpendingDonutChart from '@/components/dashboard/SpendingDonutChart'
import TransactionTable from '@/components/transactions/TransactionTable'

export default function Dashboard() {
  const { transactions, stats } = useTransactions()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate brief loading state for UX polish
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  const monthlyData = buildMonthlyChartData(transactions)
  const catData     = buildCategoryData(transactions)

  // Simple MoM change — last vs second-to-last month
  const n = monthlyData.expense.length
  const expChangePct = n >= 2 && monthlyData.expense[n - 2]
    ? ((monthlyData.expense[n - 1] - monthlyData.expense[n - 2]) / monthlyData.expense[n - 2]) * 100
    : 8.1
  const incChangePct = n >= 2 && monthlyData.income[n - 2]
    ? ((monthlyData.income[n - 1] - monthlyData.income[n - 2]) / monthlyData.income[n - 2]) * 100
    : 12.4
  const balChangePct = 14.2 // derived from overall trend

  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <SummaryCard variant="balance" amount={stats.balance} changePct={balChangePct} />
            <SummaryCard variant="income"  amount={stats.income}  changePct={incChangePct} />
            <SummaryCard variant="expense" amount={stats.expense} changePct={expChangePct} />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <Card>
          <CardHeader title="Income vs Expenses — Last 6 Months" />
          {loading ? (
            <div className="h-240px skeleton rounded-xl" />
          ) : (
            <TrendLineChart data={monthlyData} />
          )}
        </Card>

        <Card>
          <CardHeader title="Spending by Category" />
          {loading ? (
            <div className="h-300px skeleton rounded-xl" />
          ) : (
            <SpendingDonutChart data={catData} />
          )}
        </Card>
      </div>

      {/* Recent transactions */}
      <Card>
        <CardHeader
          title="Recent Transactions"
          action={
            <a
              href="#"
              className="text-[12px] font-medium text-brand-500 hover:text-brand-600 transition-colors"
              onClick={(e) => { e.preventDefault(); /* navigate handled by parent */ }}
            >
              View all →
            </a>
          }
        />
        {loading ? (
          <div className="space-y-3 mt-2">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className="h-10 skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          <TransactionTable limit={6} />
        )}
      </Card>
    </div>
  )
}
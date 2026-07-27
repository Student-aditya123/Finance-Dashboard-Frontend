import { useTransactions } from '@/hooks'
import { buildInsights, formatCurrency } from '@/utils/formatters'
import { Card, CardHeader } from '@/components/ui'
import InsightCard from '@/components/insights/InsightCard'
import SpendingBreakdown from '@/components/insights/SpendingBreakdown'

const AI_TIPS = (ins) => [
  {
    icon: '⚡',
    text: `Your ${ins.topCategory.name} spending is your largest expense category at ${ins.topCategory.pct}% of total. Consider setting a monthly cap.`,
  },
  {
    icon: '📊',
    text: `Your savings rate is ${ins.savingsRate.toFixed(1)}%. Financial advisors typically recommend saving at least 20% of gross income.`,
  },
  {
    icon: ins.expChange > 0 ? '⚠️' : '✅',
    text: `Expenses ${ins.expChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(ins.expChange).toFixed(1)}% compared to last month. ${ins.expChange > 0 ? 'Review discretionary spending.' : 'Great job keeping costs down!'}`,
  },
  {
    icon: '💡',
    text: `Your top 3 expense categories account for ${ins.catData.slice(0, 3).reduce((s, d) => s + d.pct, 0)}% of total spending. Optimising these could meaningfully improve your savings.`,
  },
]

export default function Insights() {
  const { transactions } = useTransactions()
  const ins = buildInsights(transactions)

  return (
    <div className="flex flex-col gap-5 animate-fade-in">

      {/* KPI cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          icon={ins.topCategory.icon || '🏆'}
          label="Top Spending Category"
          value={ins.topCategory.name}
          subtext={`${formatCurrency(ins.topCategory.value)} · ${ins.topCategory.pct}% of expenses`}
          pct={ins.topCategory.pct}
          barColor={ins.topCategory.color || '#f59e0b'}
          valueColor="text-amber-500"
          iconBg="bg-amber-50 dark:bg-amber-950"
        />

        <InsightCard
          icon={ins.expChange > 0 ? '📈' : '📉'}
          label="Expense Change MoM"
          value={`${ins.expChange > 0 ? '+' : ''}${ins.expChange.toFixed(1)}%`}
          subtext="vs previous month"
          pct={Math.min(100, Math.abs(ins.expChange))}
          barColor={ins.expChange > 0 ? '#ef4444' : '#22c55e'}
          valueColor={ins.expChange > 0 ? 'text-red-500' : 'text-emerald-500'}
          iconBg={ins.expChange > 0 ? 'bg-red-50 dark:bg-red-950' : 'bg-emerald-50 dark:bg-emerald-950'}
        />

        <InsightCard
          icon="💰"
          label="Savings Rate"
          value={`${ins.savingsRate.toFixed(1)}%`}
          subtext="of total income saved"
          pct={ins.savingsRate}
          barColor="#6872f5"
          valueColor="text-brand-500"
          iconBg="bg-brand-50 dark:bg-[rgba(94,110,247,0.12)]"
        />

        <InsightCard
          icon={ins.incChange > 0 ? '🚀' : '📉'}
          label="Income Growth MoM"
          value={`${ins.incChange > 0 ? '+' : ''}${ins.incChange.toFixed(1)}%`}
          subtext="vs previous month"
          pct={Math.min(100, Math.abs(ins.incChange))}
          barColor={ins.incChange >= 0 ? '#22c55e' : '#ef4444'}
          valueColor={ins.incChange >= 0 ? 'text-emerald-500' : 'text-red-500'}
          iconBg="bg-emerald-50 dark:bg-emerald-950"
        />
      </div>

      {/* Spending breakdown */}
      <Card>
        <CardHeader title="Spending Breakdown by Category" />
        <SpendingBreakdown data={ins.catData} />
      </Card>

      {/* Monthly comparison table */}
      <Card>
        <CardHeader title="Monthly Summary" />
        <div className="overflow-x-auto -mx-5">
          <table className="w-full min-w-480px">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2a3352]">
                {['Month', 'Income', 'Expenses', 'Balance', 'Savings Rate'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ins.monthly.labels.map((month, i) => {
                const inc  = ins.monthly.income[i]
                const exp  = ins.monthly.expense[i]
                const bal  = ins.monthly.balance[i]
                const rate = inc > 0 ? ((inc - exp) / inc * 100) : 0
                return (
                  <tr
                    key={month}
                    className="border-b border-slate-100 dark:border-[#1e2538] hover:bg-slate-50 dark:hover:bg-[#1e2538] transition-colors"
                  >
                    <td className="px-5 py-3 text-[13px] font-semibold text-slate-700 dark:text-slate-300">{month}</td>
                    <td className="px-5 py-3 text-[13px] font-mono text-emerald-500 font-semibold">{formatCurrency(inc)}</td>
                    <td className="px-5 py-3 text-[13px] font-mono text-red-500 font-semibold">{formatCurrency(exp)}</td>
                    <td className={`px-5 py-3 text-[13px] font-mono font-semibold ${bal >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {bal >= 0 ? '+' : '-'}{formatCurrency(Math.abs(bal))}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-[#1e2538] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-brand-500 transition-all"
                            style={{ width: `${Math.min(100, Math.max(0, rate))}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-slate-500 dark:text-slate-400 font-mono">
                          {rate.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader title="AI-Powered Insights" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AI_TIPS(ins).map((tip, i) => (
            <div
              key={i}
              className="
                flex items-start gap-3 p-4 rounded-xl
                bg-slate-50 dark:bg-[#1e2538]
                border border-slate-200 dark:border-[#2a3352]
              "
            >
              <div className="
                w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0
                bg-white dark:bg-[#252d42] border border-slate-200 dark:border-[#2a3352]
              ">
                {tip.icon}
              </div>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {tip.text}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

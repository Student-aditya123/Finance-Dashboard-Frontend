import { Card, CardHeader } from '@/components/ui/Index'
import FilterBar from '@/components/transactions/FilterBar'
import TransactionTable from '@/components/transactions/TransactionTable'
import { useTransactions } from '@/hooks'

export default function Transactions() {
  const { filteredTransactions } = useTransactions()

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      <Card>
        <CardHeader
          title={
            <span className="flex items-center gap-2">
              All Transactions
              <span className="
                text-[10px] font-semibold px-2 py-0.5 rounded-full
                bg-brand-50 dark:bg-[rgba(94,110,247,0.12)]
                text-brand-500 dark:text-brand-400
              ">
                {filteredTransactions.length}
              </span>
            </span>
          }
        />

        <FilterBar />

        <TransactionTable />
      </Card>
    </div>
  )
}


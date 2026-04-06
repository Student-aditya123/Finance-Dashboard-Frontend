import TransactionRow from "./TransactionRow"
import useTransaction from "../../hooks/useTransaction"
import Emptystate from  "../ui/EmptyState"

function TransactionTable() {
  const { filteredTransactions } = useTransaction()
  return (
    <div className="from-slate-900/90 via-slate-800/80 to-slate-900/90 border-white/10 rounded-1xl shadow-sm border  overflow-hidden">
      
      {/* Header */}
      <div className="grid grid-cols-5 px-6 py-3 font-bold text-white-500 text-sm border-b">
        <span>Date</span>
        <span>Category</span>
        <span>Amount</span>
        <span>Type</span>
        <span></span>
      </div>

      
      {
         filteredTransactions.length === 0 ? (
            <Emptystate message="No transactions found" />
         ) : (
              filteredTransactions.map((item, i) => (
                 <TransactionRow key={item.id} item={item} index={i} />
            ))
         )
      }
    </div>
  )
}

export default TransactionTable
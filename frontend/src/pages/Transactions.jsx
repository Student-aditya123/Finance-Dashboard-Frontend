import FilterBar from "../components/transactions/FilterBar"
import TransactionTable from "../components/transactions/TransactionTable"
import useTheme from "../hooks/useTheme.js"

function Transaction() {
  const { dark, setDark } = useTheme()

  return (
    <div className="p-6 ml-64 space-y-6"> 
      <FilterBar />
      <TransactionTable />
    </div>
  )
}

export default Transaction


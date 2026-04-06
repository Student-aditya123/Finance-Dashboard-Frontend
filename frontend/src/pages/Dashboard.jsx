import SummaryCard from "../components/dashboard/SummaryCard"
import BalanceChart from "../components/dashboard/BalanceChart"
import ExpensePieChart from "../components/dashboard/ExpensePieChart"


export default function Dashboard() {
  return (
    // Added flex flex-col and gap-8 for consistent vertical spacing
    // overflow-y-auto ensures that if content is long, it scrolls properly
    <div className="ml-64 w-full min-h-screen p-8 flex flex-col gap-8 bg-[#0f172a] text-white overflow-y-auto">
      
      {/* Top Section: Summary Cards */}
      <section className="w-full">
        <SummaryCard />
      </section>

      {/* Middle Section: Balance Chart */}
      <section className="w-full bg-[#1e293b] p-6 rounded-3xl shadow-lg">
        <BalanceChart />
      </section>

      {/* Bottom Section: Expense Breakdown */}
      <section className="w-full bg-[#1e293b] p-6 rounded-3xl shadow-lg">
        <ExpensePieChart />
      </section>

     
    </div>
  )
}

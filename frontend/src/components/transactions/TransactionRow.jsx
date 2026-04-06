import { motion } from "framer-motion"
import { FiMoreHorizontal } from "react-icons/fi"
import { formatCurrency } from "../../utils/formatCurrency"
import { formatDate } from "../../utils/formatDate"

function TransactionRow({ item, index }) {
  const isIncome = item.type === "income"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="grid grid-cols-5 px-6 py-4 items-center border-b hover:bg-blue-800 transition"
    >
      {/* Date */}
      <div className="text-white text-sm">
        {formatDate(item.date)}
      </div>

      {/* Category */}
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 flex items-center justify-center rounded-lg ${
            isIncome ? "bg-green-10" : "bg-gray-10"
          }`}
        >
          {isIncome ? "💼" : "🛒"}
        </div>

        <span className="font-normal text-white">
          {item.title}
        </span>
      </div>

      {/* Amount */}
      <div
        className={`font-semibold ${
          isIncome ? "text-green-600" : "text-red-500"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(item.amount)}
      </div>

      {/* Type Badge */}
      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            isIncome
              ? "bg-green-200 text-green-700"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </div>

      {/* Menu */}
      <div className="flex justify-end">
        <FiMoreHorizontal className="text-gray-400 cursor-pointer hover:text-gray-600" />
      </div>
    </motion.div>
  )
}

export default TransactionRow

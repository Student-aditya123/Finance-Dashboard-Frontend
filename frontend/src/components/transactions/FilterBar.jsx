import { FiSearch } from "react-icons/fi"
import { useStore } from "../../store/useStore"
import {
  TRANSACTION_CATEGORIES,
  CATEGORY_META,
} from "../../utils/contants"

function FilterBar() {
  const {
    setFilter,
    setCategory,
    setSearch,
    setSort,
    setStartDate,
    setEndDate,
  } = useStore()

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow flex flex-wrap gap-4 items-center justify-between">

      {/* LEFT */}
      <div className="flex flex-wrap gap-3 items-center">

        {/* 🔍 Search */}
        <div className="flex items-center bg-gray-800 px-3 py-2 rounded-2xl border text-white">
          <FiSearch />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none ml-2 text-sm placeholder-gray-400"
          />
        </div>

        {/* ✅ Type Filter (from constants) */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white rounded-2xl border text-sm"
        >
          <option value="all">All</option>
          <option value={TRANSACTION_CATEGORIES.INCOME}>Income</option>
          <option value={TRANSACTION_CATEGORIES.EXPENSE}>Expense</option>
        </select>

        {/* ✅ Category Filter (dynamic from constants) */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white rounded-2xl border text-sm"
        > 
          <option value="all">All Categories</option>

          {Object.entries(CATEGORY_META).map(([key, cat]) => (
            <option key={key} value={key}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          className="px-2 py-2 bg-gray-800 text-white border rounded-lg text-sm"
        />

        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          className="px-2 py-2 bg-gray-800 text-white border rounded-lg text-sm"
        />

        {/* Sort */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 bg-gray-800 text-white rounded-2xl border text-sm"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="high">Amount High</option>
          <option value="low">Amount Low</option>
        </select>

      </div>

      {/* RIGHT */}
      <button className="bg-blue-800 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
         Add Transaction
      </button>
    </div>
  )
}

export default FilterBar

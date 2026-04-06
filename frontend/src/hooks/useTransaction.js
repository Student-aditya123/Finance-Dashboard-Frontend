import { useStore } from "../store/useStore"

function useTransaction() {
  const {
    transactions,
    filter,
    category,
    search,
    sort,
    startDate,
    endDate,
  } = useStore()

  let data = [...transactions]

  // ✅ Type Filter
  if (filter !== "all") {
    data = data.filter(
      (t) => t.type?.toLowerCase() === filter.toLowerCase()
    )
  }

  // ✅ Category Filter
  if (category !== "all") {
    data = data.filter(
      (t) => t.category?.toLowerCase() === category.toLowerCase()
    )
  }

  // ✅ Search
  if (search) {
    data = data.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  // ✅ Date Range
  if (startDate) {
    data = data.filter(
      (t) => new Date(t.date) >= new Date(startDate)
    )
  }

  if (endDate) {
    data = data.filter(
      (t) => new Date(t.date) <= new Date(endDate)
    )
  }

  // ✅ Sorting
  if (sort === "newest") {
    data.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sort === "oldest") {
    data.sort((a, b) => new Date(a.date) - new Date(b.date))
  } else if (sort === "high") {
    data.sort((a, b) => b.amount - a.amount)
  } else if (sort === "low") {
    data.sort((a, b) => a.amount - b.amount)
  }

  return { filteredTransactions: data }
}

export default useTransaction

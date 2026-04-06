import { create } from "zustand"
import transactionsData from "../data/transactions"

export const useStore = create((set) => ({
  transactions: transactionsData,

  // 🔥 states
  filter: "all",
  category: "all",
  search: "",
  sort: "newest",
  startDate: "",
  endDate: "",

  // 🔥 actions
  setFilter: (filter) => set({ filter }),
  setCategory: (category) => set({ category }),
  setSearch: (search) => set({ search }),
  setSort: (sort) => set({ sort }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
}))

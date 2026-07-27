
import clsx from 'clsx'
import { useTransactions } from '@/hooks'
import { ALL_CATEGORIES } from '@/utils/seedData'

const TYPE_FILTERS = [
  { value: 'all',     label: 'All Types' },
  { value: 'income',  label: 'Income'    },
  { value: 'expense', label: 'Expenses'  },
]

export default function FilterBar() {
  const {
    search, filterType, filterCat,
    setSearch, setFilterType, setFilterCat, resetFilters,
    filteredTransactions,
  } = useTransactions()

  const hasActiveFilters =
    search || filterType !== 'all' || filterCat !== 'all'

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-200px max-w-75">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[14px]">
          ⌕
        </span>
        <input
          type="text"
          placeholder="Search transactions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input pl-8 h-9"
        />
      </div>

      {/* Type chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {TYPE_FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilterType(value)}
            className={clsx('chip', filterType === value && 'active')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category select */}
      <select
        value={filterCat}
        onChange={(e) => setFilterCat(e.target.value)}
        className="input h-9 text-[12px] w-auto pr-8 cursor-pointer"
      >
        <option value="all">All Categories</option>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Result count + clear */}
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-[12px] text-slate-400 dark:text-slate-500">
          {filteredTransactions.length} result{filteredTransactions.length !== 1 ? 's' : ''}
        </span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[12px] text-brand-500 hover:text-brand-600 font-medium transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}
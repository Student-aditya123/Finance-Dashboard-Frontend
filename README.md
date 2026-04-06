## Finance-Dashboard

A production-grade personal finance dashboard built with React (Vite), Tailwind CSS, Zustand, and Recharts. Inspired by Stripe and Razorpay's design language.

![FinFlow Dashboard](https://via.placeholder.com/1200x630/0f1117/5e6ef7?text=FinFlow+Dashboard)

---

## Tech Stack

| Layer         | Library                     |
|---------------|-----------------------------|
| Framework     | React 18 + Vite             |
| Styling       | Tailwind CSS v3             |
| State         | Zustand (with persistence)  |
| Charts        | Recharts                    |
| Dates         | date-fns                    |
| Notifications | react-hot-toast             |
| Utilities     | clsx                        |

---

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses with MoM % change
- Line chart: 6-month income vs expenses vs balance trend
- Donut chart: Spending by category with visual breakdown
- Recent transactions table

### Transactions
- Sortable table (date, description, amount)
- Search by description or category
- Filter by type (income / expense) and category
- Admin: Add, Edit, Delete transactions with form validation

### Role-Based UI
- **Admin**: Full CRUD — add, edit, delete transactions
- **Viewer**: Read-only access, all action buttons hidden
- Switch roles via the sidebar badge (frontend only)

### Insights
- Top spending category with percentage
- Month-over-month expense and income change
- Savings rate calculation
- Full category spending breakdown
- Monthly summary table with savings rate bars
- AI-generated tips based on real data

### UX
- Dark / Light mode toggle, persisted to localStorage
- Loading skeleton screens on initial render
- Empty state handling (no results found)
- Smooth fade-in and slide-up animations
- Fully responsive (mobile sidebar hidden, adaptive grids)
- Toast notifications for all CRUD actions
- CSV export of filtered transactions

---

## Folder Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── SummaryCard.jsx        ← Balance / income / expense cards
│   │   ├── TrendLineChart.jsx     ← Recharts line chart
│   │   └── SpendingDonutChart.jsx ← Recharts donut + legend
│   ├── insights/
│   │   ├── InsightCard.jsx        ← KPI card with progress bar
│   │   └── SpendingBreakdown.jsx  ← Category bar list
│   ├── layout/
│   │   ├── Layout.jsx             ← Sidebar + Topbar wrapper
│   │   ├── Sidebar.jsx            ← Nav, logo, role switcher
│   │   └── Topbar.jsx             ← Title, theme toggle, export, add
│   ├── transactions/
│   │   ├── FilterBar.jsx          ← Search, chips, category select
│   │   ├── TransactionModal.jsx   ← Add / edit form with validation
│   │   └── TransactionTable.jsx   ← Sortable table with actions
│   └── ui/
│       └── index.jsx              ← Card, Badge, Skeleton, EmptyState, etc.
├── hooks/
│   └── index.js                   ← useTheme, useTransactions, useRole
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useFinanceStore.js         ← Zustand store with persistence
├── utils/
│   ├── formatters.js              ← Currency, date, chart data builders
│   └── seedData.js                ← Category config + seed transactions
├── App.jsx
├── main.jsx
└── index.css                      ← Tailwind + custom component classes
```

---

## Getting Started

```bash
# 1. Clone or unzip the project
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Architecture Notes

### State Management (Zustand)
All global state lives in `useFinanceStore`:
- `transactions[]` — persisted to localStorage
- `role` — `'admin'` | `'viewer'`, persisted
- `theme` — `'dark'` | `'light'`, persisted
- `search`, `filterType`, `filterCat`, `sortCol`, `sortDir` — UI filters, not persisted

Selectors (`getStats`, `getFilteredTransactions`) are pure functions on the store, recomputed on every call. For very large datasets, memoize with `useMemo`.

### Separation of Concerns
| Concern      | Location                              |
|--------------|---------------------------------------|
| Data / logic | `store/`, `hooks/`, `utils/`          |
| UI rendering | `components/`, `pages/`               |
| Styling      | Tailwind utilities + `index.css`      |
| Constants    | `utils/seedData.js`                   |

### Dark Mode
Tailwind's `class` strategy is used. The `useTheme` hook syncs the store to `document.documentElement.classList`. All components use `dark:` variants — no CSS variables needed.

### Adding a New Page
1. Create `src/pages/MyPage.jsx`
2. Add an entry to `PAGES` in `App.jsx`
3. Add a nav item to `NAV_ITEMS` in `Sidebar.jsx`
4. Add a title entry to `PAGE_TITLES` in `Topbar.jsx`

---

## Extending the App

| Feature               | Where to add                                |
|-----------------------|---------------------------------------------|
| Real API integration  | Replace seed data in `useFinanceStore.js`   |
| Auth / real roles     | Add auth context, protect routes            |
| Budget limits         | New Zustand slice + BudgetCard component    |
| More chart types      | Add to `components/dashboard/`              |
| Recurring transactions| Add `isRecurring` field to transaction model|
| Multi-currency        | Extend formatters.js with locale/currency   |

---

## License

MIT — free to use, modify, and distribute.
📊 Personal Finance Intelligence Dashboard
A high-performance, responsive finance management interface built with a "Soft UI" aesthetic. This project focuses on data-driven insights, clean typography, and a "FAANG-level" user experience for tracking personal wealth and spending habits.

🚀 Live Demo
[Insert Your Vercel Link Here]

🛠️ Tech Stack
Frontend: React.js (Vite/CRA)

Styling: Tailwind CSS (Custom Soft UI configuration)

Animations: Framer Motion (for smooth micro-interactions)

Icons: Lucide React

Data Visualization: Recharts / Chart.js (Balance trends & Expense breakdowns)

✨ Key Features
Intelligent Insights Engine: Uses React useMemo for optimized calculation of spending trends and monthly comparisons.

Soft UI Dashboard: A clean, modern interface featuring custom shadow depth and high-radius borders for a premium feel.

Transaction Audit: Detailed view of "Critical Expenses" and high-impact spending categories.

CSV Data Export: Built-in utility to export financial records for external analysis.

Responsive Analytics: Dynamic charts that adjust to provide a seamless experience across desktop and mobile devices.

📂 Folder Structure
The project follows a modular architecture to ensure scalability and maintainability:

 finance-dashboard/
│
├── .gitignore
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│
│   ├── node_modules/
│
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│
│       ├── components/
│       │   ├── dashboard/
│       │   │   ├── BalanceChart.jsx
│       │   │   ├── ExpensePie.jsx
│       │   │   └── SummaryCard.jsx
│       │   │
│       │   ├── insights/
│       │   │   └── InsightsPanel.jsx
│       │   │
│       │   ├── layout/
│       │   │   ├── Layout.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx
│       │   │
│       │   ├── transactions/
│       │   │   ├── FilterBar.jsx
│       │   │   ├── TransactionForm.jsx
│       │   │   └── TransactionTable.jsx
│       │   │
│       │   └── ui/
│       │       ├── Button.jsx
│       │       ├── Card.jsx
│       │       ├── EmptyState.jsx
│       │       ├── Input.jsx
│       │       └── Loader.jsx
│
│       ├── data/
│       │   └── transactions.js
│
│       ├── hooks/
│       │   └── usetheme.js
|       |   |__useTransaction.js
│
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   └── Transactions.jsx
|       |   |__Insights.jsx
│           
│       ├── store/
│       │   └── useStore.js
│
│       └── utils/
│           └── contants.js
            |__exportToCSV.js
            |__formatCurrency.js
            |__formatdate.js 
<!-- Plaintext
FINANCE-DASHBOARD/
├── frontend/               # React Application Root
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # UI Components (InsightsSection, Charts, etc.)
│   │   ├── data/           # Mock data & transactions.js
│   │   ├── utils/          # Helper functions (exportToCSV.js)
│   │   ├── App.js          # Main Application Logic
│   │   └── main.jsx        # Entry Point
│   ├── package.json        # Dependencies & Scripts
│   └── tailwind.config.js  # Custom theme & Soft UI settings
├── .gitignore              # Git exclusion rules
└── README.md               # Project documentation -->
⚙️ Local Setup Instructions
To run this project locally, follow these steps:

Clone the Repository:

Bash
git clone https://github.com/[your-username]/finance-dashboard.git
cd finance-dashboard
Navigate to Frontend:

Bash
cd frontend
Install Dependencies:

Bash
npm install
Start Development Server:

Bash
npm run dev  # or npm start

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


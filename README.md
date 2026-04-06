# 📊 Personal Finance Intelligence Dashboard

A high-performance, responsive finance management interface built with a **Soft UI aesthetic**.  
This project focuses on **data-driven insights, clean typography, and a FAANG-level user experience** for tracking personal wealth and spending habits.

---

## 🚀 Live Demo
👉 https://your-vercel-link.vercel.app

---

## 🛠️ Tech Stack

**Frontend:** React.js (Vite)  
**Styling:** Tailwind CSS (Custom Soft UI configuration)  
**Animations:** Framer Motion  
**Icons:** Lucide React  
**Data Visualization:** Recharts  

---

## ✨ Key Features

### 🧠 Intelligent Insights Engine
- Optimized calculations using `useMemo`
- Monthly comparisons and spending trends
- AI-style financial observations

### 🎨 Soft UI Dashboard
- Modern, clean interface
- Smooth shadows and rounded UI
- Premium look & feel

### 📊 Advanced Analytics
- Balance trend charts
- Category-wise expense breakdown
- Monthly financial summaries

### 💸 Transaction Management
- Add, edit, delete transactions
- Filter, sort, and search
- Form validation

### 📁 CSV Export
- Export filtered financial data
- Useful for external analysis

### 📱 Fully Responsive
- Works seamlessly on mobile & desktop
- Adaptive layouts and charts

---

## 🧩 Features Breakdown

### 📌 Dashboard
- Summary Cards: Balance, Income, Expenses
- Monthly comparison (MoM % change)
- Line Chart: Income vs Expenses vs Balance
- Donut Chart: Category breakdown
- Recent transactions preview

---

### 📌 Transactions
- Search by description/category
- Filter by type (income/expense)
- Sortable table
- CRUD operations (Admin only)

---

### 🔐 Role-Based UI
- **Admin:** Full access (Add/Edit/Delete)
- **Viewer:** Read-only mode
- Role switching from sidebar

---

### 📈 Insights
- Top spending category
- Savings rate calculation
- Monthly comparisons
- Category-wise breakdown
- Smart financial tips

---

### 🎯 UX Enhancements
- Dark / Light mode (saved in localStorage)
- Loading skeleton screens
- Empty state UI
- Smooth animations (Framer Motion)
- Toast notifications
- CSV export support

---

## 📂 Folder Structure


finance-dashboard/
│
├── .gitignore
├── README.md
│
├── frontend/
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ ├── tailwind.config.js
│
│ └── src/
│ ├── App.jsx
│ ├── main.jsx
│ ├── index.css
│
│ ├── components/
│ │ ├── dashboard/
│ │ │ ├── BalanceChart.jsx
│ │ │ ├── ExpensePie.jsx
│ │ │ └── SummaryCard.jsx
│ │ │
│ │ ├── insights/
│ │ │ └── InsightsPanel.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── Layout.jsx
│ │ │ ├── Navbar.jsx
│ │ │ └── Sidebar.jsx
│ │ │
│ │ ├── transactions/
│ │ │ ├── FilterBar.jsx
│ │ │ ├── TransactionForm.jsx
│ │ │ └── TransactionTable.jsx
│ │ │
│ │ └── ui/
│ │ ├── Button.jsx
│ │ ├── Card.jsx
│ │ ├── Input.jsx
│ │ ├── Loader.jsx
│ │ └── EmptyState.jsx
│
│ ├── data/
│ │ └── transactions.js
│
│ ├── hooks/
│ │ ├── useTheme.js
│ │ └── useTransaction.js
│
│ ├── pages/
│ │ ├── Dashboard.jsx
│ │ ├── Transactions.jsx
│ │ └── Insights.jsx
│
│ ├── store/
│ │ └── useStore.js
│
│ └── utils/
│ ├── constants.js
│ ├── exportToCSV.js
│ ├── formatCurrency.js
│ └── formatDate.js


---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard
2️⃣ Navigate to frontend
cd frontend
3️⃣ Install dependencies
npm install
4️⃣ Run development server
npm run dev


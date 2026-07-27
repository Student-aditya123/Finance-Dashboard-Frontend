export const CATEGORIES = {
  Food:          { color: '#f59e0b', icon: '🍔', type: 'expense' },
  Transport:     { color: '#3b82f6', icon: '🚗', type: 'expense' },
  Housing:       { color: '#a855f7', icon: '🏠', type: 'expense' },
  Healthcare:    { color: '#ef4444', icon: '💊', type: 'expense' },
  Shopping:      { color: '#ec4899', icon: '🛍️', type: 'expense' },
  Entertainment: { color: '#14b8a6', icon: '🎬', type: 'expense' },
  Education:     { color: '#f97316', icon: '📚', type: 'expense' },
  Salary:        { color: '#22c55e', icon: '💼', type: 'income' },
  Freelance:     { color: '#6366f1', icon: '💻', type: 'income' },
  Investment:    { color: '#10b981', icon: '📈', type: 'both' },
}

export const EXPENSE_CATEGORIES = Object.entries(CATEGORIES)
  .filter(([, v]) => v.type !== 'income')
  .map(([k]) => k)

export const INCOME_CATEGORIES = Object.entries(CATEGORIES)
  .filter(([, v]) => v.type !== 'expense')
  .map(([k]) => k)

export const ALL_CATEGORIES = Object.keys(CATEGORIES)

export const SEED_TRANSACTIONS = [
  { id: 1,  date: '2025-07-03', description: 'Monthly Salary',    category: 'Salary',        type: 'income',  amount: 95000 },
  { id: 2,  date: '2025-07-05', description: 'Grocery Store',     category: 'Food',          type: 'expense', amount: 4200  },
  { id: 3,  date: '2025-07-08', description: 'Uber Ride',         category: 'Transport',     type: 'expense', amount: 320   },
  { id: 4,  date: '2025-07-12', description: 'Netflix',           category: 'Entertainment', type: 'expense', amount: 649   },
  { id: 5,  date: '2025-07-14', description: 'Freelance Project', category: 'Freelance',     type: 'income',  amount: 28000 },
  { id: 6,  date: '2025-07-15', description: 'Electricity Bill',  category: 'Housing',       type: 'expense', amount: 1800  },
  { id: 7,  date: '2025-07-18', description: 'Swiggy Order',      category: 'Food',          type: 'expense', amount: 850   },
  { id: 8,  date: '2025-07-20', description: 'Doctor Visit',      category: 'Healthcare',    type: 'expense', amount: 1200  },
  { id: 9,  date: '2025-07-22', description: 'Amazon Shopping',   category: 'Shopping',      type: 'expense', amount: 5600  },
  { id: 10, date: '2025-07-24', description: 'Stock Dividend',    category: 'Investment',    type: 'income',  amount: 3400  },
  { id: 11, date: '2025-08-01', description: 'Monthly Salary',    category: 'Salary',        type: 'income',  amount: 95000 },
  { id: 12, date: '2025-08-03', description: 'Rent Payment',      category: 'Housing',       type: 'expense', amount: 18000 },
  { id: 13, date: '2025-08-05', description: 'Zomato',            category: 'Food',          type: 'expense', amount: 640   },
  { id: 14, date: '2025-08-08', description: 'Gym Membership',    category: 'Healthcare',    type: 'expense', amount: 2000  },
  { id: 15, date: '2025-08-10', description: 'Udemy Course',      category: 'Education',     type: 'expense', amount: 1299  },
  { id: 16, date: '2025-08-15', description: 'Metro Card',        category: 'Transport',     type: 'expense', amount: 500   },
  { id: 17, date: '2025-08-18', description: 'Freelance Project', category: 'Freelance',     type: 'income',  amount: 35000 },
  { id: 18, date: '2025-08-22', description: 'Petrol',            category: 'Transport',     type: 'expense', amount: 2800  },
  { id: 19, date: '2025-08-24', description: 'Movie Tickets',     category: 'Entertainment', type: 'expense', amount: 1200  },
  { id: 20, date: '2025-08-28', description: 'SIP Investment',    category: 'Investment',    type: 'expense', amount: 10000 },
  { id: 21, date: '2025-09-01', description: 'Monthly Salary',    category: 'Salary',        type: 'income',  amount: 95000 },
  { id: 22, date: '2025-09-04', description: 'Flipkart Sale',     category: 'Shopping',      type: 'expense', amount: 8900  },
  { id: 23, date: '2025-09-08', description: 'Pharmacy',          category: 'Healthcare',    type: 'expense', amount: 890   },
  { id: 24, date: '2025-09-12', description: 'Spotify Premium',   category: 'Entertainment', type: 'expense', amount: 119   },
  { id: 25, date: '2025-09-18', description: 'Restaurant Dinner', category: 'Food',          type: 'expense', amount: 3200  },
  { id: 26, date: '2025-09-20', description: 'Freelance Project', category: 'Freelance',     type: 'income',  amount: 42000 },
  { id: 27, date: '2025-09-25', description: 'Stock Dividend',    category: 'Investment',    type: 'income',  amount: 4200  },
  { id: 28, date: '2025-10-01', description: 'Monthly Salary',    category: 'Salary',        type: 'income',  amount: 95000 },
  { id: 29, date: '2025-10-03', description: 'Rent Payment',      category: 'Housing',       type: 'expense', amount: 18000 },
  { id: 30, date: '2025-10-07', description: 'Grocery Store',     category: 'Food',          type: 'expense', amount: 5100  },
  { id: 31, date: '2025-10-12', description: 'Bike Service',      category: 'Transport',     type: 'expense', amount: 1800  },
  { id: 32, date: '2025-10-16', description: 'Amazon Prime',      category: 'Entertainment', type: 'expense', amount: 1499  },
  { id: 33, date: '2025-10-20', description: 'Medical Insurance', category: 'Healthcare',    type: 'expense', amount: 3500  },
  { id: 34, date: '2025-10-25', description: 'Freelance Bonus',   category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 35, date: '2025-11-01', description: 'Monthly Salary',    category: 'Salary',        type: 'income',  amount: 95000 },
  { id: 36, date: '2025-11-03', description: 'Rent Payment',      category: 'Housing',       type: 'expense', amount: 18000 },
  { id: 37, date: '2025-11-08', description: 'Swiggy Order',      category: 'Food',          type: 'expense', amount: 980   },
  { id: 38, date: '2025-11-12', description: 'Freelance Project', category: 'Freelance',     type: 'income',  amount: 55000 },
  { id: 39, date: '2025-11-18', description: 'Shopping Haul',     category: 'Shopping',      type: 'expense', amount: 12000 },
  { id: 40, date: '2025-11-22', description: 'Year-end Bonus',    category: 'Salary',        type: 'income',  amount: 50000 },
]

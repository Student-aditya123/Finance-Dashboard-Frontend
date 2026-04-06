
export const TRANSACTION_CATEGORIES = {
  INCOME: "income",
  EXPENSE: "expense",
  TRANSFER: "transfer",
  INVESTMENT: "investment",
};

// =========================
// Category Config (🔥 MAIN UPGRADE)
// =========================
export const CATEGORY_TYPES = {
  SALARY: "salary",
  FREELANCE: "freelance",
  INVESTMENT: "investment",
  BONUS: "bonus",

  GROCERIES: "groceries",
  RENT: "rent",
  FOOD: "food",
  TRANSPORT: "transport",
  UTILITIES: "utilities",
  ENTERTAINMENT: "entertainment",
  SHOPPING: "shopping",
  HEALTH: "health",
};
// 👉 Full Category Metadata (icons + colors + labels)
export const CATEGORY_META = {
  salary: {
    label: "Salary",
    icon: "💼",
    color: "bg-green-100 text-green-600",
  },
  freelance: {
    label: "Freelance",
    icon: "🧑‍💻",
    color: "bg-blue-100 text-blue-600",
  },
  investment: {
    label: "Investment",
    icon: "📈",
    color: "bg-purple-100 text-purple-600",
  },
  bonus: {
    label: "Bonus",
    icon: "🎁",
    color: "bg-yellow-100 text-yellow-600",
  },

  groceries: {
    label: "Groceries",
    icon: "🛒",
    color: "bg-gray-100 text-gray-600",
  },
  rent: {
    label: "Rent",
    icon: "🏠",
    color: "bg-red-100 text-red-600",
  },
  food: {
    label: "Food",
    icon: "🍔",
    color: "bg-orange-100 text-orange-600",
  },
  transport: {
    label: "Transport",
    icon: "🚗",
    color: "bg-indigo-100 text-indigo-600",
  },
  utilities: {
    label: "Utilities",
    icon: "💡",
    color: "bg-yellow-100 text-yellow-600",
  },
  entertainment: {
    label: "Entertainment",
    icon: "🎬",
    color: "bg-pink-100 text-pink-600",
  },
  shopping: {
    label: "Shopping",
    icon: "🛍️",
    color: "bg-purple-100 text-purple-600",
  },
  health: {
    label: "Health",
    icon: "🏥",
    color: "bg-green-100 text-green-600",
  },
};

// =========================
// Status Types
// =========================
export const STATUS_TYPES = {
  COMPLETED: "completed",
  PENDING: "pending",
  FAILED: "failed",
  PROCESSING: "processing",
};

// =========================
// Chart Colors
// =========================
export const CHART_COLORS = {
  PRIMARY: "#3b82f6",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  DANGER: "#ef4444",
  SECONDARY: "#8b5cf6",
  INFO: "#06b6d4",
};

// =========================
// Sidebar Menu
// =========================
export const SIDEBAR_MENU = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "CreditCard",
    path: "/transactions",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "BarChart3",
    path: "/analytics",
  },
  {
    id: "budget",
    label: "Budget",
    icon: "Wallet",
    path: "/budget",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Settings",
    path: "/settings",
  },
];

// =========================
// Animation Variants
// =========================
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
};

// =========================
// UI Classes
// =========================
export const UI_CLASSES = {
  GLASS_EFFECT: "backdrop-blur-md bg-white/10 border border-white/20",
  GRADIENT_BG: "bg-gradient-to-br from-blue-500 to-violet-500",
  ROUNDED_LARGE: "rounded-2xl",
  SOFT_SHADOW: "shadow-lg shadow-black/10",
  TRANSITION: "transition-all duration-300 ease-in-out",
};

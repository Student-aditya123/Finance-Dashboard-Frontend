import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Loader from "./components/ui/Loader.jsx" // ✅ normal import

// Lazy imports
const Layout = lazy(() => import("./components/layout/Layout.jsx"))
const Insight = lazy(() => import("./pages/Insights.jsx"))
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"))
const Transactions = lazy(() => import("./pages/Transactions.jsx"))

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insight />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/layout/Layout.jsx"
import Insight from "./pages/Insights.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Transactions from "./pages/Transactions.jsx"

export default function App() {
  return (
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insight />} />

          {/* Future pages ready */}
          {/* <Route path="insights" element={<div>Insights</div>} /> */}
          {/* <Route path="settings" element={<div>Settings</div>} /> */}

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

        </Route>

      </Routes>
  )
}
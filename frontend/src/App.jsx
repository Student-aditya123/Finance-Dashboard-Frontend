import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from '@/components/layout/Layout'
import Dashboard from '@/pages/Dashboard'
import Transactions from '@/pages/Transactions'
import Insights from '@/pages/Insights'
import { useTheme } from '@/hooks'

const PAGES = {
  dashboard:    Dashboard,
  transactions: Transactions,
  insights:     Insights,
}

export default function App() {
  useTheme() // syncs dark/light class to <html>

  const [page, setPage] = useState('dashboard')
  const PageComponent = PAGES[page] ?? Dashboard

  return (
    <>
      <Layout page={page} onNavigate={setPage}>
        <PageComponent />
      </Layout>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2800,
          style: {
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 500,
          },
        }}
      />
    </>
  )
}

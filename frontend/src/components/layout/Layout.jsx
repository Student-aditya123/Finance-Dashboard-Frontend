import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ page, onNavigate, children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0f1117]">
      <Sidebar page={page} onNavigate={onNavigate} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar page={page} />
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          {children}
        </main>
      </div>
    </div>
  )
}
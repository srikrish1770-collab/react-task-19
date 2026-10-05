import { useCallback, useEffect, useState } from 'react'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import TransactionsPage from './pages/TransactionsPage'
import AccountsPage from './pages/AccountsPage'
import InvestmentsPage from './pages/InvestmentsPage'
import CreditCardsPage from './pages/CreditCardsPage'
import LoansPage from './pages/LoansPage'
import ServicesPage from './pages/ServicesPage'
import SettingsPage from './pages/SettingsPage'
import PrivilegesPage from './pages/PrivilegesPage'
import { NavContext } from './context/NavContext'
import { ToastProvider } from './context/ToastContext'

const pages: Record<string, () => JSX.Element> = {
  Dashboard, Transactions: TransactionsPage, Accounts: AccountsPage, Investments: InvestmentsPage,
  'Credit Cards': CreditCardsPage, Loans: LoansPage, Services: ServicesPage, 'My Privileges': PrivilegesPage, Setting: SettingsPage,
}
const slug = (label: string) => label.toLowerCase().replace(/\s+/g, '-')
const fromHash = () => Object.keys(pages).find(l => slug(l) === window.location.hash.replace(/^#\/?/, '')) ?? 'Dashboard'

export default function App() {
  // The page lives in the URL hash (#/transactions) so refresh and the browser Back button keep working.
  const [active, setActive] = useState(fromHash)
  const Page = pages[active] ?? Dashboard

  useEffect(() => {
    const onHash = () => setActive(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => { document.title = active === 'Dashboard' ? 'BankDash.' : `${active} · BankDash.` }, [active])

  const navigate = useCallback((label: string) => {
    if (!pages[label]) return
    if (window.location.hash !== `#/${slug(label)}`) window.location.hash = `/${slug(label)}`
    setActive(label)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <ToastProvider>
      <NavContext.Provider value={navigate}>
        <DashboardLayout title={active === 'Dashboard' ? 'Overview' : active} active={active} onNavigate={navigate}>
          <Page />
        </DashboardLayout>
      </NavContext.Provider>
    </ToastProvider>
  )
}

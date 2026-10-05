import Section from '../components/Section'
import { useNav } from '../context/NavContext'
import StatsCard from '../components/StatsCard'
import LastTransactions from '../components/LastTransactions'
import CreditCard from '../components/CreditCard'
import DebitCreditChart from '../components/DebitCreditChart'
import InvoiceList from '../components/InvoiceList'
import { accStats } from '../data/accounts'
export default function AccountsPage() {
  const go = useNav()
  return (
    <div className="dash acc">
      <div className="acc-stats">{accStats.map(s => <StatsCard key={s.label} {...s} />)}</div>
      <div className="row r1">
        <Section title="Last Transaction"><LastTransactions /></Section>
        <Section title="My Card" action="See All" onAction={() => go('Credit Cards')}><CreditCard variant="primary" /></Section>
      </div>
      <div className="row r1">
        <Section title="Debit & Credit Overview"><DebitCreditChart /></Section>
        <Section title="Invoices Sent"><InvoiceList /></Section>
      </div>
    </div>
  )
}

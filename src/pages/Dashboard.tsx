import Section from '../components/Section'
import { useNav } from '../context/NavContext'
import CreditCard from '../components/CreditCard'
import Transactions from '../components/Transactions'
import WeeklyActivity from '../components/WeeklyActivity'
import ExpenseStats from '../components/ExpenseStats'
import QuickTransfer from '../components/QuickTransfer'
import BalanceHistory from '../components/BalanceHistory'
export default function Dashboard() {
  const go = useNav()
  return (
    <div className="dash dbp">
      <div className="row r1">
        <Section title="My Cards" action="See All" onAction={() => go('Credit Cards')}><div className="cards"><CreditCard variant="primary" /><CreditCard variant="light" /></div></Section>
        <Section title="Recent Transaction"><Transactions /></Section>
      </div>
      <div className="row r1">
        <Section title="Weekly Activity"><WeeklyActivity /></Section>
        <Section title="Expense Statistics"><ExpenseStats /></Section>
      </div>
      <div className="row r2">
        <Section title="Quick Transfer"><QuickTransfer /></Section>
        <Section title="Balance History"><BalanceHistory /></Section>
      </div>
    </div>
  )
}

import Section from '../components/Section'
import { useNav } from '../context/NavContext'
import CreditCard from '../components/CreditCard'
import ChartCard from '../components/ChartCard'
import FilterBar from '../components/FilterBar'
import TransactionTable from '../components/TransactionTable'
import Pagination from '../components/Pagination'
import { useTransactions } from '../hooks/useTransactions'
import { expenseBars, txTabs } from '../data'
export default function TransactionsPage() {
  const go = useNav()
  const { tab, page, pages, rows, changeTab, setPage } = useTransactions()
  return (
    <div className="dash txp">
      <div className="row r1">
        <Section title="My Cards" action="+ Add Card" onAction={() => { go('Credit Cards'); window.setTimeout(() => document.getElementById('add-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 450) }}><div className="cards"><CreditCard variant="primary" /><CreditCard variant="light" faded /></div></Section>
        <Section title="My Expense"><ChartCard bars={expenseBars} /></Section>
      </div>
      <Section title="Recent Transactions">
        <FilterBar tabs={txTabs} active={tab} onChange={changeTab} />
        <TransactionTable rows={rows} />
      </Section>
      <Pagination page={page} pages={pages} onChange={setPage} />
    </div>
  )
}

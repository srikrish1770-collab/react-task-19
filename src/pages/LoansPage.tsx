import Section from '../components/Section'
import LoanSummaryCard from '../components/LoanSummaryCard'
import LoanTable from '../components/LoanTable'
import { loanStats } from '../data/loans'
export default function LoansPage() {
  return (
    <div className="dash acc">
      <div className="loan-stats">{loanStats.map(s => <LoanSummaryCard key={s.label} {...s} />)}</div>
      <Section title="Active Loans Overview"><LoanTable /></Section>
    </div>
  )
}

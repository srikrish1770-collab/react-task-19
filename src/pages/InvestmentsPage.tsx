import Section from '../components/Section'
import StatisticsCard from '../components/StatisticsCard'
import LineChart from '../components/LineChart'
import InvestmentCard from '../components/InvestmentCard'
import InvestmentTable from '../components/InvestmentTable'
import { invStats, years, yearly, monthly, holdings } from '../data/investments'
export default function InvestmentsPage() {
  return (
    <div className="dash ivp">
      <div className="inv-stats">{invStats.map(s => <StatisticsCard key={s.label} {...s} />)}</div>
      <div className="row r-eq">
        <Section title="Yearly Total Investment"><LineChart values={yearly} labels={years} color="var(--warning)" dots label="Yearly total investment" /></Section>
        <Section title="Monthly Revenue"><LineChart values={monthly} labels={years} color="var(--secondary)" smooth label="Monthly revenue" /></Section>
      </div>
      <div className="row r-mi">
        <Section title="My Investment"><div className="mi-list">{holdings.map(h => <InvestmentCard key={h.name} item={h} />)}</div></Section>
        <Section title="Trending Stock"><InvestmentTable /></Section>
      </div>
    </div>
  )
}

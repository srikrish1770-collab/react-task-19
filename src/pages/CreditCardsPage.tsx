import Section from '../components/Section'
import CardCarousel from '../components/CardCarousel'
import ExpenseChart from '../components/ExpenseChart'
import CardList from '../components/CardList'
import AddCardForm from '../components/AddCardForm'
import CardSettings from '../components/CardSettings'
export default function CreditCardsPage() {
  return (
    <div className="dash acc cc">
      <Section title="My Cards"><CardCarousel /></Section>
      <div className="row r-cl">
        <Section title="Card Expense Statistics"><ExpenseChart /></Section>
        <Section title="Card List"><CardList /></Section>
      </div>
      <div className="row r1">
        <Section title="Add New Card"><AddCardForm /></Section>
        <Section title="Card Setting"><CardSettings /></Section>
      </div>
    </div>
  )
}

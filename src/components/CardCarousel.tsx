import CreditCard from './CreditCard'
import { cardVariants } from '../data/creditCards'
export default function CardCarousel() {
  return <div className="cc-cards">{cardVariants.map(c => <CreditCard key={c.variant} {...c} />)}</div>
}

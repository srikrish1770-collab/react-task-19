import { useCountUp } from '../hooks/useCountUp'
import { asset } from '../utils/assets'

const chipLight = asset('chip-light.png', 'chip-dark.png', 'chip-faded.png')
const chipDark = asset('chip-dark.png', 'chip-faded.png', 'chip-light.png')
const chipFaded = asset('chip-faded.png', 'chip-dark.png', 'chip-light.png')
// The supplied mc.png is a 21×13 placeholder that blurs badly when scaled; these are crisp vector card-network marks.
const markLight = asset('mark-light.svg', 'mc.png')
const markDark = asset('mark-dark.svg', 'mc.png')

export default function CreditCard({ variant, faded = false }: { variant: 'primary' | 'light' | 'sky'; faded?: boolean }) {
  const bal = useCountUp(5756)
  const chip = variant !== 'light' ? chipLight : faded ? chipFaded : chipDark
  return (
    <article className={`ccard ${variant}`}>
      <div className="ccard-top">
        <div className="ccard-row"><div><small>Balance</small><strong className="bal">${bal.toLocaleString('en-US')}</strong></div>
          <img src={chip} alt="" width="35" height="35" /></div>
        <div className="ccard-meta"><div><small>CARD HOLDER</small><b>Eddy Cusuma</b></div><div><small>VALID THRU</small><b>12/22</b></div></div>
      </div>
      <div className="ccard-bottom"><span>3778 **** **** 1234</span><img src={variant === 'light' ? markDark : markLight} alt="" width="44" height="30" /></div>
    </article>
  )
}

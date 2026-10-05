import type { Holding } from '../data/investments'
export default function InvestmentCard({ item }: { item: Holding }) {
  return (
    <div className="card mi">
      <img className="mi-ico" src={item.icon} alt="" />
      <div><span>{item.name}</span><small>{item.sub}</small></div>
      <div className="hm"><span>{item.value}</span><small>Envestment Value</small></div>
      <div className="mi-ret"><span className={item.ret < 0 ? 'neg' : 'pos'}>{item.ret > 0 ? '+' : ''}{item.ret}%</span><small>Return Value</small></div>
    </div>
  )
}

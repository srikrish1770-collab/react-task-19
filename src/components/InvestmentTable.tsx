import { stocks } from '../data/investments'
export default function InvestmentTable() {
  return (
    <div className="card ts" role="table" aria-label="Trending stock">
      <div className="ts-row ts-head" role="row">{['SL No', 'Name', 'Price', 'Return'].map(c => <span key={c} role="columnheader">{c}</span>)}</div>
      {stocks.map(s => (
        <div className="ts-row" role="row" key={s.no}>
          <span role="cell">{s.no}</span><span role="cell">{s.name}</span><span role="cell">{s.price}</span>
          <span role="cell" className={s.ret < 0 ? 'neg' : 'pos'}>{s.ret > 0 ? '+' : ''}{s.ret}%</span>
        </div>
      ))}
    </div>
  )
}

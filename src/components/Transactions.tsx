import { transactions } from '../data'
const p = { viewBox: '0 0 24 24', width: 22, height: 22, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true } as const
const icons = [
  <svg key="a" {...p}><rect x="3" y="7" width="18" height="11" rx="2"/><path d="M3 11h18M7 15h4"/></svg>,
  <svg key="b" {...p}><path d="M8 20l3-15h5a3.5 3.5 0 010 7h-4M6 14h5"/></svg>,
  <svg key="c" {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 9v6M10 10.5h3M10 13.5h3"/></svg>,
]
export default function Transactions() {
  return (
    <div className="card tx-list">
      {transactions.map((t, i) => (
        <div className="tx" key={t.title}>
          <span className={`tx-ico ${t.tone}`}>{icons[i]}</span>
          <div className="tx-text"><b>{t.title}</b><small>{t.date}</small></div>
          <span className={`tx-amt ${t.amount < 0 ? 'neg' : 'pos'}`}>{t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toLocaleString('en-US')}</span>
        </div>
      ))}
    </div>
  )
}

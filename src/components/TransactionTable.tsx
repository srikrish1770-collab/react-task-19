import type { CSSProperties } from 'react'
import type { TxRow } from '../data'
import StatusBadge from './StatusBadge'
import { useToast } from '../context/ToastContext'
const cols = ['Description', 'Transaction ID', 'Type', 'Card', 'Date', 'Amount', 'Receipt']
const Arrow = ({ up }: { up: boolean }) => (
  <svg className="arrow" width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
    <circle cx="15" cy="15" r="14"/><path d={up ? 'M15 21V9M10 14l5-5 5 5' : 'M15 9v12M10 16l5 5 5-5'} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/** Builds a small plain-text receipt and hands it to the browser as a download. */
function downloadReceipt(r: TxRow) {
  const sign = r.amount < 0 ? '-' : '+'
  const body = [
    'BankDash. — Transaction Receipt', '--------------------------------',
    `Description : ${r.desc}`, `Transaction : ${r.txId}`, `Type        : ${r.type}`,
    `Card        : ${r.card}`, `Date        : ${r.date}`, `Amount      : ${sign}$${Math.abs(r.amount).toLocaleString('en-US')}`,
  ].join('\n')
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain' }))
  const a = document.createElement('a')
  a.href = url; a.download = `receipt-${r.txId.replace('#', '')}.txt`
  document.body.appendChild(a); a.click(); a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function TransactionTable({ rows }: { rows: TxRow[] }) {
  const toast = useToast()
  return (
    <div className="card tbl" role="table" aria-label="Recent transactions">
      <div className="trow thead" role="row">{cols.map(c => <span key={c} role="columnheader">{c}</span>)}</div>
      {rows.map((r, i) => (
        <div className="trow enter" role="row" key={r.id} style={{ '--i': i } as CSSProperties}>
          <span className="desc" role="cell"><Arrow up={r.amount < 0} /><span className="dtitle">{r.desc}</span></span>
          <span role="cell" data-label="Transaction ID">{r.txId}</span>
          <span role="cell" data-label="Type">{r.type}</span>
          <span role="cell" data-label="Card">{r.card}</span>
          <span role="cell" data-label="Date">{r.date}</span>
          <span role="cell" data-label="Amount"><StatusBadge amount={r.amount} /></span>
          <span role="cell" className="rcpt"><button type="button" className="dl" onClick={() => { downloadReceipt(r); toast(`Receipt for ${r.desc} downloaded`) }}>Download</button></span>
        </div>
      ))}
    </div>
  )
}

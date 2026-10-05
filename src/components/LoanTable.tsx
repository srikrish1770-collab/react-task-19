import { useState } from 'react'
import { loanColumns, loanRows, loanTotal } from '../data/loans'
import { useToast } from '../context/ToastContext'
import Modal from './Modal'
import Spinner from './Spinner'
const cls = ['c-sl', '', '', 'c-dur', 'c-int', 'c-inst', '']
export default function LoanTable() {
  const toast = useToast()
  const [confirm, setConfirm] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [paid, setPaid] = useState<number[]>([])
  const loan = confirm === null ? null : loanRows[confirm]

  const pay = () => {
    if (confirm === null) return
    const idx = confirm
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false); setConfirm(null); setPaid(p => [...p, idx])
      toast(`Installment of ${loanRows[idx].inst.split(' ')[0]} paid for loan ${loanRows[idx].n.replace('.', '')}`)
    }, 900)
  }

  return (
    <div className="card lt" role="table" aria-label="Active loans overview">
      <div className="lt-row lt-head" role="row">{loanColumns.map((c, i) => <span key={c} role="columnheader" className={cls[i]}>{c}</span>)}</div>
      {loanRows.map((l, i) => (
        <div className="lt-row" role="row" key={l.n}>
          <span role="cell" className="c-sl">{l.n}</span><span role="cell">{l.money}</span><span role="cell">{l.left}</span>
          <span role="cell" className="c-dur">{l.duration}</span><span role="cell" className="c-int">{l.rate}</span>
          <span role="cell" className="c-inst">{l.inst}</span>
          <span role="cell"><button type="button" className={`repay ${i === 0 || paid.includes(i) ? 'on' : ''}`} onClick={() => setConfirm(i)} aria-label={`Repay loan ${l.n.replace('.', '')}`}>{paid.includes(i) ? 'Paid' : 'Repay'}</button></span>
        </div>
      ))}
      <div className="lt-row lt-total" role="row">
        <span role="cell" className="c-sl">Total</span><span role="cell">{loanTotal.money}</span><span role="cell">{loanTotal.left}</span>
        <span role="cell" className="c-dur" /><span role="cell" className="c-int" /><span role="cell" className="c-inst">{loanTotal.inst}</span><span role="cell" />
      </div>
      {loan && (
        <Modal title={`Repay loan ${loan.n.replace('.', '')}`} onClose={() => !busy && setConfirm(null)}
          footer={<><button type="button" className="btn ghost" disabled={busy} onClick={() => setConfirm(null)}>Cancel</button>
            <button type="button" className="btn" disabled={busy} onClick={pay}>{busy ? <><Spinner />Paying</> : 'Pay installment'}</button></>}>
          <dl className="kv">
            <div><dt>Loan amount</dt><dd>{loan.money}</dd></div><div><dt>Left to repay</dt><dd>{loan.left}</dd></div>
            <div><dt>Duration</dt><dd>{loan.duration}</dd></div><div><dt>Interest rate</dt><dd>{loan.rate}</dd></div>
            <div><dt>Installment</dt><dd>{loan.inst}</dd></div>
          </dl>
        </Modal>
      )}
    </div>
  )
}

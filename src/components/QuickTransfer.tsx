import { useEffect, useRef, useState } from 'react'
import { contacts } from '../data'
import { useToast } from '../context/ToastContext'
import Spinner from './Spinner'

const BALANCE = 5756
type Phase = 'idle' | 'sending' | 'sent'

export default function QuickTransfer() {
  const toast = useToast()
  const [amount, setAmount] = useState('525.50')
  const [shift, setShift] = useState(0)
  const [selected, setSelected] = useState(() => (contacts.find(c => c.bold) ?? contacts[0]).name)
  const [phase, setPhase] = useState<Phase>('idle')
  const [invalid, setInvalid] = useState(false)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const list = contacts.map((_, i) => contacts[(i + shift) % contacts.length])
  const onAmount = (v: string) => {
    const clean = v.replace(/[^\d.]/g, '').replace(/(\..*)\./g, '$1')
    setAmount(clean); setInvalid(false)
  }
  const send = () => {
    if (phase !== 'idle') return
    const n = Number(amount)
    if (!amount || !Number.isFinite(n) || n <= 0) { setInvalid(true); toast('Enter an amount greater than $0', 'error'); return }
    if (n > BALANCE) { setInvalid(true); toast(`Amount exceeds your balance of $${BALANCE.toLocaleString('en-US')}`, 'error'); return }
    setPhase('sending')
    timers.current.push(window.setTimeout(() => {
      setPhase('sent')
      toast(`$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} sent to ${selected}`)
      timers.current.push(window.setTimeout(() => setPhase('idle'), 1500))
    }, 900))
  }

  return (
    <form className="card qt" onSubmit={e => { e.preventDefault(); send() }} noValidate>
      <div className="qt-people">
        {list.map(c => (
          <button type="button" key={`${c.name}-${shift}`} className={`person${c.name === selected ? ' sel' : ''}`} aria-pressed={c.name === selected} onClick={() => setSelected(c.name)}>
            <img src={c.img} alt="" width="70" height="70" />
            <b style={{ fontWeight: c.name === selected ? 700 : 400 }}>{c.name}</b><small className={c.name === selected ? 'strong' : ''}>{c.role}</small>
          </button>
        ))}
        <button type="button" className="next" aria-label="Show next contacts" onClick={() => setShift(s => (s + 1) % contacts.length)}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l6 6-6 6"/></svg>
        </button>
      </div>
      <div className="qt-send">
        <label className="qt-label" htmlFor="qt-amount">Write Amount</label>
        <div className={`qt-pill${invalid ? ' invalid' : ''}`}>
          <input id="qt-amount" inputMode="decimal" value={amount} onChange={e => onAmount(e.target.value)} aria-label="Amount" aria-invalid={invalid} />
          <button type="submit" className={`send${phase === 'sent' ? ' done' : ''}`} disabled={phase === 'sending'}>
            {phase === 'sending' ? <><Spinner />Sending</> : phase === 'sent' ? <>Sent
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></> : <>Send
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></>}
          </button>
        </div>
      </div>
    </form>
  )
}

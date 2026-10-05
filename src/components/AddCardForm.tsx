import { useEffect, useRef, useState } from 'react'
import { cardFields } from '../data/creditCards'
import { useToast } from '../context/ToastContext'
import Spinner from './Spinner'

const empty = Object.fromEntries(cardFields.map(f => [f.id, '']))
const check = (id: string, v: string): string => {
  if (!v.trim()) return 'Required'
  if (id === 'number' && v.replace(/\D/g, '').length !== 16) return 'Enter all 16 digits'
  return ''
}

export default function AddCardForm() {
  const toast = useToast()
  const [values, setValues] = useState<Record<string, string>>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const change = (id: string, raw: string) => {
    // card number: digits only, grouped as "1234 5678 9012 3456"
    const v = id === 'number' ? raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 ') : raw
    setValues(s => ({ ...s, [id]: v }))
    if (errors[id]) setErrors(e => ({ ...e, [id]: check(id, v) }))
  }
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (busy) return
    const next = Object.fromEntries(cardFields.map(f => [f.id, check(f.id, values[f.id])]))
    setErrors(next)
    const bad = cardFields.find(f => next[f.id])
    if (bad) { document.getElementById(bad.id)?.focus(); toast('Please complete the highlighted fields', 'error'); return }
    setBusy(true)
    timer.current = window.setTimeout(() => {
      setBusy(false); setValues(empty); setErrors({})
      toast(`Card ending ${values.number.slice(-4)} added successfully`)
    }, 900)
  }
  const hasErr = Object.values(errors).some(Boolean)

  return (
    <form className="card anc" id="add-card" onSubmit={submit} noValidate>
      <p>Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.</p>
      <div className={`anc-grid${hasErr ? ' has-err' : ''}`}>
        {cardFields.map(f => (
          <div className={`fld${errors[f.id] ? ' invalid' : ''}`} key={f.id}>
            <label htmlFor={f.id}>{f.label}</label>
            <input id={f.id} placeholder={f.placeholder} autoComplete="off" value={values[f.id]} inputMode={f.id === 'number' ? 'numeric' : undefined}
              aria-invalid={!!errors[f.id]} aria-describedby={errors[f.id] ? f.id + '-err' : undefined} onChange={e => change(f.id, e.target.value)} />
            {f.chevron && <svg className="chev" width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M1 1l6 6 6-6"/></svg>}
            {errors[f.id] && <span className="err" id={f.id + '-err'} role="alert">{errors[f.id]}</span>}
          </div>
        ))}
      </div>
      <button className="btn" type="submit" disabled={busy}>{busy ? <><Spinner />Adding</> : 'Add Card'}</button>
    </form>
  )
}

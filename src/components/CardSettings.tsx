import { useState } from 'react'
import { cardSettings } from '../data/creditCards'
import { useToast } from '../context/ToastContext'

const done: Record<string, string> = {
  'Block Card': 'Card blocked. You can unblock it anytime.',
  'Change Pin Code': 'We’ve sent a secure link to change your PIN.',
  'Add to Google Pay': 'Card added to Google Pay.',
  'Add to Apple Pay': 'Card added to Apple Pay.',
  'Add to Apple Store': 'Card added to Apple Store.',
}
export default function CardSettings() {
  const toast = useToast()
  const [on, setOn] = useState<string[]>([])
  const click = (title: string) => {
    const wasOn = on.includes(title)
    setOn(s => (wasOn ? s.filter(t => t !== title) : [...s, title]))
    toast(wasOn ? `${title} turned off` : done[title] ?? `${title} enabled`, wasOn ? 'info' : 'success')
  }
  return (
    <div className="card cs">
      {cardSettings.map(s => (
        <button type="button" className={`cs-row${on.includes(s.title) ? ' on' : ''}`} key={s.title} aria-pressed={on.includes(s.title)} onClick={() => click(s.title)}>
          <img className="tile" src={s.icon} alt="" /><div><b>{s.title}</b><small>{s.sub}</small></div>
          <span className="cs-state" aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
        </button>
      ))}
    </div>
  )
}

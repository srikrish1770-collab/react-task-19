import { useLayoutEffect, useRef, useState } from 'react'
import { menu } from '../data'
import logo from '../assets/logo.png'
const AccountIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="currentColor" aria-hidden><circle cx="13" cy="8" r="5.5"/><path d="M2.5 24c0-5 4.7-8 10.5-8s10.5 3 10.5 8z"/></svg>
)
export default function Sidebar({ active, open, onNavigate }: { active: string; open: boolean; onNavigate: (label: string) => void }) {
  const nav = useRef<HTMLElement>(null)
  const [bar, setBar] = useState<{ top: number; height: number } | null>(null)

  // One indicator that slides to the active item (re-measured on resize because item heights change per breakpoint).
  useLayoutEffect(() => {
    const measure = () => {
      const el = nav.current?.querySelector<HTMLElement>('.nav-item.active')
      setBar(el ? { top: el.offsetTop, height: el.offsetHeight } : null)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active])

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="logo"><img src={logo} alt="" width="34" height="34" /><span>BankDash.</span></div>
      <nav ref={nav} aria-label="Main navigation">
        <span className="nav-bar" aria-hidden style={bar ? { transform: `translateY(${bar.top}px)`, height: bar.height, opacity: 1 } : { opacity: 0 }} />
        {menu.map(m => (
          <button key={m.label} className={`nav-item ${active === m.label ? 'active' : ''}`} aria-current={active === m.label ? 'page' : undefined} onClick={() => onNavigate(m.label)}>
            <span className="nav-icon">{m.icon ? <img src={m.icon} alt="" /> : <AccountIcon />}</span>
            <span className="nav-label">{m.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

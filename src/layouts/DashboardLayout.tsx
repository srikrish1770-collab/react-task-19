import { useEffect, useState, type ReactNode } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
interface Props { title: string; active: string; onNavigate: (label: string) => void; children: ReactNode }
export default function DashboardLayout({ title, active, onNavigate, children }: Props) {
  const [open, setOpen] = useState(false)
  // Lock background scrolling while the mobile drawer is open (the CSS only applies this on mobile widths).
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])
  return (
    <div className="app">
      <Sidebar active={active} open={open} onNavigate={l => { onNavigate(l); setOpen(false) }} />
      <div className={`scrim${open ? ' show' : ''}`} onClick={() => setOpen(false)} aria-hidden />
      <div className="content"><Header title={title} onMenu={() => setOpen(true)} /><main className="page" key={active}>{children}</main></div>
    </div>
  )
}

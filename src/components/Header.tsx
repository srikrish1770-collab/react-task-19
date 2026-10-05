import { useEffect, useRef, useState } from 'react'
import gear from '../assets/gear.png'; import bell from '../assets/bell.png'; import me from '../assets/me.png'
import SearchBar from './SearchBar'
import { useNav } from '../context/NavContext'
import { requestSettingsTab } from '../context/SettingsTabContext'
import { notifications } from '../data/search'

export default function Header({ title, onMenu }: { title: string; onMenu: () => void }) {
  const go = useNav()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(notifications)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  const openProfile = () => { requestSettingsTab('Edit Profile'); go('Setting') }

  return (
    <div className="hdr">
      <header className="header">
        <button className="menu-btn" onClick={onMenu} aria-label="Open menu">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1h20M1 8h20M1 15h20"/></svg>
        </button>
        <h1>{title}</h1>
        <div className="header-right">
          <SearchBar />
          <button className="round" aria-label="Settings" onClick={() => go('Setting')}><img src={gear} alt="" /></button>
          <div className="bell-wrap" ref={box}>
            <button className="round bell" aria-label={`Notifications${items.length ? `, ${items.length} unread` : ''}`} aria-expanded={open} onClick={() => setOpen(o => !o)}>
              <img src={bell} alt="" />{items.length > 0 && <i className="dot" aria-hidden />}
            </button>
            {open && (
              <div className="pop notif" role="dialog" aria-label="Notifications">
                <div className="notif-head"><b>Notifications</b>{items.length > 0 && <button type="button" className="link" onClick={() => setItems([])}>Mark all read</button>}</div>
                {items.length === 0
                  ? <div className="pop-empty">You’re all caught up</div>
                  : <ul>{items.map(n => <li key={n.id}><b>{n.title}</b><span>{n.text}</span><small>{n.time}</small></li>)}</ul>}
              </div>
            )}
          </div>
          <button className="avatar-btn" aria-label="Open profile settings" onClick={openProfile}><img className="avatar" src={me} alt="" /></button>
        </div>
      </header>
      <div className="msearch"><SearchBar /></div>
    </div>
  )
}

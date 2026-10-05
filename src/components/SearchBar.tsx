import { useId, useMemo, useRef, useState } from 'react'
import { searchIndex } from '../data/search'
import { useNav } from '../context/NavContext'
import { requestSettingsTab } from '../context/SettingsTabContext'

export default function SearchBar() {
  const go = useNav()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const listId = useId()
  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? searchIndex.filter(i => i.label.toLowerCase().includes(t) || i.hint.toLowerCase().includes(t)).slice(0, 6) : []
  }, [q])

  const choose = (i: number) => {
    const item = results[i]
    if (!item) return
    if (item.tab) requestSettingsTab(item.tab)
    go(item.page)
    setQ(''); setOpen(false); input.current?.blur()
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, Math.max(results.length - 1, 0))) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); choose(cursor) }
    else if (e.key === 'Escape') { setOpen(false); input.current?.blur() }
  }

  return (
    <div className="search" role="search" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false) }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden onClick={() => input.current?.focus()}><circle cx="9" cy="9" r="6.5"/><path d="M14 14l4 4" strokeLinecap="round"/></svg>
      <input
        ref={input} placeholder="Search for something" aria-label="Search" value={q} autoComplete="off"
        role="combobox" aria-expanded={open && q.trim().length > 0} aria-controls={listId}
        onChange={e => { setQ(e.target.value); setOpen(true); setCursor(0) }} onFocus={() => setOpen(true)} onKeyDown={onKey}
      />
      {open && q.trim() && (
        <ul className="pop search-pop" id={listId} role="listbox">
          {results.length === 0
            ? <li className="pop-empty">No results for “{q.trim()}”</li>
            : results.map((r, i) => (
              <li key={r.label + r.hint} role="option" aria-selected={i === cursor}>
                <button type="button" className={i === cursor ? 'on' : ''} onMouseEnter={() => setCursor(i)} onMouseDown={e => e.preventDefault()} onClick={() => choose(i)}>
                  <span>{r.label}</span><small>{r.hint}</small>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

interface Props<T extends string> { tabs: readonly T[]; active: T; onChange: (t: T) => void }
export default function FilterBar<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(t => <button key={t} role="tab" aria-selected={t === active} className={`tab ${t === active ? 'on' : ''}`} onClick={() => onChange(t)}>{t}</button>)}
    </div>
  )
}

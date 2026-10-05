interface Props { tabs: string[]; active: string; onChange?: (tab: string) => void }
export default function SettingsTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="st-tabs" role="tablist">
      {tabs.map(t => (
        <button key={t} role="tab" aria-selected={t === active} onClick={() => onChange?.(t)} className={t === active ? 'st-tab on' : 'st-tab'}>
          {t.endsWith('s') ? <>{t.slice(0, -1)}<span className="ps">s</span></> : t}
        </button>
      ))}
    </div>
  )
}

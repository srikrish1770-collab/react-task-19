interface Props { id: string; label: string; checked: boolean; onChange: (id: string, v: boolean) => void }
export default function ToggleSwitch({ id, label, checked, onChange }: Props) {
  return (
    <label className="pr-row">
      <input type="checkbox" role="switch" checked={checked} onChange={e => onChange(id, e.target.checked)} />
      <span className="pr-track" aria-hidden><span className="pr-knob" /></span>
      <span className="pr-text">{label}</span>
    </label>
  )
}

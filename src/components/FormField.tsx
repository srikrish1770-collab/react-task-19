import type { ProfileField } from '../data/settings'
interface Props { field: ProfileField; value: string; error?: string; onChange: (id: string, v: string) => void; onBlur?: (id: string) => void }
export default function FormField({ field, value, error, onChange, onBlur }: Props) {
  const id = 'sf-' + field.id
  return (
    <div className={`sf${error ? ' invalid' : ''}`}>
      <label htmlFor={id}>{field.label}</label>
      <input id={id} type={field.type ?? 'text'} value={value} autoComplete="off" aria-invalid={!!error} aria-describedby={error ? id + '-err' : undefined}
        onChange={e => onChange(field.id, e.target.value)} onBlur={() => onBlur?.(field.id)} />
      {field.chevron && <svg className="chev" width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M1 1l6 6 6-6"/></svg>}
      {error && <span className="err" id={id + '-err'} role="alert">{error}</span>}
    </div>
  )
}

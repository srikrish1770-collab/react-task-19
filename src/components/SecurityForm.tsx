import { useEffect, useState } from 'react'
import ToggleSwitch from './ToggleSwitch'
import Spinner from './Spinner'
import { useToast } from '../context/ToastContext'

function Eye({ off }: { off: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  )
}

interface PwProps { id: string; label: string; value: string; onChange: (v: string) => void; autoComplete: string; error?: string }
function PasswordField({ id, label, value, onChange, autoComplete, error }: PwProps) {
  const [show, setShow] = useState(false)
  return (
    <div className={`sf${error ? ' invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="sc-field">
        <input id={id} type={show ? 'text' : 'password'} value={value} placeholder="**********" autoComplete={autoComplete} aria-invalid={!!error} aria-describedby={error ? id + '-err' : undefined} onChange={e => onChange(e.target.value)} />
        <button type="button" className="sc-eye" aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} aria-pressed={show} onClick={() => setShow(s => !s)}>
          <Eye off={show} />
        </button>
      </div>
      {error && <span className="err" id={id + '-err'} role="alert">{error}</span>}
    </div>
  )
}

export default function SecurityForm() {
  const [twoFactor, setTwoFactor] = useState(true)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ current?: string; next?: string }>({})
  const toast = useToast()
  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 1600)
    return () => window.clearTimeout(t)
  }, [saved])
  return (
    <form className="sc-form" noValidate onSubmit={e => {
      e.preventDefault()
      if (saving) return
      // Passwords are only validated when the user is actually changing one.
      const changing = current !== '' || next !== ''
      const errs = changing ? {
        current: current ? undefined : 'Enter your current password',
        next: next.length >= 8 ? undefined : 'Use at least 8 characters',
      } : {}
      setErrors(errs)
      if (errs.current || errs.next) { toast('Please fix the highlighted fields', 'error'); return }
      setSaving(true)
      window.setTimeout(() => {
        setSaving(false); setSaved(true); setCurrent(''); setNext('')
        toast(changing ? 'Password updated successfully' : 'Security settings saved')
      }, 800)
    }}>
      <h3 className="sc-head sc-first" id="sc-2fa">Two-factor Authentication</h3>
      <div role="group" aria-labelledby="sc-2fa">
        <ToggleSwitch id="twofactor" label="Enable or disable two factor authentication" checked={twoFactor} onChange={(_, v) => { setTwoFactor(v); setSaved(false) }} />
      </div>
      <h3 className="sc-head sc-second">Change Password</h3>
      <div className="sc-fields">
        <PasswordField id="sc-current" label="Current Password" value={current} onChange={v => { setCurrent(v); setErrors(e => ({ ...e, current: undefined })) }} autoComplete="current-password" error={errors.current} />
        <PasswordField id="sc-new" label="New Password" value={next} onChange={v => { setNext(v); setErrors(e => ({ ...e, next: undefined })) }} autoComplete="new-password" error={errors.next} />
      </div>
      <div className="set-save"><button className={saved ? 'save done' : 'save'} type="submit" disabled={saving} aria-live="polite">{saving ? <><Spinner />Saving</> : saved ? 'Saved' : 'Save'}</button></div>
    </form>
  )
}

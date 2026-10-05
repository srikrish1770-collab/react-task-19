import { useEffect, useRef, useState } from 'react'
import FormField from './FormField'
import ProfileAvatar from './ProfileAvatar'
import Spinner from './Spinner'
import { profileFields } from '../data/settings'
import { useToast } from '../context/ToastContext'

const check = (id: string, v: string): string => {
  if (id === 'password') return ''
  if (!v.trim()) return 'This field is required'
  if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Enter a valid email address'
  if (id === 'postal' && !/^[A-Za-z0-9 -]{3,10}$/.test(v.trim())) return 'Enter a valid postal code'
  return ''
}

export default function EditProfileForm() {
  const toast = useToast()
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(profileFields.map(f => [f.id, f.value])))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [phase, setPhase] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const update = (id: string, v: string) => {
    setValues(s => ({ ...s, [id]: v }))
    setPhase(p => (p === 'saved' ? 'idle' : p))
    if (errors[id]) setErrors(e => ({ ...e, [id]: check(id, v) }))   // clear the message as soon as the value is fixed
  }
  const blur = (id: string) => setErrors(e => ({ ...e, [id]: check(id, values[id]) }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phase === 'saving') return
    const next = Object.fromEntries(profileFields.map(f => [f.id, check(f.id, values[f.id])]))
    setErrors(next)
    const firstBad = profileFields.find(f => next[f.id])
    if (firstBad) { document.getElementById('sf-' + firstBad.id)?.focus(); toast('Please fix the highlighted fields', 'error'); return }
    setPhase('saving')
    timers.current.push(window.setTimeout(() => {
      setPhase('saved'); toast('Profile updated successfully')
      timers.current.push(window.setTimeout(() => setPhase('idle'), 1600))
    }, 800))
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="set-body">
        <ProfileAvatar />
        <div className="sf-grid">
          {profileFields.map(f => <FormField key={f.id} field={f} value={values[f.id]} error={errors[f.id]} onChange={update} onBlur={blur} />)}
        </div>
      </div>
      <div className="set-save">
        <button className={phase === 'saved' ? 'save done' : 'save'} type="submit" disabled={phase === 'saving'} aria-live="polite">
          {phase === 'saving' ? <><Spinner />Saving</> : phase === 'saved' ? 'Saved' : 'Save'}
        </button>
      </div>
    </form>
  )
}

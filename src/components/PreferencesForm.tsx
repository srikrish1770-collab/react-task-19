import { useEffect, useState } from 'react'
import ToggleSwitch from './ToggleSwitch'
import Spinner from './Spinner'
import { useToast } from '../context/ToastContext'
import { currencies, timeZones, notificationOptions } from '../data/preferences'

export default function PreferencesForm() {
  const [currency, setCurrency] = useState(currencies[0])
  const [zone, setZone] = useState(timeZones[0])
  const [toggles, setToggles] = useState<Record<string, boolean>>(() => Object.fromEntries(notificationOptions.map(o => [o.id, o.on])))
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 1600)
    return () => window.clearTimeout(t)
  }, [saved])
  const flip = (id: string, v: boolean) => { setToggles(s => ({ ...s, [id]: v })); setSaved(false) }
  return (
    <form className="pr-form" onSubmit={e => { e.preventDefault(); if (saving) return; setSaving(true); window.setTimeout(() => { setSaving(false); setSaved(true); toast('Preferences saved') }, 700) }}>
      <div className="pr-grid">
        <div className="sf">
          <label htmlFor="pr-currency">Currency</label>
          <select id="pr-currency" value={currency} onChange={e => { setCurrency(e.target.value); setSaved(false) }}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="sf">
          <label htmlFor="pr-zone">Time Zone</label>
          <select id="pr-zone" value={zone} onChange={e => { setZone(e.target.value); setSaved(false) }}>
            {timeZones.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
      </div>
      <h3 className="pr-head" id="pr-notif">Notification</h3>
      <div className="pr-list" role="group" aria-labelledby="pr-notif">
        {notificationOptions.map(o => <ToggleSwitch key={o.id} id={o.id} label={o.label} checked={toggles[o.id]} onChange={flip} />)}
      </div>
      <div className="set-save"><button className={saved ? 'save done' : 'save'} type="submit" disabled={saving} aria-live="polite">{saving ? <><Spinner />Saving</> : saved ? 'Saved' : 'Save'}</button></div>
    </form>
  )
}

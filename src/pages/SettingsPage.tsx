import { useEffect, useState } from 'react'
import SettingsTabs from '../components/SettingsTabs'
import EditProfileForm from '../components/EditProfileForm'
import PreferencesForm from '../components/PreferencesForm'
import SecurityForm from '../components/SecurityForm'
import { settingsTabs } from '../data/settings'
import { SETTINGS_TAB_EVENT, takeSettingsTab } from '../context/SettingsTabContext'

export default function SettingsPage() {
  // A tab can be requested from elsewhere (header search / avatar); fall back to the first tab.
  const [tab, setTab] = useState(() => { const t = takeSettingsTab(); return t && settingsTabs.includes(t) ? t : 'Edit Profile' })
  useEffect(() => {
    const onReq = (e: Event) => {
      const t = (e as CustomEvent<string>).detail
      if (settingsTabs.includes(t)) { setTab(t); takeSettingsTab() }
    }
    window.addEventListener(SETTINGS_TAB_EVENT, onReq)
    return () => window.removeEventListener(SETTINGS_TAB_EVENT, onReq)
  }, [])
  return (
    <div className="dash">
      <div className="card set-card">
        <SettingsTabs tabs={settingsTabs} active={tab} onChange={setTab} />
        <div key={tab} className="tab-panel">
          {tab === 'Preferences' ? <PreferencesForm /> : tab === 'Security' ? <SecurityForm /> : <EditProfileForm />}
        </div>
      </div>
    </div>
  )
}

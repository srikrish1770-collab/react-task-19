/**
 * Tiny bridge so the header search can open a specific Settings tab.
 * If Settings is not mounted yet the request is remembered and read on mount; if it is, the event updates it live.
 */
const EVENT = 'bankdash:settings-tab'
let pending: string | null = null

export function requestSettingsTab(tab: string) {
  pending = tab
  window.dispatchEvent(new CustomEvent(EVENT, { detail: tab }))
}
export function takeSettingsTab(): string | null {
  const t = pending; pending = null; return t
}
export const SETTINGS_TAB_EVENT = EVENT

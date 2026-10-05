import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

export type ToastTone = 'success' | 'info' | 'error'
interface Toast { id: number; message: string; tone: ToastTone; leaving: boolean }
type Notify = (message: string, tone?: ToastTone) => void

const ToastContext = createContext<Notify>(() => {})
export const useToast = () => useContext(ToastContext)

const ICONS: Record<ToastTone, string> = {
  success: 'M5 12.5l4.5 4.5L19 7.5',
  info: 'M12 8v.01M12 11.5V17',
  error: 'M7 7l10 10M17 7L7 17',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts(t => t.map(x => (x.id === id ? { ...x, leaving: true } : x)))
    window.setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 240)
  }, [])

  const notify = useCallback<Notify>((message, tone = 'success') => {
    const id = nextId.current++
    // an identical message that is still on screen is not stacked a second time
    setToasts(t => (t.some(x => x.message === message && !x.leaving) ? t : [...t.slice(-2), { id, message, tone, leaving: false }]))
    window.setTimeout(() => dismiss(id), 3200)
  }, [dismiss])

  const value = useMemo(() => notify, [notify])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.tone}${t.leaving ? ' leaving' : ''}`}>
            <span className="toast-ico" aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[t.tone]} /></svg>
            </span>
            <span className="toast-msg">{t.message}</span>
            <button type="button" className="toast-x" aria-label="Dismiss notification" onClick={() => dismiss(t.id)}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

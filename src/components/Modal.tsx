import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface Props { title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }

/** Accessible dialog: Escape / backdrop click closes, focus moves in and returns on close, body scroll is locked. */
export default function Modal({ title, onClose, children, footer }: Props) {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    box.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
      prev?.focus?.()
    }
  }, [onClose])
  // Portalled to <body>: cards lift with a CSS transform on hover, which would otherwise re-anchor a position:fixed child.
  return createPortal(
    <div className="modal-back" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={title} ref={box} tabIndex={-1}>
        <div className="modal-head"><h3>{title}</h3>
          <button type="button" className="modal-x" aria-label="Close dialog" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13" /></svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

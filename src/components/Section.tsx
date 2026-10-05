import type { ReactNode } from 'react'
export default function Section({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: ReactNode }) {
  return (
    <section>
      <div className="sec-head"><h2>{title}</h2>{action && <button type="button" className="link" onClick={onAction}>{action}</button>}</div>
      {children}
    </section>
  )
}

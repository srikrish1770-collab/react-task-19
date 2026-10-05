import { useNav } from '../context/NavContext'

export default function PrivilegesPage() {
  const go = useNav()
  return (
    <div className="dash">
      <div className="card empty">
        <span className="empty-ico" aria-hidden>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.800-7-5.500-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
        </span>
        <h2>No privileges to show yet</h2>
        <p>Exclusive offers and account perks will appear here as your relationship with BankDash grows.</p>
        <button type="button" className="btn" onClick={() => go('Dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  )
}

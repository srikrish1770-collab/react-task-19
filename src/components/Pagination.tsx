const Chev = ({ left }: { left?: boolean }) => (
  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d={left ? 'M7 1L1 7l6 6' : 'M1 1l6 6-6 6'}/></svg>
)
interface Props { page: number; pages: number; onChange: (p: number) => void }
export default function Pagination({ page, pages, onChange }: Props) {
  return (
    <nav className="pager" aria-label="Pagination">
      <button className="pn" disabled={page === 1} onClick={() => onChange(page - 1)}><Chev left /><span className="plabel">Previous</span></button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button key={p} className={`pg ${p === page ? 'on' : ''}`} aria-current={p === page ? 'page' : undefined} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="pn" disabled={page === pages} onClick={() => onChange(page + 1)}><span className="plabel">Next</span><Chev /></button>
    </nav>
  )
}

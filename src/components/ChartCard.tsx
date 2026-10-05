import type { CSSProperties } from 'react'
interface Bar { m: string; v: number; h: number; t?: number; hi?: boolean }
export default function ChartCard({ bars }: { bars: Bar[] }) {
  return (
    <div className="card bars-card" role="img" aria-label="My expense by month">
      {bars.map((b, i) => (
        <div className="bcol" key={b.m}>
          <div className="bslot">
            {b.hi && <span className="bval">${b.v.toLocaleString('en-US')}</span>}
            <i className={`bbar ${b.hi ? 'hi' : ''}`} style={{ '--h': `${b.h}px`, '--ht': `${b.t ?? b.h}px`, animationDelay: `${i * 40}ms` } as CSSProperties} />
          </div>
          <small>{b.m}</small>
        </div>
      ))}
    </div>
  )
}

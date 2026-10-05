import { bankSlices } from '../data/creditCards'
const pt = (a: number, r: number) => { const t = (a * Math.PI) / 180; return [100 + r * Math.sin(t), 100 - r * Math.cos(t)] }
const sector = (a0: number, a1: number, r0: number, r1: number) => {
  const [x0, y0] = pt(a0, r1), [x1, y1] = pt(a1, r1), [x2, y2] = pt(a1, r0), [x3, y3] = pt(a0, r0)
  return `M${x0} ${y0}A${r1} ${r1} 0 0 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 0 0 ${x3} ${y3}Z`
}
export default function ExpenseChart() {
  return (
    <div className="card donut-card">
      <svg className="donut" viewBox="0 0 200 200" role="img" aria-label="Card expense statistics by bank">
        {bankSlices.map((s, i) => (
          <g key={s.label} className="slice" style={{ animationDelay: `${i * 50}ms`, filter: s.label === 'BRC Bank' ? 'drop-shadow(0 6px 8px rgba(15,23,42,.2))' : undefined }}>
            <path d={sector(s.from, s.to, 35, s.r)} fill={s.color} />
            <path d={sector(s.from, s.to, 35, 50)} fill="rgba(15,23,42,.14)" />
          </g>
        ))}
      </svg>
      <ul className="legend2">{bankSlices.map(s => <li key={s.label}><i style={{ background: s.color }} />{s.label}</li>)}</ul>
    </div>
  )
}

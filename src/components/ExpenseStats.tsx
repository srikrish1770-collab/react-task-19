import { expenses } from '../data'
const C = 150, R = 118, GAP = 8
const pt = (a: number, r: number, ox = 0, oy = 0) => [C + ox + r * Math.sin(a), C + oy - r * Math.cos(a)]
export default function ExpenseStats() {
  let start = (-0.3 * 180) * Math.PI / 180
  return (
    <div className="card pie-card">
      <svg viewBox="0 0 300 300" role="img" aria-label="Expense statistics">
        {expenses.map((e, i) => {
          const a0 = start, a1 = a0 + (e.pct / 100) * 2 * Math.PI, mid = (a0 + a1) / 2; start = a1
          const ox = GAP * Math.sin(mid), oy = -GAP * Math.cos(mid)
          const [x0, y0] = pt(a0, R, ox, oy), [x1, y1] = pt(a1, R, ox, oy)
          const [tx, ty] = pt(mid, R * 0.62, ox, oy)
          const dark = e.color.includes('warning') || e.color.includes('secondary')
          return (
            <g key={e.label} className="slice" style={{ animationDelay: `${i * 50}ms` }}>
              <path d={`M${C + ox} ${C + oy}L${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}Z`} fill={e.color} />
              <text x={tx} y={ty - 4} textAnchor="middle" className={`pie-pct${dark ? ' dark' : ''}`}>{e.pct}%</text>
              <text x={tx} y={ty + 12} textAnchor="middle" className={`pie-lbl${dark ? ' dark' : ''}`}>{e.label}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

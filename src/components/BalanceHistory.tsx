import { balance, months } from '../data'
import { useMedia } from '../hooks/useMedia'
import { useSize } from '../hooks/useSize'
const X0 = 50, W = 540, Y0 = 210, H = 200
const curve = (P: number[][]) => P.map((p, i) => {
  if (i === 0) return `M${p[0]} ${p[1]}`
  const a = P[i - 2] ?? P[i - 1], b = P[i - 1], d = P[i + 1] ?? p
  return `C${b[0] + (p[0] - a[0]) / 6} ${b[1] + (p[1] - a[1]) / 6} ${p[0] - (d[0] - b[0]) / 6} ${p[1] - (d[1] - b[1]) / 6} ${p[0]} ${p[1]}`
}).join('')
const P = balance.map((v, i) => [X0 + (W * i) / (balance.length - 1), Y0 - (v / 800) * H])
const smooth = curve(P)
const yTicks = [0, 200, 400, 600, 800]

/** Laptop/tablet + mobile: real-pixel drawing with dashed grid, as in the Figma. */
function Compact({ w, mobile }: { w: number; mobile: boolean }) {
  const L = mobile ? { X0: 52, R: 18, top: 22, lbl: 197, h: 222 } : { X0: 56, R: 20, top: 21, lbl: 196, h: 220 }
  const Hc = 160, pw = w - L.X0 - L.R, y0 = L.top + Hc
  const yy = (v: number) => y0 - (v / 800) * Hc
  const pts = balance.map((v, i) => [L.X0 + (pw * i) / (balance.length - 1), yy(v)])
  const d = curve(pts)
  const lx = (i: number) => L.X0 + pw * (0.02 + (0.8676 * i) / 6)
  return (
    <svg viewBox={`0 0 ${w} ${L.h}`} role="img" aria-label="Balance history">
      <defs><linearGradient id="bh-fill-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F46E5" stopOpacity=".2" /><stop offset="1" stopColor="#4F46E5" stopOpacity="0" /></linearGradient></defs>
      {yTicks.map(v => (
        <g key={v}><text x={L.X0 - 14} y={yy(v) + 4} textAnchor="end" className="ax">{v}</text><line x1={L.X0} x2={L.X0 + pw} y1={yy(v)} y2={yy(v)} className="grid dash" /></g>
      ))}
      {months.map((m, i) => (
        <g key={m}><line x1={lx(i)} x2={lx(i)} y1={L.top} y2={y0} className="grid dash" /><text x={lx(i)} y={L.lbl} textAnchor="middle" className="ax">{m}</text></g>
      ))}
      <path className="area" d={`${d}L${L.X0 + pw} ${y0}L${L.X0} ${y0}Z`} fill="url(#bh-fill-c)" />
      <path className="line" d={d} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" pathLength={1} />
    </svg>
  )
}

export default function BalanceHistory() {
  const compact = useMedia('(max-width:1100px)')
  const mobile = useMedia('(max-width:768px)')
  const [ref, { w }] = useSize<HTMLDivElement>()
  return (
    <div ref={ref} className="card chart-card bh">
      {compact ? (
        w > 0 && <Compact w={w} mobile={mobile} />
      ) : (
        <svg viewBox="0 0 620 250" role="img" aria-label="Balance history">
          <defs><linearGradient id="bh-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4F46E5" stopOpacity=".2" /><stop offset="1" stopColor="#4F46E5" stopOpacity="0" /></linearGradient></defs>
          {yTicks.map(v => { const yy = Y0 - (v / 800) * H; return <g key={v}><text x="34" y={yy + 4} textAnchor="end" className="ax">{v}</text><line x1={X0} x2={X0 + W} y1={yy} y2={yy} className="grid" /></g> })}
          {months.map((m, i) => <text key={m} x={X0 + (W * i) / 6} y="234" textAnchor="middle" className="ax">{m}</text>)}
          <path className="area" d={`${smooth}L${X0 + W} ${Y0}L${X0} ${Y0}Z`} fill="url(#bh-fill)" />
          <path className="line" d={smooth} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" pathLength={1} />
        </svg>
      )}
    </div>
  )
}

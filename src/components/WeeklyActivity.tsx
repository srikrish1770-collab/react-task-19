import { weekly } from '../data'
import { useMedia } from '../hooks/useMedia'
import { useSize } from '../hooks/useSize'
const X0 = 60, W = 630, Y0 = 260, H = 200, gw = W / 7
const y = (v: number) => Y0 - (v / 500) * H
const ticks = [0, 100, 200, 300, 400, 500]

/** Laptop/tablet + mobile: drawn in real pixels so axis text stays readable instead of scaling down with the viewBox. */
function Compact({ w, mobile }: { w: number; mobile: boolean }) {
  const P = mobile
    ? { X0: 45, R: 8, top: 40, H: 166, lbl: 229, h: 257, bw: 7, gap: 5 }
    : { X0: 49, R: 25, top: 48, H: 164, lbl: 236, h: 260, bw: 12, gap: 6 }
  const pw = w - P.X0 - P.R, pitch = pw / 7
  const yy = (v: number) => P.top + P.H - (v / 500) * P.H
  return (
    <svg viewBox={`0 0 ${w} ${P.h}`} role="img" aria-label="Weekly deposits and withdrawals">
      {ticks.map(v => (
        <g key={v}><text x={P.X0 - 5} y={yy(v) + 4} textAnchor="end" className="ax">{v}</text><line x1={P.X0} x2={P.X0 + pw} y1={yy(v)} y2={yy(v)} className="grid" /></g>
      ))}
      {weekly.map((d, i) => {
        const cx = P.X0 + pitch * i + pitch / 2, r = P.bw / 2
        return (
          <g key={d.d}>
            <rect className="bar" x={cx - P.gap / 2 - P.bw} y={yy(d.wd)} width={P.bw} height={yy(0) - yy(d.wd)} rx={r} fill="var(--primary)" style={{ animationDelay: `${i * 30}ms` }} />
            <rect className="bar" x={cx + P.gap / 2} y={yy(d.dep)} width={P.bw} height={yy(0) - yy(d.dep)} rx={r} fill="var(--secondary)" style={{ animationDelay: `${i * 30 + 50}ms` }} />
            <text x={cx} y={P.lbl} textAnchor="middle" className="ax">{d.d}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function WeeklyActivity() {
  const compact = useMedia('(max-width:1100px)')
  const mobile = useMedia('(max-width:768px)')
  const [ref, { w }] = useSize<HTMLDivElement>()
  return (
    <div ref={ref} className="card chart-card wk">
      <div className="legend"><span><i style={{ background: 'var(--secondary)' }} />Diposit</span><span><i style={{ background: 'var(--primary)' }} />Withdraw</span></div>
      {compact ? (
        w > 0 && <Compact w={w} mobile={mobile} />
      ) : (
        <svg viewBox="0 0 700 300" role="img" aria-label="Weekly deposits and withdrawals">
          {ticks.map(v => (
            <g key={v}><text x="34" y={y(v) + 4} textAnchor="end" className="ax">{v}</text><line x1={X0} x2={X0 + W} y1={y(v)} y2={y(v)} className="grid" /></g>
          ))}
          {weekly.map((d, i) => {
            const cx = X0 + gw * i + gw / 2
            return (
              <g key={d.d}>
                <rect className="bar" x={cx - 18} y={y(d.wd)} width="15" height={Y0 - y(d.wd)} rx="7.5" fill="var(--primary)" style={{ animationDelay: `${i * 30}ms` }} />
                <rect className="bar" x={cx + 3} y={y(d.dep)} width="15" height={Y0 - y(d.dep)} rx="7.5" fill="var(--secondary)" style={{ animationDelay: `${i * 30 + 50}ms` }} />
                <text x={cx} y="289" textAnchor="middle" className="ax">{d.d}</text>
              </g>
            )
          })}
        </svg>
      )}
    </div>
  )
}

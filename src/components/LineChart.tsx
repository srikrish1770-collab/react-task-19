import { useSize } from '../hooks/useSize'
interface Props { values: number[]; color: string; labels: string[]; dots?: boolean; smooth?: boolean; label: string }
const curve = (P: number[][]) => P.map((p, i) => {
  if (i === 0) return `M${p[0]} ${p[1]}`
  const a = P[i - 2] ?? P[i - 1], b = P[i - 1], d = P[i + 1] ?? p
  return `C${b[0] + (p[0] - a[0]) / 6} ${b[1] + (p[1] - a[1]) / 6} ${p[0] - (d[0] - b[0]) / 6} ${p[1] - (d[1] - b[1]) / 6} ${p[0]} ${p[1]}`
}).join('')
export default function LineChart({ values, color, labels, dots = false, smooth = false, label }: Props) {
  const [ref, { w, h }] = useSize<HTMLDivElement>()
  const wide = w > 500, L = wide ? 90 : 76, R = wide ? 30 : 20, T = wide ? 40 : 26, B = wide ? 52 : 44
  const gw = w - L - R, gh = h - T - B, fs = wide ? 13 : 12
  const y = (v: number) => T + gh - (v / 40000) * gh
  const lx = (i: number) => L + gw * (0.045 + (0.885 * i) / (labels.length - 1))
  const pts = values.map((v, i) => [dots ? lx(i) : L + (gw * i) / (values.length - 1), y(v)])
  const d = smooth ? curve(pts) : pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join('')
  return (
    <div ref={ref} className="card lc">
      {w > 0 && (
        <svg width={w} height={h} role="img" aria-label={label}>
          {[0, 1, 2, 3, 4].map(k => (
            <g key={k}>
              <text x={L - 9} y={y(k * 10000) + 4} textAnchor="end" className="ax" style={{ fontSize: fs }}>${(k * 10000).toLocaleString('en-US')}</text>
              <line x1={L} x2={L + gw} y1={y(k * 10000)} y2={y(k * 10000)} className="grid gl" />
            </g>
          ))}
          {labels.map((t, i) => <text key={t} x={lx(i)} y={T + gh + 20} textAnchor="middle" className="ax" style={{ fontSize: fs }}>{t}</text>)}
          <path className="line" d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
          {dots && pts.map((p, i) => <circle key={i} className="dotp" cx={p[0]} cy={p[1]} r="5" fill="#fff" stroke={color} strokeWidth="3" />)}
        </svg>
      )}
    </div>
  )
}

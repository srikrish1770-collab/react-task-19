import { useCountUp } from '../hooks/useCountUp'
interface Props { label: string; value: number; icon: string; scale: number; format: (n: number) => string }
export default function StatisticsCard({ label, value, icon, scale, format }: Props) {
  const n = useCountUp(Math.round(value * scale))
  return <div className="card stat"><img src={icon} alt="" /><div><small>{label}</small><b>{format(n / scale)}</b></div></div>
}

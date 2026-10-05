import { useCountUp } from '../hooks/useCountUp'
export default function StatsCard({ label, value, icon }: { label: string; value: number; icon: string }) {
  const n = useCountUp(value)
  return (
    <div className="card stat"><img src={icon} alt="" /><div><small>{label}</small><b>${n.toLocaleString('en-US')}</b></div></div>
  )
}

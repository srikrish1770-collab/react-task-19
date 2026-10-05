import { useCountUp } from '../hooks/useCountUp'
export default function LoanSummaryCard({ label, value, icon }: { label: string; value: number | string; icon: string }) {
  const n = useCountUp(typeof value === 'number' ? value : 0)
  return (
    <div className="card stat">
      <img src={icon} alt="" />
      <div><small>{label}</small><b>{typeof value === 'number' ? `$${n.toLocaleString('en-US')}` : value}</b></div>
    </div>
  )
}

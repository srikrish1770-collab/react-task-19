import { lastTx } from '../data/accounts'
import TileIcon from './TileIcon'
import StatusBadge from './StatusBadge'
export default function LastTransactions() {
  return (
    <div className="card ltx">
      {lastTx.map(t => (
        <div className="ltx-row" key={t.title}>
          <TileIcon tile={t.tile} />
          <div><b>{t.title}</b><small>{t.date}</small></div>
          <span className="hm">{t.type}</span><span className="hm">{t.card}</span><span className="hm">{t.status}</span>
          <StatusBadge amount={t.amount} />
        </div>
      ))}
    </div>
  )
}

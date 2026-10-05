import { invoices } from '../data/accounts'
import TileIcon from './TileIcon'
export default function InvoiceList() {
  return (
    <div className="card inv">
      {invoices.map(v => (
        <div className="inv-row" key={v.name}>
          <TileIcon tile={v.tile} />
          <div><b>{v.name}</b><small>{v.ago}</small></div>
          <span className="inv-price">{v.price}</span>
        </div>
      ))}
    </div>
  )
}

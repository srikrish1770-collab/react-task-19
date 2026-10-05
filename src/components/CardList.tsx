import { useState } from 'react'
import { cardList } from '../data/creditCards'
import Modal from './Modal'
export default function CardList() {
  const [sel, setSel] = useState<typeof cardList[number] | null>(null)
  return (
    <div className="cl">
      {cardList.map(c => (
        <div className="card cl-row" key={c.bank}>
          <span className="tile" style={{ backgroundImage: `url(${c.bg})` }}><img className="tile-fg" src={c.fg} alt="" /></span>
          <div><b>Card Type</b><small>Secondary</small></div>
          <div><b>Bank</b><small>{c.bank}</small></div>
          <div className="hm"><b>Card Number</b><small>{c.number}</small></div>
          <div className="hm"><b>Namain Card</b><small>{c.holder}</small></div>
          <button type="button" className="cl-link" onClick={() => setSel(c)} aria-label={`View details for ${c.bank} card`}>View Details</button>
        </div>
      ))}
      {sel && (
        <Modal title={`${sel.bank} card`} onClose={() => setSel(null)} footer={<button type="button" className="btn" onClick={() => setSel(null)}>Done</button>}>
          <dl className="kv">
            <div><dt>Card type</dt><dd>Secondary</dd></div><div><dt>Bank</dt><dd>{sel.bank}</dd></div>
            <div><dt>Card number</dt><dd>{sel.number}</dd></div><div><dt>Card holder</dt><dd>{sel.holder}</dd></div>
          </dl>
        </Modal>
      )}
    </div>
  )
}

import { accBars } from '../data/accounts'
const MAX = 234
export default function DebitCreditChart() {
  return (
    <div className="card dcc">
      <div className="dcc-head">
        <span className="txt"><b>$7,560</b> Debited &amp; <b>$5,420</b> Credited in this Week</span>
        <span className="lg"><i style={{ background: 'var(--primary)' }} />Debit<i style={{ background: 'var(--warning)' }} />Credit</span>
      </div>
      <div className="dcc-plot" role="img" aria-label="Debit and credit overview for the week">
        {accBars.map((b, i) => (
          <div className="dgrp" key={b.d}>
            <div className="dbars">
              <i className="dbar" style={{ height: `${(b.debit / MAX) * 100}%`, background: 'var(--primary)', animationDelay: `${i * 30}ms` }} />
              <i className="dbar" style={{ height: `${(b.credit / MAX) * 100}%`, background: 'var(--warning)', animationDelay: `${i * 30 + 40}ms` }} />
            </div>
            <small>{b.d}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

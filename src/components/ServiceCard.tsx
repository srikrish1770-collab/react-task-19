import { useState, type CSSProperties } from 'react'
import { serviceColumns, serviceDescription, type ServiceTile } from '../data/services'
import { useToast } from '../context/ToastContext'
import Modal from './Modal'

interface Props { name: string; tile: ServiceTile; index: number; active?: boolean }
export default function ServiceCard({ name, tile, index, active = false }: Props) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  return (
    <div className="card svc-row" style={{ '--i': index } as CSSProperties}>
      {tile.src
        ? <img className="tile" src={tile.src} alt="" />
        : <span className="tile" style={{ backgroundImage: `url(${tile.bg})` }}><img className="tile-fg" src={tile.fg} alt="" /></span>}
      <div><b>{name}</b><small>{serviceDescription}</small></div>
      {serviceColumns.map(c => <div className="hm" key={c.id}><b>{c.title}</b><small>{c.sub}</small></div>)}
      <button type="button" className={active ? 'vd on' : 'vd'} onClick={() => setOpen(true)} aria-label={`View details for ${name}`}>View Details</button>
      {open && (
        <Modal title={name} onClose={() => setOpen(false)}
          footer={<><button type="button" className="btn ghost" onClick={() => setOpen(false)}>Close</button>
            <button type="button" className="btn" onClick={() => { setOpen(false); toast(`Request for ${name} sent. We’ll be in touch soon.`) }}>Apply now</button></>}>
          <p className="modal-text">{serviceDescription} fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
          <dl className="kv">{serviceColumns.map(c => <div key={c.id}><dt>{c.title}</dt><dd>{c.sub}</dd></div>)}</dl>
        </Modal>
      )}
    </div>
  )
}

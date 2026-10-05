export default function ServiceCategory({ title, sub, icon }: { title: string; sub: string; icon: string }) {
  return (
    <div className="card svc-cat"><img src={icon} alt="" /><div><b>{title}</b><small>{sub}</small></div></div>
  )
}

import Section from '../components/Section'
import ServiceCategory from '../components/ServiceCategory'
import ServiceCard from '../components/ServiceCard'
import { serviceCategories, serviceList, highlightedService } from '../data/services'

export default function ServicesPage() {
  return (
    <div className="dash acc">
      <div className="svc-top">{serviceCategories.map(c => <ServiceCategory key={c.title} {...c} />)}</div>
      <Section title="Bank Services List">
        <div className="svc-list">
          {serviceList.map((s, i) => <ServiceCard key={i} index={i} active={i === highlightedService} {...s} />)}
        </div>
      </Section>
    </div>
  )
}

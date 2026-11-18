import VariationBadge from './VariationBadge'
import './KpiCard.scss'

interface KpiCardProps {
  label: string
  value: string
  hint: string
  variation: number | null
}

export default function KpiCard({ label, value, hint, variation }: KpiCardProps) {
  return (
    <article className="kpi-card">
      <div className="kpi-card__header">
        <h2 className="kpi-card__label">{label}</h2>
        <VariationBadge variation={variation} />
      </div>
      <p className="kpi-card__value">{value}</p>
      <p className="kpi-card__hint">{hint}</p>
    </article>
  )
}

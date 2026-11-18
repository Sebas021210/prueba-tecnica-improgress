import Icon from '@/components/Icon/Icon'
import { formatVariation } from '@/lib/format'
import './VariationBadge.scss'

interface VariationBadgeProps {
  variation: number | null
}

// No previous month to compare against (e.g. the first month): nothing to show.
export default function VariationBadge({ variation }: VariationBadgeProps) {
  if (variation === null) return null

  const up = variation >= 0

  return (
    <span className={`variation-badge variation-badge--${up ? 'up' : 'down'}`}>
      <Icon name={up ? 'trending-up' : 'trending-down'} />
      {formatVariation(variation)}
      <span className="visually-hidden"> respecto al mes anterior</span>
    </span>
  )
}

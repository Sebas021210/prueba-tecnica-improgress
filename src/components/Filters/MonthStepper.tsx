import Icon from '@/components/Icon/Icon'
import type { MesItem } from '@/types/dashboard'

interface MonthStepperProps {
  meses: MesItem[]
  value: string
  onChange: (id: string) => void
}

export default function MonthStepper({ meses, value, onChange }: MonthStepperProps) {
  const index = meses.findIndex((m) => m.id === value)
  const current = meses[index]
  const prev = meses[index - 1]
  const next = meses[index + 1]

  return (
    <div className="month-stepper" role="group" aria-label="Mes">
      <button
        type="button"
        className="month-stepper__button"
        aria-label="Mes anterior"
        disabled={!prev}
        onClick={() => prev && onChange(prev.id)}
      >
        <Icon name="chevron-left" />
      </button>
      <span className="month-stepper__label" aria-live="polite" title={current?.nombre}>
        {current?.nombre.replace(/\s+\d{4}$/, '')}
      </span>
      <button
        type="button"
        className="month-stepper__button"
        aria-label="Mes siguiente"
        disabled={!next}
        onClick={() => next && onChange(next.id)}
      >
        <Icon name="chevron-right" />
      </button>
    </div>
  )
}

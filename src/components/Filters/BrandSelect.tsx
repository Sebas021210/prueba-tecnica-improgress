import type { ChangeEvent } from 'react'
import Icon from '@/components/Icon/Icon'
import type { FiltroItem } from '@/types/dashboard'

interface BrandSelectProps {
  options: FiltroItem[]
  value: string
  onChange: (id: string) => void
}

export default function BrandSelect({ options, value, onChange }: BrandSelectProps) {
  const current = options.find((o) => o.id === value)

  return (
    <div className="brand-select">
      <h1 className="brand-select__title">{current?.nombre}</h1>
      <span className="brand-select__chevron">
        <Icon name="chevron-down" />
      </span>
      <select
        className="brand-select__native"
        aria-label="Marca"
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nombre}
          </option>
        ))}
      </select>
    </div>
  )
}

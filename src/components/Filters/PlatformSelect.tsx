import { useId } from 'react'
import type { ChangeEvent } from 'react'
import Icon from '@/components/Icon/Icon'
import type { FiltroItem } from '@/types/dashboard'

interface PlatformSelectProps {
  options: FiltroItem[]
  value: string
  onChange: (id: string) => void
}

export default function PlatformSelect({ options, value, onChange }: PlatformSelectProps) {
  const id = useId()

  return (
    <div className="platform-select">
      <label className="platform-select__label" htmlFor={id}>
        Plataforma
      </label>
      <div className="platform-select__control">
        <select
          id={id}
          className="platform-select__native"
          value={value}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nombre}
            </option>
          ))}
        </select>
        <span className="platform-select__chevron">
          <Icon name="chevron-down" />
        </span>
      </div>
    </div>
  )
}

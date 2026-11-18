import BrandSelect from './BrandSelect'
import MonthStepper from './MonthStepper'
import PlatformSelect from './PlatformSelect'
import type { Filtros } from '@/types/dashboard'
import type { DashboardFilters } from '@/types/view'
import './Filters.scss'

interface FiltersBarProps {
  opciones: Filtros
  filters: DashboardFilters
  onMarcaChange: (id: string) => void
  onPlataformaChange: (id: string) => void
  onMesChange: (id: string) => void
}

export default function FiltersBar({
  opciones,
  filters,
  onMarcaChange,
  onPlataformaChange,
  onMesChange,
}: FiltersBarProps) {
  return (
    <div className="filters-bar">
      <BrandSelect options={opciones.marcas} value={filters.marca} onChange={onMarcaChange} />
      <div className="filters-bar__controls">
        <MonthStepper meses={opciones.meses} value={filters.mes} onChange={onMesChange} />
        <PlatformSelect
          options={opciones.plataformas}
          value={filters.plataforma}
          onChange={onPlataformaChange}
        />
      </div>
    </div>
  )
}

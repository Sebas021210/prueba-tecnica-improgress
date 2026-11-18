import EmptyState from '@/components/EmptyState/EmptyState'
import FiltersBar from '@/components/Filters/FiltersBar'
import KpiRow from '@/components/Kpi/KpiRow'
import PageState from '@/components/PageState/PageState'
import Topbar from '@/components/Topbar/Topbar'
import { useDashboard } from '@/hooks/useDashboard'
import './App.scss'

export default function App() {
  const { loading, error, reload, meta, opciones, filters, setMarca, setPlataforma, setMes, view } =
    useDashboard()

  if (loading) return <PageState kind="loading" message="Cargando datos..." />
  if (error || !meta || !opciones || !view) {
    return <PageState kind="error" message="Error al cargar la data." onRetry={reload} />
  }

  return (
    <div className="app">
      <Topbar cliente={meta.cliente} moneda={meta.moneda} presupuestoTotal={meta.presupuestoTotal} />
      <div className="app__body">
        <FiltersBar
          opciones={opciones}
          filters={filters}
          onMarcaChange={setMarca}
          onPlataformaChange={setPlataforma}
          onMesChange={setMes}
        />
        {view.isEmpty ? (
          <EmptyState message="No hay datos para los filtros seleccionados." />
        ) : (
          <KpiRow kpis={view.kpis} />
        )}
      </div>
    </div>
  )
}

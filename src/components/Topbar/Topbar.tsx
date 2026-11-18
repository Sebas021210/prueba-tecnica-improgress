import { formatInteger } from '@/lib/format'
import './Topbar.scss'

interface TopbarProps {
  cliente: string
  moneda: string
  presupuestoTotal: number
}

export default function Topbar({ cliente, moneda, presupuestoTotal }: TopbarProps) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <svg className="topbar__logo" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="3" />
          <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="3" />
        </svg>
        <span className="topbar__name">{cliente}</span>
      </div>
      <p className="topbar__budget">
        Presupuesto Total:{' '}
        <strong className="topbar__budget-value">
          {moneda} {formatInteger(presupuestoTotal)}
        </strong>
      </p>
    </header>
  )
}

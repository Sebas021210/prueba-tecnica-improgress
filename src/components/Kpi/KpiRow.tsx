import KpiCard from './KpiCard'
import { formatCurrency, formatCurrencyCents, formatInteger, formatPercent } from '@/lib/format'
import type { Kpis } from '@/types/view'
import './KpiRow.scss'

interface KpiRowProps {
  kpis: Kpis
}

export default function KpiRow({ kpis }: KpiRowProps) {
  const { inversion, mensajes, ctr, conversaciones } = kpis

  return (
    <section className="kpi-row" aria-label="Indicadores principales">
      <KpiCard
        label="Inversión ejecutada"
        value={formatCurrency(inversion.value)}
        hint={`de ${formatCurrency(inversion.plan)} (${formatPercent(inversion.progress)})`}
        variation={inversion.variation}
      />
      <KpiCard
        label="Mensajes del mes"
        value={formatInteger(mensajes.value)}
        hint={`Precio/conv ${formatCurrencyCents(mensajes.costoPorConversacion)}`}
        variation={mensajes.variation}
      />
      <KpiCard
        label="CTR promedio"
        value={formatPercent(ctr.value)}
        hint="Clics sobre impresiones"
        variation={ctr.variation}
      />
      <KpiCard
        label="Conversaciones WhatsApp"
        value={formatInteger(conversaciones.value)}
        hint="iniciadas"
        variation={conversaciones.variation}
      />
    </section>
  )
}

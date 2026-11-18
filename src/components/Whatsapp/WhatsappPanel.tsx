import Panel from '@/components/Panel/Panel'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import StatBox from '@/components/StatBox/StatBox'
import { formatInteger, formatPercent } from '@/lib/format'
import type { Audiencia, ConversionCanal } from '@/types/dashboard'
import './WhatsappPanel.scss'

interface WhatsappPanelProps {
  audiencia: Audiencia
  conversionPorCanal: ConversionCanal[]
}

export default function WhatsappPanel({ audiencia, conversionPorCanal }: WhatsappPanelProps) {
  // Bars are relative to the best channel, so the leader always fills the track.
  const max = Math.max(...conversionPorCanal.map((c) => c.valor), 0)

  return (
    <Panel title="WhatsApp & Conversión">
      <div className="whatsapp__audience">
        <StatBox label="Hombres" value={formatPercent(audiencia.hombres, 0)} />
        <StatBox label="Mujeres" value={formatPercent(audiencia.mujeres, 0)} />
      </div>
      <h3 className="whatsapp__subtitle">Conversión por canal</h3>
      <ul className="whatsapp__list">
        {conversionPorCanal.map((canal) => (
          <li key={canal.canal}>
            <div className="whatsapp__row">
              <span className="whatsapp__name">{canal.canal}</span>
              <strong className="whatsapp__value">{formatInteger(canal.valor)}</strong>
            </div>
            <ProgressBar value={max === 0 ? 0 : canal.valor / max} />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

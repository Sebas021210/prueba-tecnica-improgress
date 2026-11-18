import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import Panel from '@/components/Panel/Panel'
import StatBox from '@/components/StatBox/StatBox'
import { formatInteger, formatPercent } from '@/lib/format'
import type { Pacing } from '@/types/dashboard'
import './PacingPanel.scss'

interface PacingPanelProps {
  pacing: Pacing
}

export default function PacingPanel({ pacing }: PacingPanelProps) {
  const { meta, actual, faltan } = pacing
  const progress = meta === 0 ? 0 : actual / meta
  const percent = formatPercent(progress, 0)
  const slices = [
    { name: 'Actual', value: actual, className: 'pacing__slice--done' },
    { name: 'Faltan', value: Math.max(meta - actual, 0), className: 'pacing__slice--rest' },
  ]

  return (
    <Panel title="Meta & Pacing">
      <div className="pacing__body">
        <div className="pacing__stats">
          <StatBox label="Meta" value={formatInteger(meta)} />
          <StatBox label="Actual" value={formatInteger(actual)} />
          <StatBox label="Faltan" value={formatInteger(faltan)} />
        </div>
        <div
          className="pacing__donut"
          role="img"
          aria-label={`${percent} de la meta: ${formatInteger(actual)} de ${formatInteger(meta)}, faltan ${formatInteger(faltan)}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={slices}
                dataKey="value"
                innerRadius="70%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                isAnimationActive={false}
              >
                {slices.map((s) => (
                  <Cell key={s.name} className={s.className} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="pacing__center" aria-hidden="true">
            <strong className="pacing__percent">{percent}</strong>
            <span className="pacing__caption">de la meta</span>
          </p>
        </div>
      </div>
    </Panel>
  )
}

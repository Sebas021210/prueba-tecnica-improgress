import { useState } from 'react'
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import Panel from '@/components/Panel/Panel'
import { formatCompact, formatInteger } from '@/lib/format'
import type { LeadsMes } from '@/types/view'
import './LeadsChart.scss'

interface LeadsChartProps {
  data: LeadsMes[]
}

// Number of blue shades defined in LeadsChart.scss (light to dark).
const BAR_SHADES = 6
// Matches $radius-icon-button; recharts needs a number, not a Sass variable.
const BAR_RADIUS = 4
// Room above the tallest bar for its value label.
const CHART_MARGIN = { top: 24, right: 0, bottom: 0, left: 0 }

// Must tolerate empty data: JSX props are evaluated even while loading.
function summarize(data: LeadsMes[]): string {
  if (data.length === 0) return 'Sin datos de leads'
  const parts = data.map((d) => `${d.corto} ${formatInteger(d.leads)}`)
  const selected = data.find((d) => d.selected)
  return `Leads por mes: ${parts.join(', ')}.${selected ? ` Mes seleccionado: ${selected.corto}.` : ''}`
}

export default function LeadsChart({ data }: LeadsChartProps) {
  const [showTable, setShowTable] = useState(false)

  return (
    <Panel
      title="Leads Mensuales"
      subtitle={`Últimos ${data.length} meses`}
      actions={
        <button
          type="button"
          className="leads-chart__toggle"
          aria-pressed={showTable}
          onClick={() => setShowTable((v) => !v)}
        >
          {showTable ? 'Ver gráfico' : 'Ver tabla'}
        </button>
      }
    >
      {showTable ? (
        <table className="leads-chart__table">
          <thead>
            <tr>
              <th scope="col">Mes</th>
              <th scope="col">Leads</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.mes}>
                <th scope="row">{d.corto}</th>
                <td>{formatInteger(d.leads)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="leads-chart__plot" role="img" aria-label={summarize(data)}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={CHART_MARGIN}>
              <XAxis dataKey="corto" axisLine={false} tickLine={false} />
              <Tooltip
                cursor={false}
                formatter={(value: number | string) => [formatInteger(Number(value)), 'Leads']}
              />
              <Bar dataKey="leads" radius={[BAR_RADIUS, BAR_RADIUS, 0, 0]} isAnimationActive={false}>
                {data.map((d, i) => (
                  <Cell
                    key={d.mes}
                    className={`leads-chart__bar leads-chart__bar--${Math.min(i, BAR_SHADES - 1)}${
                      d.selected ? '' : ' leads-chart__bar--dim'
                    }`}
                  />
                ))}
                <LabelList
                  dataKey="leads"
                  position="top"
                  className="leads-chart__value"
                  formatter={(value: number) => formatCompact(value)}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Panel>
  )
}

import Panel from '@/components/Panel/Panel'
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { formatCurrency, formatPercent } from '@/lib/format'
import type { MixItem } from '@/types/view'
import './InvestmentMix.scss'

interface InvestmentMixProps {
  items: MixItem[]
}

export default function InvestmentMix({ items }: InvestmentMixProps) {
  return (
    <Panel title="Mix de inversión digital">
      <div className="mix__head" aria-hidden="true">
        <span>Canal</span>
        <span>Inversión</span>
        <span>% Total</span>
      </div>
      <ul className="mix__list">
        {items.map((item) => (
          <li className="mix__item" key={item.plataforma}>
            <div className="mix__row">
              <span className="mix__name">{item.nombre}</span>
              <span className="mix__figures">
                <span className="mix__amount">
                  <span className="visually-hidden">Inversión </span>
                  {formatCurrency(item.inversion)}
                </span>
                <strong className="mix__share">
                  {formatPercent(item.share, 0)}
                  <span className="visually-hidden"> del total</span>
                </strong>
              </span>
            </div>
            <ProgressBar value={item.share} />
          </li>
        ))}
      </ul>
    </Panel>
  )
}

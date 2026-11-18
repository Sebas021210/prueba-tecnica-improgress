import { useId } from 'react'
import type { ReactNode } from 'react'
import './Panel.scss'

interface PanelProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export default function Panel({ title, subtitle, actions, children }: PanelProps) {
  const titleId = useId()

  return (
    <section className="panel" aria-labelledby={titleId}>
      <header className="panel__header">
        <h2 className="panel__title" id={titleId}>
          {title}
        </h2>
        {subtitle && <span className="panel__subtitle">{subtitle}</span>}
        {actions && <div className="panel__actions">{actions}</div>}
      </header>
      {children}
    </section>
  )
}

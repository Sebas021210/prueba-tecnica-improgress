import './StatBox.scss'

interface StatBoxProps {
  label: string
  value: string
}

export default function StatBox({ label, value }: StatBoxProps) {
  return (
    <div className="stat-box">
      <span className="stat-box__label">{label}</span>
      <strong className="stat-box__value">{value}</strong>
    </div>
  )
}

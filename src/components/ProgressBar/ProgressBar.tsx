import './ProgressBar.scss'

interface ProgressBarProps {
  // Fraction between 0 and 1.
  value: number
}

// Decorative: the figure it represents is always printed next to it as text.
export default function ProgressBar({ value }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 1)

  return (
    <div className="progress-bar" aria-hidden="true">
      <div className="progress-bar__fill" style={{ width: `${clamped * 100}%` }} />
    </div>
  )
}

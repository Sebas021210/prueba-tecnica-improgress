import './EmptyState.scss'

interface EmptyStateProps {
  message: string
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__message">{message}</p>
    </div>
  )
}

import './PageState.scss'

interface PageStateProps {
  kind: 'loading' | 'error'
  message: string
  onRetry?: () => void
}

export default function PageState({ kind, message, onRetry }: PageStateProps) {
  return (
    <div className="page-state" role={kind === 'error' ? 'alert' : 'status'}>
      <p className="page-state__message">{message}</p>
      {onRetry && (
        <button type="button" className="page-state__retry" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  )
}

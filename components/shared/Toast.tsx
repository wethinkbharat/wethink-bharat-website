'use client'

interface Props {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: Props) {
  return (
    <div style={{
      position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 2000,
      background: '#340F05', border: '1px solid rgba(222,192,120,0.3)',
      borderRadius: '12px', padding: '16px 24px',
      display: 'flex', alignItems: 'center', gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      maxWidth: '480px',
    }}>
      <span style={{ fontSize: '18px' }}>✓</span>
      <p style={{ fontSize: '15px', fontWeight: 500, color: '#F5EEE2', flex: 1, margin: 0 }}>{message}</p>
      <button
        onClick={onDismiss}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(224,206,189,0.6)', padding: '4px', fontSize: '18px', lineHeight: 1 }}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

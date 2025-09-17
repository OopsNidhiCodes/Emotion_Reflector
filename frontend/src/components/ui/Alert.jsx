import { useState, useEffect } from 'react'

function Alert({ 
  type = 'info', 
  message, 
  onClose, 
  className = '',
  autoClose = false,
  duration = 5000 
}) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => onClose?.(), 300) // Wait for fade out animation
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [autoClose, duration, onClose])

  if (!visible) return null

  const typeClasses = {
    error: 'error-message',
    warning: 'warning-message', 
    success: 'success-message',
    info: 'info-message'
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose?.(), 300)
  }

  return (
    <div 
      className={`${typeClasses[type]} ${className} ${!visible ? 'alert-fade-out' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="alert-content">{message}</span>
      {onClose && (
        <button 
          onClick={handleClose}
          className="alert-close-btn"
          aria-label="Close alert"
          type="button"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
}

export default Alert
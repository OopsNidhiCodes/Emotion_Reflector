function LoadingSpinner({ 
  type = 'pulse', 
  size = 'medium', 
  message = 'Loading...', 
  className = '' 
}) {
  const sizeClasses = {
    small: 'loading-small',
    medium: 'loading-medium', 
    large: 'loading-large'
  }

  const renderSpinner = () => {
    switch (type) {
      case 'dots':
        return (
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        )
      case 'thinking':
        return (
          <div className="thinking-animation">
            <div className="thinking-bubble"></div>
            <div className="thinking-bubble"></div>
            <div className="thinking-bubble"></div>
          </div>
        )
      case 'pulse':
      default:
        return <div className="loading-pulse"></div>
    }
  }

  return (
    <div 
      className={`loading-spinner ${sizeClasses[size]} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div aria-hidden="true">
        {renderSpinner()}
      </div>
      {message && (
        <div className="loading-message">
          {message}
          <span className="sr-only">Please wait</span>
        </div>
      )}
    </div>
  )
}

export default LoadingSpinner
import { useState, forwardRef, useEffect } from "react"

const EnhancedTextarea = forwardRef(({ 
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  success = false,
  className = "",
  animatedPlaceholder = false,
  autoResize = false,
  maxHeight = 200,
  rows = 3,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(value))

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleChange = (e) => {
    setHasValue(Boolean(e.target.value))
    
    // Auto-resize functionality
    if (autoResize && ref?.current) {
      const textarea = ref.current
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, maxHeight)
      textarea.style.height = newHeight + 'px'
    }
    
    onChange?.(e)
  }

  // Reset height when value is cleared
  useEffect(() => {
    if (!value && autoResize && ref?.current) {
      ref.current.style.height = 'auto'
    }
  }, [value, autoResize, ref])

  const getTextareaClasses = () => {
    let classes = "enhanced-textarea"
    
    if (isFocused) classes += " enhanced-textarea--focused"
    if (hasValue || value) classes += " enhanced-textarea--has-value"
    if (disabled) classes += " enhanced-textarea--disabled"
    if (error) classes += " enhanced-textarea--error"
    if (success) classes += " enhanced-textarea--success"
    if (className) classes += ` ${className}`
    
    return classes
  }

  return (
    <div className="enhanced-textarea-wrapper">
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        rows={rows}
        className={getTextareaClasses()}
        placeholder={animatedPlaceholder ? "" : placeholder}
        {...props}
      />
      {animatedPlaceholder && (
        <label className={`enhanced-textarea-label ${isFocused || hasValue || value ? 'enhanced-textarea-label--active' : ''}`}>
          {placeholder}
        </label>
      )}
    </div>
  )
})

EnhancedTextarea.displayName = "EnhancedTextarea"

export default EnhancedTextarea
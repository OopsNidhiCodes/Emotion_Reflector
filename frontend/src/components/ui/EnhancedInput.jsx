import { useState, forwardRef } from "react"

const EnhancedInput = forwardRef(({ 
  type = "text",
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
    onChange?.(e)
  }

  const getInputClasses = () => {
    let classes = "enhanced-input"
    
    if (isFocused) classes += " enhanced-input--focused"
    if (hasValue || value) classes += " enhanced-input--has-value"
    if (disabled) classes += " enhanced-input--disabled"
    if (error) classes += " enhanced-input--error"
    if (success) classes += " enhanced-input--success"
    if (className) classes += ` ${className}`
    
    return classes
  }

  return (
    <div className="enhanced-input-wrapper">
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={getInputClasses()}
        placeholder={animatedPlaceholder ? "" : placeholder}
        {...props}
      />
      {animatedPlaceholder && (
        <label className={`enhanced-input-label ${isFocused || hasValue || value ? 'enhanced-input-label--active' : ''}`}>
          {placeholder}
        </label>
      )}
    </div>
  )
})

EnhancedInput.displayName = "EnhancedInput"

export default EnhancedInput
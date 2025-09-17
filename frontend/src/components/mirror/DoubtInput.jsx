import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import EnhancedTextarea from "../ui/EnhancedTextarea.jsx"
import Button from "../ui/Button.jsx"

function DoubtInput({ value, onChange, onAnalyze, loading }) {
  const navigate = useNavigate()
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAnalyze()
  }

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !loading) {
        onAnalyze()
      }
    }
  }

  const handleMentorClick = () => {
    navigate('/mentor')
  }

  return (
    <form onSubmit={handleSubmit} className="bottom-doubt-input">
      <div className="input-row">
        <Button 
          variant="secondary"
          size="medium"
          onClick={handleMentorClick}
          className="mentor-button-enhanced"
          title="Get guidance from your AI Mentor"
        >
          <span className="mentor-icon">🧠</span>
          <span className="mentor-text">Mentor</span>
        </Button>
        <EnhancedTextarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your doubt or negative thought here... (Press Enter to analyze, Shift+Enter for new line)"
          rows={1}
          className="bottom-textarea"
          disabled={loading}
          autoResize={true}
          maxHeight={120}
          animatedPlaceholder={false}
        />
        <Button 
          type="submit" 
          variant="primary"
          size="medium"
          disabled={!value.trim()} 
          loading={loading}
          className="analyze-button-enhanced"
        >
          Analyze
        </Button>
      </div>
    </form>
  )
}

export default DoubtInput

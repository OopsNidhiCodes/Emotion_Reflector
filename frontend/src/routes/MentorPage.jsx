import { useState } from "react"
import MentorAdvice from "../components/mentor/MentorAdvice.jsx"
import EnhancedTextarea from "../components/ui/EnhancedTextarea.jsx"
import Button from "../components/ui/Button.jsx"
import Alert from "../components/ui/Alert.jsx"
import { geminiService } from "../services/geminiService.js"

function MentorPage() {
  const [question, setQuestion] = useState("")
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAskMentor = async () => {
    if (!question.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Always send both message and context fields
      const response = await geminiService.getMentorAdvice(question, "")
      setAdvice(response)
    } catch (err) {
      setError(err.message || "Failed to get mentor advice")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mentor-page">
      <div className="container">
        <header>
          <h1>AI Mentor</h1>
          <p>Get personalized advice and guidance for your challenges.</p>
        </header>

        <div className="mentor-input">
          <EnhancedTextarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What would you like guidance on?"
            rows={4}
            className="question-input"
            animatedPlaceholder={true}
          />
          <div className="button-container">
            <Button 
              variant="primary"
              size="medium"
              onClick={handleAskMentor} 
              disabled={!question.trim()} 
              loading={loading}
              className="ask-button-enhanced"
            >
              Ask Mentor
            </Button>
          </div>
        </div>

        {error && (
          <Alert 
            type="error" 
            message={`Failed to get advice: ${error}`}
            onClose={() => setError(null)}
          />
        )}

        {advice && <MentorAdvice advice={advice} />}
      </div>
    </div>
  )
}

export default MentorPage

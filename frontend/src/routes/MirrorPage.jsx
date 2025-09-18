import { useState } from "react"
import DoubtInput from "../components/mirror/DoubtInput.jsx"
import MirrorView from "../components/mirror/MirrorView.jsx"
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx"
import Alert from "../components/ui/Alert.jsx"
import { useMirror } from "../hooks/useMirror.js"

function MirrorPage() {
  const [doubt, setDoubt] = useState("")
  const { mirrorResult, loading, error, analyzeDubt, clearResult, clearError } = useMirror()

  const handleAnalyze = async () => {
    if (doubt.trim()) {
      // If you have achievements in state, pass them here; otherwise, use an empty array
      await analyzeDubt(doubt, [])
    }
  }

  return (
    <div className="mirror-page-split">
      {/* Split Screen Layout */}
      <div className="mirror-container">
        {/* Left Side - User Input (Dark Theme) */}
        <div className="mirror-input-side">
          <div className="input-content">
            <h2>Your Thoughts</h2>
            <div className="user-input-display">
              {doubt ? (
                <p className="user-thought">{doubt}</p>
              ) : (
                <p className="placeholder-text">Your doubts will appear here...</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - AI Response (Light Theme) */}
        <div className="mirror-output-side">
          <div className="output-content">
            <h2>Reality Check</h2>
            
            
            
            
            {loading && (
              <div className="mirror-loading">
                <LoadingSpinner 
                  type="thinking" 
                  size="large" 
                  message="Analyzing your thoughts..." 
                />
              </div>
            )}
            {error && (
              <Alert 
                type="error" 
                message={`Analysis failed: ${error}`}
                onClose={clearError}
              />
            )}
            {mirrorResult ? (
              <MirrorView result={mirrorResult} />
            ) : (
              <div className="welcome-message">
                <p>Share your doubts and I'll help you see them clearly.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Input Bar */}
      <div className="bottom-input-bar">
        <DoubtInput 
          value={doubt} 
          onChange={setDoubt} 
          onAnalyze={handleAnalyze} 
          loading={loading} 
        />
      </div>
    </div>
  )
}

export default MirrorPage

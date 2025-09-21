import EvidenceCard from "./EvidenceCard.jsx"

function MirrorView({ result }) {
  if (!result) return null

  // Debug logging
  console.log("MirrorView result:", result)
  console.log("Evidence array:", result.evidence)
  console.log("Evidence length:", result.evidence?.length)

  return (
    <div className="mirror-view">
      <div className="comparison">
        <div className="original-thought slide-in-left">
          <h3>Original Thought</h3>
          <p className="thought-text negative">{result.original}</p>
        </div>

        <div className="corrected-thought slide-in-right animation-delay-200">
          <h3>Reality Check</h3>
          <p className="thought-text positive">{result.corrected}</p>
        </div>
      </div>

      {result.evidence && result.evidence.length > 0 && (
        <div className="evidence-section fade-in-up animation-delay-400">
          <h3>Supporting Evidence</h3>
          <div className="evidence-grid">
            {result.evidence.map((evidence, index) => (
              <div 
                key={index} 
                className={`fade-in-up animation-delay-${Math.min(500 + (index * 100), 800)}`}
              >
                <EvidenceCard evidence={evidence} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remove debug section after confirming it works */}
    </div>
  )
}

export default MirrorView

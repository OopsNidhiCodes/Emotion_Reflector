function EvidenceCard({ evidence }) {
  return (
    <div className="evidence-card">
      <h4>{evidence.title}</h4>
      <p>{evidence.description}</p>
      {evidence.source && (
        <div className="evidence-source">
          <small>Source: {evidence.source}</small>
        </div>
      )}
    </div>
  )
}

export default EvidenceCard

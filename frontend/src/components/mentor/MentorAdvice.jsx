function MentorAdvice({ advice }) {
  if (!advice) return null

  return (
    <div className="mentor-advice">
      <h3>Mentor's Advice</h3>

      <div className="advice-content">
        <div className="advice-text">{advice.advice}</div>

        {advice.actionSteps && advice.actionSteps.length > 0 && (
          <div className="action-steps">
            <h4>Recommended Actions</h4>
            <ul>
              {advice.actionSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {advice.resources && advice.resources.length > 0 && (
          <div className="resources">
            <h4>Additional Resources</h4>
            <ul>
              {advice.resources.map((resource, index) => (
                <li key={index}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MentorAdvice

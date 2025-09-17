import Button from "../ui/Button.jsx"

function AchievementCard({ achievement, onDelete }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp?.seconds * 1000).toLocaleDateString()
  }

  return (
    <div className="achievement-card">
      <div className="achievement-header">
        <h3>{achievement.title}</h3>
        <Button 
          variant="ghost" 
          size="small"
          onClick={onDelete} 
          className="delete-button-enhanced" 
          aria-label="Delete achievement"
        >
          ×
        </Button>
      </div>

      <p className="achievement-description">{achievement.description}</p>

      <div className="achievement-meta">
        <span className="achievement-date">{formatDate(achievement.createdAt)}</span>
        {achievement.category && <span className="achievement-category">{achievement.category}</span>}
      </div>
    </div>
  )
}

export default AchievementCard

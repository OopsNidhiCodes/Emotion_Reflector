import AchievementCard from "../components/memory/AchievementCard.jsx"
import AddAchievementForm from "../components/memory/AddAchievementForm.jsx"
import LoadingSpinner from "../components/ui/LoadingSpinner.jsx"
import Alert from "../components/ui/Alert.jsx"
import { useMemory } from "../hooks/useMemory.js"

function MemoryPage() {
  const { achievements, loading, error, addAchievement, deleteAchievement } = useMemory()

  if (loading) {
    return (
      <div className="memory-page">
        <div className="container">
          <LoadingSpinner 
            type="pulse" 
            size="large" 
            message="Loading your achievements..." 
          />
        </div>
      </div>
    )
  }

  return (
    <div className="memory-page">
      <div className="container">
        <header className="memory-slide-in-left">
          <h1>Memory Palace</h1>
          <p>Store and celebrate your achievements and positive memories.</p>
        </header>

        <div className="memory-fade-in-up animation-delay-200">
          <AddAchievementForm onAdd={addAchievement} />
        </div>

        {error && (
          <div className="fade-in animation-delay-300">
            <Alert 
              type="error" 
              message={`Failed to load achievements: ${error}`}
            />
          </div>
        )}

        <section aria-labelledby="achievements-heading" className="memory-fade-in-up animation-delay-400">
          <h2 id="achievements-heading" className="sr-only">Your Achievements</h2>
          <div className="achievements-grid" role="grid" aria-label="Achievement cards">
            {achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onDelete={() => deleteAchievement(achievement.id)}
              />
            ))}
          </div>
        </section>

        {achievements.length === 0 && !loading && (
          <div className="empty-state memory-fade-in-up animation-delay-500">
            <p>No achievements yet. Add your first one above!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoryPage

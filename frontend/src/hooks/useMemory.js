import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { firestoreService } from "../services/firebaseService.js"

export function useMemory() {
  const { user } = useAuth()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      loadAchievements()
    } else {
      setAchievements([])
      setLoading(false)
    }
  }, [user])

  const loadAchievements = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const userAchievements = await firestoreService.getAchievements(user.uid)
      setAchievements(userAchievements)
    } catch (err) {
      setError(err.message || "Failed to load achievements")
    } finally {
      setLoading(false)
    }
  }

  const addAchievement = async (achievement) => {
    if (!user) throw new Error("User not authenticated")

    try {
      const id = await firestoreService.addAchievement(user.uid, achievement)
      const newAchievement = {
        id,
        ...achievement,
        userId: user.uid,
        createdAt: new Date(),
      }
      setAchievements((prev) => [newAchievement, ...prev])
    } catch (err) {
      setError(err.message || "Failed to add achievement")
      throw err
    }
  }

  const deleteAchievement = async (achievementId) => {
    try {
      await firestoreService.deleteAchievement(achievementId)
      setAchievements((prev) => prev.filter((a) => a.id !== achievementId))
    } catch (err) {
      setError(err.message || "Failed to delete achievement")
      throw err
    }
  }

  return {
    achievements,
    loading,
    error,
    addAchievement,
    deleteAchievement,
    refreshAchievements: loadAchievements,
  }
}

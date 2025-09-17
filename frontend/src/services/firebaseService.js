import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, where } from "firebase/firestore"
import { auth, db } from "../config/firebase.js"

// Re-export auth and db for backward compatibility
export { auth, db }

// Firestore helpers
export const firestoreService = {
  // Achievements
  async getAchievements(userId) {
    try {
      const q = query(collection(db, "achievements"), where("userId", "==", userId), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error getting achievements:", error)
      throw error
    }
  },

  async addAchievement(userId, achievement) {
    try {
      const docRef = await addDoc(collection(db, "achievements"), {
        ...achievement,
        userId,
        createdAt: new Date(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error adding achievement:", error)
      throw error
    }
  },

  async deleteAchievement(achievementId) {
    try {
      await deleteDoc(doc(db, "achievements", achievementId))
    } catch (error) {
      console.error("Error deleting achievement:", error)
      throw error
    }
  },
}

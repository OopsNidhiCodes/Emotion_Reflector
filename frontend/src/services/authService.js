import { auth } from "./firebaseService.js"
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth"

const provider = new GoogleAuthProvider()

export const authService = {
  // Get current user's ID token
  async getIdToken() {
    const user = auth.currentUser
    if (user) {
      return await user.getIdToken()
    }
    return null
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback)
  },
}

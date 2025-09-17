import { useState } from "react"
import { geminiService } from "../services/geminiService.js"

export function useMirror() {
  const [mirrorResult, setMirrorResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeDubt = async (text) => {
    setLoading(true)
    setError(null)

    try {
      const result = await geminiService.analyzeDubt(text)
      setMirrorResult(result)
    } catch (err) {
      setError(err.message || "Failed to analyze doubt")
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setMirrorResult(null)
    setError(null)
  }

  const clearError = () => {
    setError(null)
  }

  return {
    mirrorResult,
    loading,
    error,
    analyzeDubt,
    clearResult,
    clearError,
  }
}

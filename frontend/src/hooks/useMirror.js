import { useState } from "react"
import { geminiService } from "../services/geminiService.js"

export function useMirror() {
  const [mirrorResult, setMirrorResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // achievements can be fetched from state or passed as an argument; here we use an empty array for compatibility
  const analyzeDubt = async (text, achievements = []) => {
    setLoading(true)
    setError(null)

    try {
      const result = await geminiService.analyzeDubt({ text, achievements })
      setMirrorResult(result)
    } catch (err) {
      console.error("Full error object:", err);
      if (err.response) {
        console.error("Axios error response data:", err.response.data);
      }
      let errorMsg = err.message || "Failed to analyze doubt";
      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data.detail)) {
          errorMsg = err.response.data.detail.map(e => e.msg).join(", ");
        } else if (err.response.data.detail) {
          errorMsg = JSON.stringify(err.response.data.detail);
        }
      }
      setError(errorMsg);
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

import apiClient from "./apiClient.js"

export const geminiService = {
  // Mirror endpoint - analyze doubts
  async analyzeDubt(text) {
    try {
      const response = await apiClient.post("/mirror", { text })
      return response.data
    } catch (error) {
      console.error("Error analyzing doubt:", error)
      throw new Error(error.response?.data?.detail || "Failed to analyze doubt")
    }
  },

  // Mentor endpoint - get advice
  async getMentorAdvice(question) {
    try {
      const response = await apiClient.post("/mentor", { question })
      return response.data
    } catch (error) {
      console.error("Error getting mentor advice:", error)
      throw new Error(error.response?.data?.detail || "Failed to get mentor advice")
    }
  },

  // Memory endpoints - if needed for server-side processing
  async processMemory(data) {
    try {
      const response = await apiClient.post("/memory", data)
      return response.data
    } catch (error) {
      console.error("Error processing memory:", error)
      throw new Error(error.response?.data?.detail || "Failed to process memory")
    }
  },
}

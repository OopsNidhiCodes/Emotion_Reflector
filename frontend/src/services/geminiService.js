import apiClient from "./apiClient.js"

export const geminiService = {
  // Mirror endpoint - analyze doubts
  async analyzeDubt({ text, achievements }) {
    try {
      // Temporary hardcoded response for testing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      return {
        original: text,
        corrected: "This is actually a normal feeling, and you're doing better than you think. Everyone has doubts sometimes.",
        evidence: [
          {
            type: "achievement",
            title: "Recent Success",
            description: "You completed your last project successfully and received positive feedback"
          },
          {
            type: "support",
            title: "Support System",
            description: "You have people who believe in you and are willing to help when needed"
          },
          {
            type: "growth",
            title: "Personal Growth",
            description: "You've been consistently improving your skills and learning from experiences"
          },
          {
            type: "perspective",
            title: "Broader View",
            description: "This challenge is temporary and doesn't define your overall capabilities"
          }
        ]
      };
      
      // Uncomment this when backend is ready:
      // const response = await apiClient.post("/api/v1/mirror", { text, achievements })
      // return response.data
    } catch (error) {
      console.error("Error analyzing doubt:", error)
      throw new Error(error.response?.data?.detail || "Failed to analyze doubt")
    }
  },

  // Mentor endpoint - get advice
  async getMentorAdvice(question) {
    try {
        const response = await apiClient.post("/api/v1/mentor/chat", { message: question })
      return response.data
    } catch (error) {
      console.error("Error getting mentor advice:", error)
      throw new Error(error.response?.data?.detail || "Failed to get mentor advice")
    }
  },

  // Memory endpoints - if needed for server-side processing
  async processMemory(data) {
    try {
      const response = await apiClient.post("/api/memory", data)
      return response.data
    } catch (error) {
      console.error("Error processing memory:", error)
      throw new Error(error.response?.data?.detail || "Failed to process memory")
    }
  },
}

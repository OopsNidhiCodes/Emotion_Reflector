export const achievementSchema = {
  title: { type: "string", required: true, maxLength: 100 },
  description: { type: "string", required: true, maxLength: 500 },
  category: { type: "string", required: false, maxLength: 50 },
  createdAt: { type: "date", required: true },
  userId: { type: "string", required: true },
}

export const mirrorResultSchema = {
  original: { type: "string", required: true },
  corrected: { type: "string", required: true },
  evidence: {
    type: "array",
    required: false,
    items: {
      title: { type: "string", required: true },
      description: { type: "string", required: true },
      source: { type: "string", required: false },
    },
  },
}

export const mentorAdviceSchema = {
  advice: { type: "string", required: true },
  actionSteps: { type: "array", required: false, items: { type: "string" } },
  resources: {
    type: "array",
    required: false,
    items: {
      title: { type: "string", required: true },
      url: { type: "string", required: true },
    },
  },
}

// Simple validation helper
export function validateData(data, schema) {
  const errors = []

  for (const [key, rules] of Object.entries(schema)) {
    const value = data[key]

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors.push(`${key} is required`)
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${key} must be ${rules.maxLength} characters or less`)
    }
  }

  return errors
}

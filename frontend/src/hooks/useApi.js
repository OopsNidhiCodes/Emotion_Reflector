import { useState, useCallback, useEffect } from 'react'

/**
 * Custom hook for handling API calls with loading states and error handling
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, execute, reset }
 */
export function useApi(apiFunction, options = {}) {
  const { 
    immediate = false, 
    initialData = null,
    onSuccess = null,
    onError = null 
  } = options

  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiFunction(...args)
      setData(result)
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
    } catch (err) {
      const errorMessage = err.message || 'An error occurred'
      setError(errorMessage)
      
      if (onError) {
        onError(err)
      }
      
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunction, onSuccess, onError])

  const reset = useCallback(() => {
    setData(initialData)
    setLoading(false)
    setError(null)
  }, [initialData])

  return {
    data,
    loading,
    error,
    execute,
    reset
  }
}

/**
 * Hook for handling API calls that should execute immediately
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export function useApiQuery(apiFunction, dependencies = [], options = {}) {
  const { execute, ...rest } = useApi(apiFunction, { 
    immediate: true, 
    ...options 
  })

  // Execute on mount and when dependencies change
  useEffect(() => {
    execute()
  }, [execute, ...dependencies])

  return {
    ...rest,
    refetch: execute
  }
}
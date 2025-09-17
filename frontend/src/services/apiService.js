import axios from 'axios'
import { auth } from '../config/firebase.js'

// API configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Request interceptor for adding auth tokens
apiClient.interceptors.request.use(
    async (config) => {
        try {
            // Add Firebase auth token if user is authenticated
            const user = auth.currentUser
            if (user) {
                const token = await user.getIdToken()
                config.headers.Authorization = `Bearer ${token}`
            }
        } catch (error) {
            console.warn('Failed to get auth token:', error)
        }

        // Log request in development
        if (import.meta.env.DEV) {
            console.warn(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
        }

        return config
    },
    (error) => {
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
            console.warn(`API Response: ${response.status} ${response.config.url}`)
        }
        return response
    },
    (error) => {
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response

            switch (status) {
                case 401:
                    // Unauthorized - redirect to login or refresh token
                    console.error('Unauthorized access - user needs to login')
                    // You can dispatch a logout action here if using state management
                    break
                case 403:
                    console.error('Forbidden - insufficient permissions')
                    break
                case 404:
                    console.error('Resource not found')
                    break
                case 500:
                    console.error('Internal server error')
                    break
                default:
                    console.error(`API Error ${status}:`, data?.message || error.message)
            }

            // Return a normalized error object
            return Promise.reject({
                status,
                message: data?.message || error.message,
                data: data,
                isApiError: true
            })
        } else if (error.request) {
            // Network error - no response received
            console.error('Network error - no response from server')
            return Promise.reject({
                status: 0,
                message: 'Network error - please check your connection',
                isNetworkError: true
            })
        } else {
            // Request setup error
            console.error('Request setup error:', error.message)
            return Promise.reject({
                status: 0,
                message: error.message,
                isRequestError: true
            })
        }
    }
)

// API service methods
export const apiService = {
    // Generic HTTP methods
    async get(url, config = {}) {
        const response = await apiClient.get(url, config)
        return response.data
    },

    async post(url, data = {}, config = {}) {
        const response = await apiClient.post(url, data, config)
        return response.data
    },

    async put(url, data = {}, config = {}) {
        const response = await apiClient.put(url, data, config)
        return response.data
    },

    async patch(url, data = {}, config = {}) {
        const response = await apiClient.patch(url, data, config)
        return response.data
    },

    async delete(url, config = {}) {
        const response = await apiClient.delete(url, config)
        return response.data
    },

    // Example API endpoints - customize these based on your Python backend

    // User-related endpoints
    user: {
        async getProfile() {
            return apiService.get('/user/profile')
        },

        async updateProfile(profileData) {
            return apiService.put('/user/profile', profileData)
        },

        async deleteAccount() {
            return apiService.delete('/user/account')
        }
    },

    // Data endpoints (customize based on your backend)
    data: {
        async getItems(params = {}) {
            return apiService.get('/items', { params })
        },

        async getItem(id) {
            return apiService.get(`/items/${id}`)
        },

        async createItem(itemData) {
            return apiService.post('/items', itemData)
        },

        async updateItem(id, itemData) {
            return apiService.put(`/items/${id}`, itemData)
        },

        async deleteItem(id) {
            return apiService.delete(`/items/${id}`)
        }
    },

    // Health check endpoint
    async healthCheck() {
        try {
            return await apiService.get('/health')
        } catch (error) {
            throw new Error('Backend API is not available')
        }
    }
}

// Export the configured axios instance for advanced usage
export { apiClient }

// Export default
export default apiService
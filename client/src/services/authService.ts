import api from './api'
import { AuthResponse, LoginData, SignupData } from '@/types'

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', data)
    return response.data
  },
}


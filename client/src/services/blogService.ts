import api from './api'
import { Blog, BlogCreate } from '@/types'

export const blogService = {
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get('/blogs')
    return response.data
  },

  getById: async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`)
    return response.data
  },

  create: async (data: BlogCreate): Promise<Blog> => {
    const response = await api.post('/blogs', data)
    return response.data
  },

  update: async (id: string, data: Partial<BlogCreate>): Promise<Blog> => {
    const response = await api.put(`/blogs/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/blogs/${id}`)
  },
}


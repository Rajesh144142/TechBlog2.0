// Auth Types
export interface User {
  id: string
  email: string
  name: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface LoginData {
  email: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  password: string
}

// Blog Types
export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  author_id: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface BlogCreate {
  title: string
  content: string
  tags: string[]
}

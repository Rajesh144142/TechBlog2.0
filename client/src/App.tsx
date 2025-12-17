import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { darkTheme, lightTheme } from '@/theme'
import { ThemeProvider, useTheme } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeToggle } from '@/components/ThemeToggle'

const queryClient = new QueryClient()

// Lazy load pages
const HomePage = lazy(() => import('@/features/home/pages/HomePage'))
const AuthPage = lazy(() => import('@/features/auth/pages/AuthPage'))
const BlogListPage = lazy(() => import('@/features/blog/pages/BlogListPage'))
const BlogDetailPage = lazy(() => import('@/features/blog/pages/BlogDetailPage'))
const CreateBlogPage = lazy(() => import('@/features/blog/pages/CreateBlogPage'))

function AppContent() {
  const { isDark } = useTheme()

  return (
    <MuiThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <ThemeToggle />
      <BrowserRouter>
        <Suspense
          fallback={
            <Box className="flex items-center justify-center min-h-screen">
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/create" element={<CreateBlogPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

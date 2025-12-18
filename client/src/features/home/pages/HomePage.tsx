import { Box, Typography, Container, Button, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

function HomePage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eef2ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" className="text-center">
        <Typography
          variant="h2"
          className="font-bold mb-4"
          sx={{
            background: 'linear-gradient(135deg, #818cf8 0%, #14b8a6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          TechBlog 2.0
        </Typography>
        <Typography variant="h6" sx={{ color: isDark ? '#9ca3af' : '#6b7280', mb: 4 }}>
          Discover the latest in technology and programming
        </Typography>

        {isAuthenticated && (
          <Typography variant="body1" sx={{ color: isDark ? '#a5b4fc' : '#4f46e5', mb: 4 }}>
            Welcome back, {user?.name}!
          </Typography>
        )}

        <Box className="flex gap-4 justify-center flex-wrap">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/blogs')}
            sx={{
              px: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': { background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' },
            }}
          >
            Browse Blogs
          </Button>

          {isAuthenticated ? (
            <Button
              variant="outlined"
              size="large"
              onClick={logout}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : '#6366f1',
                color: isDark ? '#a5b4fc' : '#4f46e5',
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/auth')}
              sx={{
                px: 4,
                py: 1.5,
                borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : '#6366f1',
                color: isDark ? '#a5b4fc' : '#4f46e5',
              }}
            >
              Login / Sign Up
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default HomePage

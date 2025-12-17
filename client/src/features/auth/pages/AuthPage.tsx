import { useState } from 'react'
import { Box, Container, Paper, Tabs, Tab, TextField, Button, Typography, Divider, useTheme, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'
import { LoginData, SignupData } from '@/types'

function AuthPage() {
  const [tab, setTab] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const { login } = useAuth()
  const { register, handleSubmit, reset } = useForm<SignupData>()

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (response) => {
      login(response.token, response.user)
      navigate('/blogs')
    },
    onError: (err: any) => {
      setError(err.response?.data?.detail || 'Login failed')
    },
  })

  const signupMutation = useMutation({
    mutationFn: (data: SignupData) => authService.signup(data),
    onSuccess: (response) => {
      login(response.token, response.user)
      navigate('/blogs')
    },
    onError: (err: any) => {
      setError(err.response?.data?.detail || 'Signup failed')
    },
  })

  const onSubmit = (data: SignupData) => {
    setError('')
    if (tab === 0) {
      loginMutation.mutate({ email: data.email, password: data.password })
    } else {
      signupMutation.mutate(data)
    }
  }

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
    setError('')
    reset()
  }

  const isLoading = loginMutation.isPending || signupMutation.isPending

  return (
    <Box
      className="min-h-screen flex items-center justify-center p-4"
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 50%, #e0e7ff 100%)',
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          className="p-8 rounded-2xl"
          sx={{
            background: isDark ? 'rgba(23, 23, 23, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(99, 102, 241, 0.3)',
          }}
        >
          <Box className="text-center mb-8">
            <Typography
              variant="h4"
              className="font-bold"
              sx={{
                background: 'linear-gradient(135deg, #818cf8 0%, #14b8a6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TechBlog
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#6b7280' : '#4b5563', mt: 2 }}>
              {tab === 0 ? 'Welcome back!' : 'Create your account'}
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            className="mb-6"
            sx={{
              '& .MuiTab-root': { textTransform: 'none', fontWeight: 500, fontSize: '0.95rem' },
              '& .MuiTabs-indicator': { background: 'linear-gradient(90deg, #6366f1, #14b8a6)', height: 3, borderRadius: 2 },
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {tab === 1 && (
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                {...register('name', { required: tab === 1 })}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': { borderColor: '#6366f1' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  },
                }}
              />
            )}
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              {...register('email', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register('password', { required: true })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' },
              }}
            >
              {isLoading ? 'Loading...' : tab === 0 ? 'Login' : 'Create Account'}
            </Button>
          </form>

          <Divider className="my-6" sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
            <Typography variant="caption" sx={{ color: isDark ? '#4b5563' : '#6b7280' }}>
              or
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/')}
            sx={{
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              borderColor: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.5)',
              color: isDark ? '#a5b4fc' : '#4f46e5',
              '&:hover': { borderColor: '#6366f1', background: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)' },
            }}
          >
            Back to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}

export default AuthPage

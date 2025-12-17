import { useState } from 'react'
import { Container, Typography, TextField, Button, Box, useTheme, Paper, Chip, Alert, InputAdornment, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { blogService } from '@/services/blogService'
import { BlogCreate } from '@/types'
import { useAuth } from '@/context/AuthContext'

function CreateBlogPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const { isAuthenticated } = useAuth()
  const queryClient = useQueryClient()
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState('')

  const { register, handleSubmit } = useForm<{ title: string; content: string }>()

  const createMutation = useMutation({
    mutationFn: (data: BlogCreate) => blogService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/blogs')
    },
    onError: (err: any) => {
      setError(err.response?.data?.detail || 'Failed to create blog')
    },
  })

  const onSubmit = (data: { title: string; content: string }) => {
    createMutation.mutate({ ...data, tags })
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  if (!isAuthenticated) {
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
        <Paper
          sx={{
            p: 4,
            textAlign: 'center',
            background: isDark ? 'rgba(23, 23, 23, 0.7)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: isDark ? '#f5f5f5' : '#171717' }}>
            Please login to create a blog
          </Typography>
          <Button variant="contained" onClick={() => navigate('/auth')}>
            Go to Login
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eef2ff 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/blogs')}
          sx={{ mb: 3, color: isDark ? '#a5b4fc' : '#4f46e5' }}
        >
          Back to Blogs
        </Button>

        <Paper
          elevation={0}
          sx={{
            background: isDark ? 'rgba(23, 23, 23, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: isDark ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid rgba(99, 102, 241, 0.15)',
            borderRadius: 4,
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 4,
              background: 'linear-gradient(135deg, #818cf8 0%, #14b8a6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create New Blog
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Blog Title"
              placeholder="Enter an engaging title..."
              fullWidth
              {...register('title', { required: true })}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
              }}
            />

            <TextField
              label="Content"
              placeholder="Write your blog content here..."
              fullWidth
              multiline
              rows={12}
              {...register('content', { required: true })}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#6366f1' },
              }}
            />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: isDark ? '#9ca3af' : '#6b7280', fontWeight: 500 }}>
                Tags
              </Typography>
              <TextField
                placeholder="Add a tag and press Enter..."
                size="small"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addTag()
                  }
                }}
                sx={{
                  width: { xs: '100%', sm: 300 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)',
                    '&:hover fieldset': { borderColor: '#6366f1' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={addTag} size="small" sx={{ color: '#6366f1' }}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              {tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => removeTag(tag)}
                      sx={{
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
                        color: isDark ? '#a5b4fc' : '#4f46e5',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                          color: isDark ? '#818cf8' : '#6366f1',
                          '&:hover': { color: '#ef4444' },
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={createMutation.isPending}
              sx={{
                py: 1.8,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                  boxShadow: '0 6px 25px rgba(99, 102, 241, 0.4)',
                },
                '&:disabled': {
                  background: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.5)',
                },
              }}
            >
              {createMutation.isPending ? 'Publishing...' : 'Publish Blog'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default CreateBlogPage

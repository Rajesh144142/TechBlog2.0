import { Container, Typography, Chip, Box, Button, Divider, useTheme, CircularProgress, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { blogService } from '@/services/blogService'
import { useAuth } from '@/context/AuthContext'

function BlogDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: blog, isLoading, error, isError } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id!),
    enabled: !!id,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  const deleteMutation = useMutation({
    mutationFn: () => blogService.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      navigate('/blogs')
    },
  })

  if (isLoading) {
    return (
      <Box
        className="flex flex-col justify-center items-center min-h-screen gap-4"
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eef2ff 100%)',
        }}
      >
        <CircularProgress />
        <Typography sx={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Loading blog...</Typography>
      </Box>
    )
  }

  if (isError || !blog) {
    return (
      <Box
        className="min-h-screen"
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
            : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eef2ff 100%)',
          py: 6,
        }}
      >
        <Container maxWidth="md">
          <Alert severity="error" sx={{ mb: 3 }}>
            {(error as Error)?.message || 'Blog not found'}
          </Alert>
          <Button variant="contained" onClick={() => navigate('/blogs')}>
            Back to Blogs
          </Button>
        </Container>
      </Box>
    )
  }

  const isAuthor = user?.id === blog.author_id

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #eef2ff 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box className="flex justify-between items-center mb-4">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/blogs')}>
            Back to Blogs
          </Button>
          {isAuthor && (
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              Delete
            </Button>
          )}
        </Box>

        <Box
          sx={{
            background: isDark ? 'rgba(23, 23, 23, 0.7)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: isDark ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 3,
            p: 4,
          }}
        >
          <Typography variant="h3" className="font-bold mb-4" sx={{ color: isDark ? '#f5f5f5' : '#171717' }}>
            {blog.title}
          </Typography>

          <Box className="flex items-center gap-4 mb-4">
            <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              By {blog.author}
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#6b7280' : '#9ca3af' }}>
              {new Date(blog.created_at).toLocaleDateString()}
            </Typography>
          </Box>

          <Box className="flex gap-1 mb-6 flex-wrap">
            {blog.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                  color: isDark ? '#a5b4fc' : '#4f46e5',
                }}
              />
            ))}
          </Box>

          <Divider sx={{ mb: 4, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />

          <Box
            sx={{
              color: isDark ? '#d1d5db' : '#374151',
              lineHeight: 1.8,
              '& h1': { fontSize: '2rem', fontWeight: 700, color: isDark ? '#f5f5f5' : '#171717', mt: 4, mb: 2 },
              '& h2': { fontSize: '1.5rem', fontWeight: 600, color: isDark ? '#f5f5f5' : '#171717', mt: 3, mb: 2 },
              '& h3': { fontSize: '1.25rem', fontWeight: 600, color: isDark ? '#e5e5e5' : '#262626', mt: 2, mb: 1 },
              '& p': { mb: 2 },
              '& ul, & ol': { pl: 3, mb: 2 },
              '& li': { mb: 0.5 },
              '& code': {
                background: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
                color: isDark ? '#a5b4fc' : '#4f46e5',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.875em',
                fontFamily: 'monospace',
              },
              '& pre': {
                background: isDark ? '#1a1a2e' : '#f3f4f6',
                padding: '16px',
                borderRadius: '8px',
                overflow: 'auto',
                mb: 2,
                '& code': {
                  background: 'transparent',
                  padding: 0,
                  color: isDark ? '#e5e5e5' : '#374151',
                },
              },
              '& table': {
                width: '100%',
                borderCollapse: 'collapse',
                mb: 3,
                fontSize: '0.9rem',
              },
              '& th, & td': {
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
                padding: '10px 14px',
                textAlign: 'left',
              },
              '& th': {
                background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)',
                fontWeight: 600,
                color: isDark ? '#a5b4fc' : '#4f46e5',
              },
              '& tr:hover': {
                background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
              },
              '& strong': { fontWeight: 600, color: isDark ? '#f5f5f5' : '#171717' },
              '& a': { color: '#6366f1', textDecoration: 'underline' },
              '& blockquote': {
                borderLeft: '4px solid #6366f1',
                pl: 2,
                ml: 0,
                color: isDark ? '#9ca3af' : '#6b7280',
                fontStyle: 'italic',
              },
              '& hr': {
                border: 'none',
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                my: 3,
              },
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog.content}</ReactMarkdown>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default BlogDetailPage

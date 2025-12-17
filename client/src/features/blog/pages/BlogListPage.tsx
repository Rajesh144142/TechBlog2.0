import { Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, Box, useTheme, Button, CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { blogService } from '@/services/blogService'
import { useAuth } from '@/context/AuthContext'

function BlogListPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const { isAuthenticated } = useAuth()

  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

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
      <Container maxWidth="lg">
        <Box className="flex justify-between items-center mb-6">
          <Box>
            <Typography
              variant="h3"
              className="font-bold mb-2"
              sx={{
                background: 'linear-gradient(135deg, #818cf8 0%, #14b8a6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              TechBlog
            </Typography>
            <Typography variant="body1" sx={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
              Latest articles on technology and programming
            </Typography>
          </Box>
          {isAuthenticated && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                '&:hover': { background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)' },
              }}
            >
              New Blog
            </Button>
          )}
        </Box>

        {isLoading && (
          <Box className="flex justify-center py-12">
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" className="text-center py-8">
            Failed to load blogs
          </Typography>
        )}

        {blogs && blogs.length === 0 && (
          <Typography sx={{ color: isDark ? '#9ca3af' : '#6b7280', textAlign: 'center', py: 8 }}>
            No blogs yet. {isAuthenticated ? 'Create the first one!' : 'Login to create one!'}
          </Typography>
        )}

        <Grid container spacing={3}>
          {blogs?.map((blog) => (
            <Grid item xs={12} md={6} lg={4} key={blog.id}>
              <Card
                sx={{
                  height: '100%',
                  background: isDark ? 'rgba(23, 23, 23, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: isDark ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid rgba(99, 102, 241, 0.2)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: isDark ? '0 20px 40px rgba(99, 102, 241, 0.15)' : '0 20px 40px rgba(99, 102, 241, 0.1)',
                    borderColor: '#6366f1',
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(`/blog/${blog.id}`)} className="h-full">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <Typography variant="h6" className="font-semibold" sx={{ color: isDark ? '#f5f5f5' : '#171717' }}>
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                      {blog.excerpt}
                    </Typography>
                    <Box className="flex gap-2 mt-2 flex-wrap">
                      {blog.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
                            color: isDark ? '#a5b4fc' : '#4f46e5',
                            border: 'none',
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="caption" sx={{ color: isDark ? '#6b7280' : '#9ca3af', mt: 1 }}>
                      {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default BlogListPage

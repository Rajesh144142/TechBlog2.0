import { IconButton } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        '&:hover': {
          background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
        },
      }}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}


import { createTheme } from '@mui/material'
import { COLORS, DARK_THEME, LIGHT_THEME } from '@/constants/theme'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: DARK_THEME.primary,
      light: COLORS.primary[400],
      dark: COLORS.primary[700],
    },
    secondary: {
      main: DARK_THEME.secondary,
      light: COLORS.secondary[400],
      dark: COLORS.secondary[700],
    },
    background: {
      default: DARK_THEME.background.default,
      paper: DARK_THEME.background.paper,
    },
    text: {
      primary: DARK_THEME.text.primary,
      secondary: DARK_THEME.text.secondary,
    },
    error: { main: COLORS.error },
    warning: { main: COLORS.warning },
    success: { main: COLORS.success },
    info: { main: COLORS.info },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: LIGHT_THEME.primary,
      light: COLORS.primary[400],
      dark: COLORS.primary[800],
    },
    secondary: {
      main: LIGHT_THEME.secondary,
      light: COLORS.secondary[400],
      dark: COLORS.secondary[800],
    },
    background: {
      default: LIGHT_THEME.background.default,
      paper: LIGHT_THEME.background.paper,
    },
    text: {
      primary: LIGHT_THEME.text.primary,
      secondary: LIGHT_THEME.text.secondary,
    },
    error: { main: COLORS.error },
    warning: { main: COLORS.warning },
    success: { main: COLORS.success },
    info: { main: COLORS.info },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
})


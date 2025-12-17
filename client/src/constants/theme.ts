// Color Palette for AiBlog

export const COLORS = {
  // Primary - Deep Indigo
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  // Secondary - Teal
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },

  // Accent - Amber
  accent: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  // Neutrals
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const

export const DARK_THEME = {
  background: {
    default: COLORS.neutral[950],
    paper: COLORS.neutral[900],
    elevated: COLORS.neutral[800],
  },
  text: {
    primary: COLORS.neutral[50],
    secondary: COLORS.neutral[400],
    disabled: COLORS.neutral[600],
  },
  primary: COLORS.primary[500],
  secondary: COLORS.secondary[500],
  accent: COLORS.accent[400],
  border: COLORS.neutral[800],
}

export const LIGHT_THEME = {
  background: {
    default: COLORS.neutral[50],
    paper: '#ffffff',
    elevated: COLORS.neutral[100],
  },
  text: {
    primary: COLORS.neutral[900],
    secondary: COLORS.neutral[600],
    disabled: COLORS.neutral[400],
  },
  primary: COLORS.primary[600],
  secondary: COLORS.secondary[600],
  accent: COLORS.accent[500],
  border: COLORS.neutral[200],
}


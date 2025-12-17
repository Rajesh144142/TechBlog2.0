// Helper functions

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date)
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Add more utility functions here


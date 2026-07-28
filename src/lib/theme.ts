export type Theme = 'dark' | 'light'

export function resolveThemePreference(
  preferredTheme: string | null | undefined,
): Theme {
  if (preferredTheme === 'light' || preferredTheme === 'dark') {
    return preferredTheme
  }

  return 'dark'
}

export function getNextTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark'
}

export interface ThemeClipPathInput {
  x: number
  y: number
  width: number
  height: number
}

export function createThemeClipPath({ x, y, width, height }: ThemeClipPathInput): [string, string] {
  const endRadius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y))

  return [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
}

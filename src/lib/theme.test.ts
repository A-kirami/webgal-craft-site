import { describe, expect, it } from 'vitest'

import { createThemeClipPath, getNextTheme, resolveThemePreference } from './theme'

describe('resolveThemePreference', () => {
  it('returns the stored light theme when it is valid', () => {
    expect(resolveThemePreference('light')).toBe('light')
  })

  it('returns the stored dark theme when it is valid', () => {
    expect(resolveThemePreference('dark')).toBe('dark')
  })

  it('falls back to dark when the stored theme is invalid', () => {
    expect(resolveThemePreference('sepia')).toBe('dark')
  })
})

describe('getNextTheme', () => {
  it('cycles from dark to light', () => {
    expect(getNextTheme('dark')).toBe('light')
  })

  it('cycles from light to dark', () => {
    expect(getNextTheme('light')).toBe('dark')
  })
})

describe('createThemeClipPath', () => {
  it('expands from the pointer position to the farthest viewport corner', () => {
    expect(createThemeClipPath({ x: 20, y: 30, width: 120, height: 90 })).toEqual([
      'circle(0px at 20px 30px)',
      'circle(116.619037896906px at 20px 30px)',
    ])
  })
})

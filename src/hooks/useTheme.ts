import { useState, useCallback, useEffect } from 'react';

export type ThemeName = 'nutri-green' | 'royal-blue';
export type ColorMode = 'light' | 'dark';

const THEME_KEY = 'nutri-theme';
const MODE_KEY = 'nutri-color-mode';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as ThemeName) || 'nutri-green';
    } catch {
      return 'nutri-green';
    }
  });

  const [colorMode, setColorModeState] = useState<ColorMode>(() => {
    try {
      return (localStorage.getItem(MODE_KEY) as ColorMode) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'royal-blue') {
      root.setAttribute('data-theme', 'royal-blue');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (colorMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(MODE_KEY, colorMode);
  }, [colorMode]);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState(t => t === 'nutri-green' ? 'royal-blue' : 'nutri-green'), []);
  const toggleColorMode = useCallback(() => setColorModeState(m => m === 'light' ? 'dark' : 'light'), []);
  const setColorMode = useCallback((m: ColorMode) => setColorModeState(m), []);

  return { theme, colorMode, setTheme, toggleTheme, toggleColorMode, setColorMode };
}

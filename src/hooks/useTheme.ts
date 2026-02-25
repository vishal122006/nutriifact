import { useState, useCallback, useEffect } from 'react';

export type ThemeName = 'nutri-green' | 'royal-blue';

const STORAGE_KEY = 'nutri-theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY) as ThemeName) || 'nutri-green';
    } catch {
      return 'nutri-green';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'royal-blue') {
      root.setAttribute('data-theme', 'royal-blue');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((t: ThemeName) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState(t => t === 'nutri-green' ? 'royal-blue' : 'nutri-green'), []);

  return { theme, setTheme, toggleTheme };
}

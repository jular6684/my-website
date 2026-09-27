import React, { useEffect, useState } from 'react'

interface ThemeToggleProps {
  className?: string
  onThemeChange?: (theme: 'dark' | 'light') => void
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  onThemeChange,
}) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Read persisted theme or system preference
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    onThemeChange?.(initialTheme)
  }, [onThemeChange])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    onThemeChange?.(nextTheme)
  }

  return (
    <button
      id="theme-toggle-button"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '当前为深色模式，点击切换为浅色' : '当前为浅色模式，点击切换为深色'}
      title={theme === 'dark' ? '当前为深色模式，点击切换为浅色' : '当前为浅色模式，点击切换为深色'}
      className={`relative inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer shadow-md backdrop-blur-md bg-white/90 border-slate-300/80 text-amber-500 hover:bg-slate-100 hover:border-amber-400/50 dark:bg-slate-900/90 dark:border-slate-700/80 dark:text-amber-300 dark:hover:bg-slate-800 dark:hover:border-indigo-400/50 ${className}`}
    >
      {theme === 'dark' ? (
        // Moon Icon representing Dark Mode
        <svg
          className="w-5 h-5 text-amber-300 transition-transform duration-300 hover:-rotate-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        // Sun Icon representing Light Mode
        <svg
          className="w-5 h-5 text-amber-500 transition-transform duration-300 hover:rotate-45"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  )
}

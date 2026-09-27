import React, { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export interface NavItem {
  id: string
  label: string
  href: string
}

export const DEFAULT_NAV_ITEMS: readonly NavItem[] = [
  { id: 'nav-home', label: '首页', href: '#hero-section' },
  { id: 'nav-projects', label: '项目', href: '#projects' },
  { id: 'nav-about', label: '关于我', href: '#about' },
]

interface NavbarProps {
  brandName?: string
  navItems?: readonly NavItem[]
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'Liang Zhou',
  navItems = DEFAULT_NAV_ITEMS,
  className = '',
}) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }

    // Initialize state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.history.pushState(null, '', href)
      return
    }
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', href)
    }
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.history.pushState(null, '', '#hero-section')
  }

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md select-none ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-indigo-950/20 py-3 sm:py-3.5'
          : 'bg-white/50 dark:bg-slate-950/50 border-b border-slate-200/40 dark:border-slate-800/40 py-4 sm:py-5'
      } ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <a
          id="navbar-brand-link"
          href="#hero-section"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 shrink-0"
          aria-label="返回页面顶部"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <span className="text-white font-black text-base sm:text-lg tracking-tight">Z</span>
          </div>
          <span className="text-sm sm:text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors whitespace-nowrap">
            {brandName}
          </span>
        </a>

        {/* Right Section: Navigation Links + ThemeToggle */}
        <div className="flex items-center gap-2 sm:gap-6 shrink-0">
          <nav aria-label="主要导航" className="flex items-center gap-1 sm:gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/60 dark:bg-transparent dark:hover:bg-slate-800/60 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Integrated Theme Toggle */}
          <div className="border-l border-slate-200/80 dark:border-slate-800/80 pl-2 sm:pl-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

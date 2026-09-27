import React from 'react'

interface HeroSectionProps {
  name?: string
  title?: string
  bio?: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  name = 'Liang Zhou',
  title = 'Full-Stack & AI Agent Architect',
  bio = '专注探索 AI 智能体系统与现代工程架构，致力于构建高性能、高质感的数字化交互体验。',
  ctaText = '浏览精选项目 →',
  ctaLink = '#projects',
  className = '',
}) => {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', '#projects')
    }
  }

  return (
    <section
      id="hero-section"
      className={`relative z-10 flex min-h-svh w-full flex-col items-center justify-center px-6 pt-24 pb-12 text-center select-none ${className}`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Status / Role Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800/80 mb-8 backdrop-blur-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Available for New Challenges</span>
        </div>

        {/* Name Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 dark:from-white dark:via-indigo-100 dark:to-cyan-300 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        {/* Occupation / Profession */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600 dark:text-indigo-400 tracking-wide mb-6">
          {title}
        </p>

        {/* One-Sentence Bio */}
        <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 font-normal leading-relaxed mb-10">
          {bio}
        </p>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            id="hero-cta-button"
            href={ctaLink}
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md shadow-indigo-600/20 dark:shadow-indigo-500/25 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  )
}

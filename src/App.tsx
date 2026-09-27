import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { ParticleBackground } from './components/ParticleBackground'
import { HeroSection } from './components/HeroSection'
import { ProjectSection } from './components/ProjectSection'
import { AboutSection } from './components/AboutSection'

export default function App() {
  useEffect(() => {
    if (window.location.hash === '#contact') {
      const aboutEl = document.getElementById('about')
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: 'smooth' })
        window.history.replaceState(null, '', '#about')
      }
    }
  }, [])

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Sci-Fi Ambient Glows: Dual-mode radial lighting */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[550px] bg-gradient-to-b from-indigo-500/15 via-sky-400/10 to-transparent dark:from-indigo-600/35 dark:via-purple-600/25 dark:to-transparent blur-[120px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-500/10 to-transparent dark:from-cyan-600/25 dark:to-transparent blur-[140px] pointer-events-none rounded-full"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-500/10 to-transparent dark:from-indigo-600/25 dark:to-transparent blur-[140px] pointer-events-none rounded-full"
      />

      {/* Dynamic Static Tech Particle Canvas */}
      <ParticleBackground />

      {/* Fixed Top Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 w-full">
        <HeroSection />

        {/* Curated Project Showcase Section */}
        <ProjectSection />

        {/* Biography & Philosophy Section (Moved to Bottom, Replaced Contact) */}
        <AboutSection />

        {/* Minimal Footer */}
        <footer className="border-t border-slate-200/40 dark:border-slate-800/40 py-8 text-center text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Liang Zhou. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

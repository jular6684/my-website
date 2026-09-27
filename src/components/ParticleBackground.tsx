import React, { useEffect, useRef } from 'react'

interface ParticleBackgroundProps {
  className?: string
}

interface Particle {
  x: number
  y: number
  radius: number
  opacity: number
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let resizeTimer: number | undefined

    const drawParticles = () => {
      const parent = canvas.parentElement || document.body
      const width = parent.clientWidth || window.innerWidth
      const height = parent.clientHeight || window.innerHeight

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains('dark')

      // Styling based on active theme
      const dotColor = isDark
        ? 'rgba(165, 180, 252, 0.75)' // soft cyan-indigo in dark
        : 'rgba(79, 70, 229, 0.55)'   // deeper indigo in light
      const lineRgb = isDark ? '129, 140, 248' : '99, 102, 241'

      // Calculate particle density safely based on viewport area
      const count = Math.min(Math.max(Math.floor((width * height) / 16000), 36), 75)
      const maxDistance = 120
      const particles: Particle[] = []

      // Generate deterministic static particles across the viewport
      for (let i = 0; i < count; i++) {
        // Pseudo-random generation based on index to distribute evenly
        const seedX = (Math.sin(i * 997.3) + 1) / 2
        const seedY = (Math.cos(i * 773.7) + 1) / 2
        const seedR = (Math.sin(i * 123.4) + 1) / 2

        particles.push({
          x: seedX * width,
          y: seedY * height,
          radius: 1.2 + seedR * 1.8,
          opacity: 0.4 + seedR * 0.5,
        })
      }

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.22 : 0.16)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`
            ctx.lineWidth = 0.9
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particle points (strictly static, zero animation loop)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      }

      ctx.restore()
    }

    // Initial draw
    drawParticles()

    // Debounced Resize Observer
    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(drawParticles, 120)
    }

    window.addEventListener('resize', handleResize)

    // MutationObserver to watch theme class changes on <html>
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          drawParticles()
          break
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(resizeTimer)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  )
}

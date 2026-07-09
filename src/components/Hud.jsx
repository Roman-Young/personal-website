import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, FileText } from 'lucide-react'
import { site } from '../content.js'

const STOPS = [
  { id: 'about', label: 'About' },
  { id: 'map', label: 'Map' },
  { id: 'built', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

/**
 * The expedition HUD: a soft veil that thins to nothing, a compass mark,
 * and the journey's route being drawn as a dashed line along the top edge.
 * Its colors ride the same variables the palette scrub blends.
 */
export default function Hud() {
  const [active, setActive] = useState(null)
  const [open, setOpen] = useState(false)
  const routeRef = useRef(null)

  // route progress: a dashed trail drawn by scroll
  useEffect(() => {
    let ticking = false
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const p = max > 0 ? el.scrollTop / max : 0
      if (routeRef.current)
        routeRef.current.style.transform = `scaleX(${p})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight the region currently in view
  useEffect(() => {
    const sections = STOPS.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // nav stops share the site's button language: frosted fill, light top
  // edge, and the same 1px bubble-up as .btn on hover
  const navLink = (id, label) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      aria-current={active === id ? 'true' : undefined}
      className={`rounded-[10px] border px-4 py-2.5 text-sm font-bold backdrop-blur-md transition duration-200 hover:-translate-y-px active:translate-y-px ${
        active === id
          ? 'border-accent/50 bg-surface/70 text-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-2px_0_var(--accent)]'
          : 'border-line/60 bg-surface/40 text-ink/85 shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] hover:bg-surface/70 hover:text-ink'
      }`}
    >
      {label}
    </a>
  )

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      {/* the route, drawn as you travel, dashed like a map trail */}
      <div
        ref={routeRef}
        className="h-[3px] origin-left"
        style={{
          transform: 'scaleX(0)',
          background:
            'repeating-linear-gradient(90deg, var(--path) 0 10px, transparent 10px 16px)',
        }}
        aria-hidden="true"
      />

      {/* no veil behind the chrome: the frosted pills carry their own
          contrast, and the world stays visible right up to the top edge */}
      <div>
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:px-6"
        >
          {/* the brand rides in the same frosted pill as the nav */}
          <a
            href="#basecamp"
            className="flex items-center gap-2.5 rounded-[10px] border border-line/60 bg-surface/40 py-1.5 pr-4 pl-2 font-display text-lg font-bold tracking-tight shadow-[inset_0_1px_0_rgb(255_255_255/0.3)] backdrop-blur-md transition duration-200 hover:-translate-y-px hover:bg-surface/70"
          >
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            <span>
              {site.firstName}
              <span className="text-path">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1.5 md:flex">
            {STOPS.map(({ id, label }) => navLink(id, label))}
            {/* Resume is a distinct button, not a fifth nav stop: accent-bordered
                frost that fills solid on hover */}
            <Link
              to="/resume"
              className="ml-2 flex items-center gap-1.5 rounded-[10px] border border-accent/50 bg-surface/55 px-4 py-2.5 text-sm font-bold text-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.4)] backdrop-blur-md transition duration-200 hover:-translate-y-px hover:bg-accent hover:text-accentink active:translate-y-px"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Resume
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg text-ink/80 transition-colors duration-200 hover:bg-surface/60 hover:text-ink md:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* mobile sheet */}
        {open && (
          <div className="mx-3 rounded-xl border border-line/70 bg-sky/95 px-3 pt-2 pb-3 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.4)] backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-1.5">
              {STOPS.map(({ id, label }) => navLink(id, label))}
              <Link
                to="/resume"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center gap-1.5 rounded-[10px] border border-accent/50 bg-surface/60 px-4 py-2.5 text-sm font-bold text-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.4)] hover:bg-accent hover:text-accentink"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Resume
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

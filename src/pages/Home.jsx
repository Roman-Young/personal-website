import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hud from '../components/Hud.jsx'
import HeroBiome from '../sections/HeroBiome.jsx'
import MapBiome from '../sections/MapBiome.jsx'
import BuiltBiome from '../sections/BuiltBiome.jsx'
import CampfireBiome from '../sections/CampfireBiome.jsx'

gsap.registerPlugin(ScrollTrigger)

/**
 * The journey's light. Scrolling blends these root variables continuously
 * between biome palettes, so the page's atmosphere travels with you:
 * oasis gold (the dive lands here / About) → ocean map → village afternoon →
 * campfire dusk. (Mostly visible in the Hud and footer; the biomes
 * themselves are video.) `canyon` is kept as the neutral :root default.
 */
const PALETTES = {
  canyon: {
    '--sky': '#e9f4ee',
    '--surface': '#f8fcf9',
    '--ink': '#1e3028',
    '--ink-soft': '#51665a',
    '--line': '#d3e4d8',
    '--accent': '#3f8a4e',
    '--accent-ink': '#ffffff',
    '--path': '#8a6f4e',
  },
  ocean: {
    '--sky': '#e3eef8',
    '--surface': '#f5f9fd',
    '--ink': '#16324a',
    '--ink-soft': '#4a6379',
    '--line': '#cfe0ee',
    '--accent': '#1f6fb0',
    '--accent-ink': '#ffffff',
    '--path': '#3f8a4e',
  },
  oasis: {
    '--sky': '#f8f0dd',
    '--surface': '#fdf9ef',
    '--ink': '#4a3a1e',
    '--ink-soft': '#7a6845',
    '--line': '#ecdfc2',
    '--accent': '#1c9490',
    '--accent-ink': '#ffffff',
    '--path': '#c98a3d',
  },
  village: {
    '--sky': '#f7efe2',
    '--surface': '#fdf8ef',
    '--ink': '#3c2f20',
    '--ink-soft': '#6f5d48',
    '--line': '#eaddc6',
    '--accent': '#b06a2a',
    '--accent-ink': '#ffffff',
    '--path': '#b06a2a',
  },
  dusk: {
    '--sky': '#1c1830',
    '--surface': '#282343',
    '--ink': '#f1eae0',
    '--ink-soft': '#c3b8ae',
    '--line': '#413a5e',
    '--accent': '#f0a24a',
    '--accent-ink': '#241503',
    '--path': '#f0a24a',
  },
}

/** The biomes, in journey order: the light blends across each approach.
 *  The hero dive lands in the oasis (which IS About), so the whole
 *  #basecamp track carries the oasis palette. */
const JOURNEY = [
  { trigger: '#basecamp', palette: 'oasis' },
  { trigger: '#map', palette: 'ocean' },
  { trigger: '#built', palette: 'village' },
  { trigger: '#contact', palette: 'dusk' },
]

export default function Home() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const root = document.documentElement
    const mm = gsap.matchMedia(rootRef)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(root, PALETTES[JOURNEY[0].palette])

      JOURNEY.slice(1).forEach(({ trigger, palette }, i) => {
        gsap.fromTo(
          root,
          { ...PALETTES[JOURNEY[i].palette] },
          {
            ...PALETTES[palette],
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'top 10%',
              scrub: 0.4,
            },
          },
        )
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      JOURNEY.forEach(({ trigger, palette }) => {
        ScrollTrigger.create({
          trigger,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => gsap.set(root, PALETTES[palette]),
          onEnterBack: () => gsap.set(root, PALETTES[palette]),
        })
      })
    })

    return () => {
      mm.revert()
      Object.keys(PALETTES.canyon).forEach((v) => root.style.removeProperty(v))
    }
  }, [])

  return (
    <div ref={rootRef} id="top">
      <Hud />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroBiome />
        <MapBiome />
        <BuiltBiome />
        <CampfireBiome />
      </main>
    </div>
  )
}

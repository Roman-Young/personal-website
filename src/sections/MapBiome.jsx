import { useEffect, useRef, useState } from 'react'
import { worldMap } from '../content.js'

/**
 * Biome 3: the island seen whole, instantly. A plain still at its own
 * aspect ratio (never cropped), so the flags are just % offsets inside the
 * image's box: nothing to measure, nothing to drift. Flags plant one by one
 * as the map scrolls into view; each is a link into its region.
 */
export default function MapBiome() {
  const stageRef = useRef(null)
  const [planted, setPlanted] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPlanted(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [])

  return (
    // lands flush like the village: section top meets the viewport top on
    // nav clicks (no strip of the scene above), padding clears the header
    <section id="map" className="px-4 pt-[max(5.5rem,10vh)] pb-16 sm:px-6 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <p className="kicker mb-2">{worldMap.kicker}</p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {worldMap.title}
          </h2>
        </header>

        <div
          ref={stageRef}
          data-settled={planted ? 'true' : 'false'}
          className="relative mt-8"
        >
          <img
            src="/map-still.jpg"
            srcSet="/map-still-m.jpg 960w, /map-still.jpg 1600w"
            sizes="(max-width: 768px) 100vw, 1024px"
            alt="The island seen from above, with every stop on the journey"
            className="block h-auto w-full rounded-2xl border border-line shadow-[0_14px_34px_-16px_rgb(0_0_0/0.35)]"
          />

          {worldMap.markers.map(({ id, name, note, x, y, accent }, i) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={`Travel to ${name} (${note})`}
              className="map-flag absolute block"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                '--flag-delay': `${i * 0.13}s`,
              }}
            >
              <svg
                width="30"
                height="38"
                viewBox="0 0 30 38"
                aria-hidden="true"
                className="absolute bottom-0 -translate-x-[24%] drop-shadow-[0_3px_5px_rgb(0_0_0/0.45)] transition-transform duration-200 hover:scale-110"
              >
                <ellipse cx="7.3" cy="36.3" rx="4.8" ry="1.5" fill="rgb(0 0 0 / 0.3)" />
                <path
                  d="M8.4 3 C15 0.6 19.5 5.4 27 3.2 L27 14.4 C19.5 16.6 15 11.8 8.4 14.2 Z"
                  fill={accent}
                />
                <path
                  d="M8.4 3 C15 0.6 19.5 5.4 27 3.2 L27 5.6 C19.5 7.8 15 3 8.4 5.4 Z"
                  fill="rgb(255 255 255 / 0.25)"
                />
                <rect x="6" y="1.6" width="2.6" height="35" rx="1.3" fill="#4a3a28" />
              </svg>
              <span className="font-pixel absolute top-1.5 left-0 -translate-x-1/2 rounded-[3px] bg-black/50 px-2 py-0.5 text-[0.6rem] tracking-[0.1em] whitespace-nowrap text-white uppercase backdrop-blur-sm">
                {name}
              </span>
            </a>
          ))}
        </div>

        <p className="font-pixel mt-5 text-center text-[0.62rem] tracking-[0.14em] text-inksoft uppercase">
          {worldMap.caption}
        </p>
      </div>
    </section>
  )
}

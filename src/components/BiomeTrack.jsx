import { useEffect, useRef, useState } from 'react'

/**
 * A whole biome in one scroll track: the camera flies (scroll-scrubbed
 * video), settles on its final frame, and then the biome's content pops in
 * over the world itself: header once, cards one at a time.
 *
 * Track progress p ∈ [0,1]:
 *   [0, settleAt]   → the flight (video playhead scrubs across this range)
 *   [settleAt, 1]   → the camera holds; slides take turns
 *
 * Exposes --progress and --settle CSS vars on the track and data-settled on
 * the stage; slides get data-state = future | active | past (styles in
 * index.css). Reduced-motion visitors get the poster and a static stack.
 */
export default function BiomeTrack({
  id,
  name, // clip basename in /flights/
  height = 320, // vh
  settleAt = 0.45,
  destination, // pixel pill shown only while flying
  header, // { kicker, title }: arrives at settle, stays
  slides = [], // JSX nodes, one visible at a time
  settleBlock = null, // ONE composed block that rises in at settle and stays
  settleBlockMaxWidth = '46rem', // intrinsic cap for the settle block
  featherTop = 'sky', // seam blend above: 'sky' | 'dark' | 'none'
  featherBottom = 'sky', // seam blend below: 'sky' | 'dark' | 'none'
  settleAnchorId = null, // id of an invisible anchor placed at the settle offset
  flightOverlay = null, // JSX choreographed during the flight (hero words)
  stageExtras = null, // JSX on the stage (flags, embers)
  counter = true, // pixel "n / N" while slides cycle
  className = '',
}) {
  const trackRef = useRef(null)
  const videoRef = useRef(null)
  const activeRef = useRef(-2)
  const settledRef = useRef(false)
  const [active, setActive] = useState(-1) // -1 = still flying
  const [isSettled, setIsSettled] = useState(false)
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [mobile] = useState(
    () => window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    if (reduced) return
    const track = trackRef.current
    const video = videoRef.current
    if (!track || !video) return

    let target = 0
    let current = 0
    let raf

    const slideStart = settleAt + 0.04
    const slideSpan = 0.985 - slideStart

    const onScroll = () => {
      const r = track.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0

      if (video.duration)
        target = Math.min(p / settleAt, 1) * (video.duration - 0.05)
      track.style.setProperty('--progress', p.toFixed(4))

      const nowSettled = p >= settleAt
      if (nowSettled !== settledRef.current) {
        settledRef.current = nowSettled
        setIsSettled(nowSettled)
      }

      let idx = -1
      if (slides.length && p >= slideStart) {
        idx = Math.min(
          slides.length - 1,
          Math.floor(((p - slideStart) / slideSpan) * slides.length),
        )
      }
      if (idx !== activeRef.current) {
        activeRef.current = idx
        setActive(idx)
      }
    }

    const tick = () => {
      if (video.duration && video.readyState >= 2) {
        current += (target - current) * 0.22
        if (Math.abs(target - current) > 0.001) video.currentTime = current
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.preload = 'auto'
          video.load()
          io.disconnect()
        }
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(track)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    video.addEventListener('loadedmetadata', onScroll)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [reduced, settleAt, slides.length])

  const poster = `/flights/${name}-poster.jpg`
  const settled = isSettled

  // seam blends: 'sky' melts into the page atmosphere, 'dark' into a dusk
  // neutral (for art-on-art seams). On the pinned stage they're gated to the
  // seam moments via --progress (see .feather-track-*), so no fog hangs over
  // the scene while you're inside it.
  const featherEl = (edge, kind, gated) =>
    kind !== 'none' && (
      <div
        className={`feather-${edge}${kind === 'dark' ? ' feather-dark' : ''}${gated ? ` feather-track-${edge}` : ''}`}
        aria-hidden="true"
      />
    )

  const headerBlock = header && (
    <div className="biome-header on-art pointer-events-none absolute inset-x-0 top-[10vh] z-20 px-4 text-center">
      <p className="kicker mb-2 text-white/95" style={{ textShadow: '0 1px 8px rgb(0 0 0/0.6)' }}>
        {header.kicker}
      </p>
      <h2 className="font-display mx-auto max-w-3xl text-xl font-bold tracking-tight text-balance text-white sm:text-3xl">
        {header.title}
      </h2>
    </div>
  )

  if (reduced) {
    return (
      <section id={id} className={`relative scroll-mt-16 ${className}`}>
        <div className="relative">
          <img src={poster} alt="" aria-hidden="true" className="block w-full" />
          {featherEl('top', featherTop, false)}
          {featherEl('bottom', featherBottom, false)}
        </div>
        <div className="mx-auto max-w-2xl space-y-5 px-4 py-14 sm:px-6">
          {settleAnchorId && <div id={settleAnchorId} className="scroll-mt-20" />}
          {header && (
            <div>
              <p className="kicker mb-2">{header.kicker}</p>
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {header.title}
              </h2>
            </div>
          )}
          {settleBlock}
          {slides.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      id={id}
      className={`relative scroll-mt-0 ${className}`}
      style={{ height: `${height}vh`, '--settle': settleAt }}
    >
      {/* invisible anchor a bit past the settle offset: navigating here lands
          you on the settled scene with the block FULLY arrived (the reveal
          finishes ~0.08 after settle), never mid-flight and never mid-rise */}
      {settleAnchorId && (
        <div
          id={settleAnchorId}
          aria-hidden="true"
          className="absolute left-0 h-0 w-0"
          style={{ top: `calc((var(--settle) + 0.14) * (100% - 100vh))` }}
        />
      )}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        data-settled={settled ? 'true' : 'false'}
      >
        <video
          ref={videoRef}
          src={`/flights/${name}${mobile ? '-m' : ''}.mp4`}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          className="h-full w-full object-cover"
        />

        {/* darkening veil once settled, so cards read cleanly */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
          aria-hidden="true"
          style={{
            opacity: settled ? 1 : 0,
            background:
              'linear-gradient(to top, rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.15) 45%, rgb(0 0 0 / 0.25))',
          }}
        />

        {flightOverlay}

        {/* the settle block: ONE composed unit that rises in as a single
            piece once the flight lands. Its reveal is scroll-driven (see
            .settle-block) so the greeting→block handoff is deterministic at
            any scroll speed; no frame ever shows both. */}
        {settleBlock && (
          <div
            className="settle-block absolute inset-0 z-20 flex items-center justify-center px-4 pt-[13vh] pb-[11vh]"
            aria-hidden={settled ? undefined : true}
          >
            <div className="w-[92%]" style={{ maxWidth: settleBlockMaxWidth }}>
              {settleBlock}
            </div>
          </div>
        )}

        {destination && (
          <div className="destination on-art font-pixel absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-[3px] bg-black/40 px-3 py-1 text-[0.7rem] tracking-[0.12em] whitespace-nowrap text-white uppercase backdrop-blur-sm">
            {destination}
          </div>
        )}

        {headerBlock}

        {/* the biome's cards: one at a time, over the world */}
        {slides.length > 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center px-4 pt-[16vh] pb-[8vh]">
            {slides.map((s, i) => (
              <div
                key={i}
                className="slide absolute w-[92%] max-w-lg"
                data-state={
                  i === active ? 'active' : i < active ? 'past' : 'future'
                }
                aria-hidden={i !== active}
              >
                {s}
              </div>
            ))}
          </div>
        )}

        {counter && slides.length > 1 && (
          <div
            className="font-pixel absolute right-5 bottom-6 z-20 rounded-[3px] bg-black/40 px-2.5 py-1 text-[0.65rem] tracking-[0.15em] text-white uppercase backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: settled ? 1 : 0 }}
          >
            {Math.max(1, active + 1)} / {slides.length}
          </div>
        )}

        {stageExtras}

        {featherEl('top', featherTop, true)}
        {featherEl('bottom', featherBottom, true)}
      </div>
    </section>
  )
}

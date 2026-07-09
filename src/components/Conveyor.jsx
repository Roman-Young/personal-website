import { useEffect, useRef } from 'react'

/* px/s the belt drifts on its own: slow enough to read, alive enough to
   still feel like a conveyor */
const DRIFT_SPEED = 24
/* ms after the last touch before the drift resumes (lets momentum die) */
const TOUCH_IDLE = 1500

/**
 * The village conveyor: a real horizontal scroller that also drifts. A rAF
 * loop nudges scrollLeft slowly; whatever the user scrolls (trackpad, wheel,
 * touch) is folded in additively, so browsing the row and the slow belt
 * coexist. The row is rendered four times and scrollLeft is kept inside the
 * middle two copies, wrapping by exactly half the track (two identical
 * copies), so the belt is endless in both directions and the wrap can never
 * be seen. Only the first copy exists for the accessibility tree; the
 * duplicates stay mouse-clickable but are aria-hidden and untabbable.
 *
 * The drift pauses while: off-viewport, the parent says so (`paused`, e.g.
 * modal open), a finger is on the belt, or keyboard focus (:focus-visible)
 * is inside; tabbing never chases a moving target. Hover does NOT stop the
 * belt; the hovered card bubbles instead (see ProjectCard).
 */
export default function Conveyor({ paused = false, label, children }) {
  const scrollerRef = useRef(null)
  const pausedRef = useRef(paused)
  pausedRef.current = paused
  const keyboardRef = useRef(false)
  const touchUntilRef = useRef(0)

  // closing the modal hands focus back to the card it came from; that
  // restored focus must not hold the belt; release any focus-hold the
  // moment the parent unpauses, so the drift resumes immediately
  useEffect(() => {
    if (!paused) keyboardRef.current = false
  }, [paused])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // duplicates: reachable by mouse, invisible to keyboard and SR
    scroller
      .querySelectorAll('[aria-hidden="true"] button')
      .forEach((el) => (el.tabIndex = -1))

    const inView = { current: false }
    const io = new IntersectionObserver(
      ([e]) => (inView.current = e.isIntersecting),
      { rootMargin: '60px 0px' },
    )
    io.observe(scroller)

    let pos = -1 // float accumulator, so sub-pixel drift never rounds away
    let lastApplied = 0
    let lastT = performance.now()
    let raf

    const tick = (t) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((t - lastT) / 1000, 0.1)
      lastT = t
      const half = scroller.scrollWidth / 2
      const copy = half / 2
      if (half <= 0) return

      if (t < touchUntilRef.current) {
        // the finger (or its momentum) owns the scroller; only step in to
        // wrap when the gesture nears a hard end of the track
        const sl = scroller.scrollLeft
        if (sl >= half + copy * 1.5) scroller.scrollLeft = sl - half
        else if (sl < copy * 0.5) scroller.scrollLeft = sl + half
        pos = lastApplied = scroller.scrollLeft
        return
      }

      if (pos < 0) pos = lastApplied = scroller.scrollLeft
      pos += scroller.scrollLeft - lastApplied // fold in user scrolling
      if (inView.current && !pausedRef.current && !keyboardRef.current)
        pos += DRIFT_SPEED * dt
      // the wrap moves exactly two identical copies, so it's invisible;
      // skipped during keyboard travel so focus is never yanked off-screen
      if (!keyboardRef.current) {
        if (pos >= copy + half) pos -= half
        else if (pos < copy) pos += half
      }
      scroller.scrollLeft = pos
      lastApplied = scroller.scrollLeft
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  const settleTouch = (e) => {
    if (e.touches.length === 0)
      touchUntilRef.current = performance.now() + TOUCH_IDLE
  }

  return (
    <div
      ref={scrollerRef}
      className="conveyor w-full overflow-x-auto"
      aria-label={label}
      onTouchStart={() => (touchUntilRef.current = Infinity)}
      onTouchEnd={settleTouch}
      onTouchCancel={settleTouch}
      onFocus={() => {
        // ignore the focus event from the dialog's close-time focus return
        // (it arrives while the parent still says paused)
        if (pausedRef.current) return
        keyboardRef.current = !!scrollerRef.current?.querySelector(':focus-visible')
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget))
          keyboardRef.current = false
      }}
    >
      <div className="conveyor-track flex w-max items-stretch py-4">
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            className="flex items-stretch gap-5 pr-5"
            aria-hidden={copy > 0 ? 'true' : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

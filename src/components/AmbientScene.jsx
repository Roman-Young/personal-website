import { useEffect, useRef, useState } from 'react'

/**
 * A living backdrop: a locked-camera ambient loop that simply plays behind
 * the section's content; no scroll coupling of any kind. Reduced-motion
 * visitors get the loop's poster frame instead. The loop pauses while its
 * section is off-viewport so it never burns battery unseen.
 */
export default function AmbientScene({ name }) {
  const videoRef = useRef(null)
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [mobile] = useState(
    () => window.matchMedia('(max-width: 768px)').matches,
  )

  useEffect(() => {
    if (reduced) return
    const video = videoRef.current
    if (!video) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '25% 0px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [reduced])

  if (reduced) {
    return (
      <img
        src={`/ambient/${name}-poster.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={`/ambient/${name}${mobile ? '-m' : ''}.mp4`}
      poster={`/ambient/${name}-poster.jpg`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      tabIndex={-1}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}

import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, FileText, Github, Mail } from 'lucide-react'
import BiomeTrack from '../components/BiomeTrack.jsx'
import { site, hero, explorer } from '../content.js'

/**
 * Biome 1, the dive. You plunge off the cliff (scroll-scrubbed) and the
 * greeting assembles word-by-word during the fall. On landing, the scrub
 * holds its final frame (the oasis) and the About block, one composed
 * unit, rises into place over it. The greeting belongs to the flight only;
 * it is gone before the block can arrive (see .flight-only / .settle-block).
 */
export default function HeroBiome() {
  const words = hero.heading.split(' ')
  const subWords = hero.sub.split(' ')

  // The About block: ONE composed unit. Intrinsic grid/flex sizing only:
  // nothing absolute, so nothing here can ever overlap or clip its box. An
  // avatar-header (photo beside the name, prose full-width below) keeps the
  // photo from stealing text width, so the block stays compact enough to sit
  // in a pinned viewport down to 375×700. Bio comes straight from content.js.
  const bio = explorer.paragraphs

  const about = (
    <article className="panel">
      <div className="flex items-center gap-4">
        <img
          src="/roman-portrait.jpg"
          alt="Roman Young at UC San Diego"
          className="h-16 w-14 shrink-0 rotate-[-3deg] rounded-md border-[3px] border-white/90 object-cover shadow-lg sm:h-24 sm:w-20"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="panel-kicker">{explorer.title}</p>
          <h2 className="panel-title mt-1">{site.name}</h2>
        </div>
      </div>

      <p className="mt-4 text-sm text-white/65">{site.school}</p>

      <div className="mt-3.5 space-y-1.5 text-[0.94rem] leading-relaxed text-white/85">
        {bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* skill chips are the at-a-glance flourish; on a narrow AND short
          viewport (a pinned block can't clear the fixed HUD + footer feather)
          they yield so the bio and all three CTAs stay whole. Only narrow;
          wide short windows keep them, since the block is short when wide. */}
      <ul className="mt-4 flex flex-wrap gap-1.5 max-sm:[@media(max-height:820px)]:hidden">
        {explorer.provisions.map((label) => (
          <li key={label} className="panel-chip">
            {label}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <Link to="/resume" className="btn btn-primary">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Resume
        </Link>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
        <a
          href={`mailto:${site.email}`}
          className="btn btn-secondary"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email
        </a>
      </div>
    </article>
  )

  return (
    <BiomeTrack
      id="basecamp"
      name="hero"
      height={340}
      settleAt={0.42}
      featherTop="none"
      settleAnchorId="about"
      settleBlock={about}
      counter={false}
      flightOverlay={
        <div className="flight-only pointer-events-none absolute inset-0 z-20 flex flex-col items-center pt-[14vh] text-center">
          <span
            className="fly-word bob nametag text-sm sm:text-base"
            style={{ '--t': 0.008 }}
          >
            {site.nametag}
          </span>

          <h1 className="on-art font-display mt-6 max-w-3xl px-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="fly-word" style={{ '--t': 0.03 + i * 0.025 }}>
                  {w}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>

          <p className="on-art mt-4 max-w-xl px-6 text-base leading-relaxed text-white/95 sm:text-lg">
            {subWords.map((w, i) => (
              <Fragment key={i}>
                <span className="fly-word" style={{ '--t': 0.1 + i * 0.0035 }}>
                  {w}
                </span>
                {i < subWords.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </p>

          {/* leaves as soon as the flight begins */}
          <div className="fly-fade-out on-art absolute bottom-6 left-1/2 -translate-x-1/2">
            <p className="font-pixel mb-1 text-[0.65rem] tracking-[0.2em] text-white/90 uppercase">
              scroll to dive
            </p>
            <ChevronDown
              className="bob mx-auto h-5 w-5 text-white/90"
              aria-hidden="true"
            />
          </div>
        </div>
      }
    />
  )
}

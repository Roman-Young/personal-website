import { Link } from 'react-router-dom'
import { Mail, Github, FileText } from 'lucide-react'
import BiomeTrack from '../components/BiomeTrack.jsx'
import { site, contact } from '../content.js'

/* drifting embers: deterministic so renders stay stable */
const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: `${6 + ((i * 61) % 88)}%`,
  dur: `${5 + ((i * 37) % 50) / 10}s`,
  delay: `${((i * 83) % 60) / 10}s`,
  drift: `${-18 + ((i * 29) % 36)}px`,
  size: 2 + ((i * 13) % 3),
}))

/**
 * Biome 5, journey's end. Push through the dark spruces to the fire;
 * once you arrive, everything goes still except the embers.
 */
export default function CampfireBiome() {
  const slides = [
    <article key="contact" className="panel text-center">
      <p className="panel-kicker">{contact.kicker}</p>
      <h2 className="panel-title mt-2">{contact.title}</h2>
      <p className="panel-body mt-4">{contact.body}</p>
      {/* the same Resume/GitHub/Email trio the About block closes with,
          but the campfire leads with the message, so Email stays primary */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        <a href={`mailto:${site.email}`} className="btn btn-primary">
          <Mail className="h-4 w-4" aria-hidden="true" />
          {contact.cta}
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
        <Link
          to="/resume"
          className="btn btn-secondary"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Resume
        </Link>
      </div>
      <p className="panel-meta mt-6">{site.email}</p>
    </article>,
  ]

  return (
    <BiomeTrack
      id="contact"
      name="campfire"
      height={260}
      settleAt={0.5}
      featherTop="dark"
      featherBottom="none"
      destination="» journey's end"
      slides={slides}
      counter={false}
      stageExtras={
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[55vh]"
          aria-hidden="true"
        >
          {EMBERS.map((e, i) => (
            <span
              key={i}
              className="ember absolute bottom-0 rounded-full"
              style={{
                left: e.left,
                width: e.size,
                height: e.size,
                background: '#f0a24a',
                boxShadow: '0 0 6px 1px rgb(240 162 74 / 0.6)',
                '--dur': e.dur,
                '--delay': e.delay,
                '--drift': e.drift,
              }}
            />
          ))}
        </div>
      }
    />
  )
}

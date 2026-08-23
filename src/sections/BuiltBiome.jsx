import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AmbientScene from '../components/AmbientScene.jsx'
import Conveyor from '../components/Conveyor.jsx'
import ProjectModal from '../components/ProjectModal.jsx'
import { built } from '../content.js'

/**
 * One project card: the whole thing is a button that opens the detail
 * modal. Panel family styling with the project's accent as a placed edge.
 * Intrinsic column layout; the fixed width (conveyor) or grid cell keeps
 * the marquee geometry stable so nothing ever shifts mid-drift.
 */
function ProjectCard({ item, onOpen, className = '' }) {
  const { name, status, description, tags, accent } = item
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-haspopup="dialog"
      className={`panel flex cursor-pointer flex-col text-left transition duration-200 hover:-translate-y-1.5 hover:scale-[1.045] hover:brightness-110 ${className}`}
      style={{ borderLeft: `4px solid ${accent}` }}
    >
      <p className="panel-meta" style={{ color: accent }}>
        {status}
      </p>
      <h3 className="font-display mt-1.5 text-lg font-bold tracking-tight text-balance">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/85">
        {description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <li key={t} className="panel-chip">
            {t}
          </li>
        ))}
      </ul>

      <span className="panel-meta mt-auto flex items-center gap-1 pt-4 text-white/70">
        Open details
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  )
}

/**
 * Biome 4, the village: alive behind the work. A locked-camera ambient
 * loop holds the scene (no scroll coupling); the projects drift past on a
 * conveyor that stops the moment you engage, and each card opens a detail
 * modal. Reduced-motion visitors get a static grid over the village still.
 */
export default function BuiltBiome() {
  const [openProject, setOpenProject] = useState(null)
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <section id="built" className="relative overflow-hidden">
      <AmbientScene name="village" />

      {/* readability veil over the loop, same recipe as the settled scenes */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to top, rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.15) 45%, rgb(0 0 0 / 0.25))',
        }}
      />

      {/* top-aligned, not centered: arriving via the nav should put the
          title right under the header, not float it mid-viewport with dead
          sky above (12vh scales the breathing room with screen height) */}
      <div className="relative z-10 flex min-h-svh flex-col justify-start gap-9 pt-[max(5.75rem,12vh)] pb-[10vh]">
        <header className="on-art px-4 text-center text-white">
          <p
            className="kicker mb-2 text-white/95"
            style={{ textShadow: '0 1px 8px rgb(0 0 0/0.6)' }}
          >
            {built.kicker}
          </p>
          <h2 className="font-display mx-auto max-w-3xl text-xl font-bold tracking-tight text-balance sm:text-3xl">
            {built.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            {built.blurb}
          </p>
        </header>

        {reduced ? (
          <div className="mx-auto grid w-full max-w-4xl gap-5 px-4 sm:grid-cols-2 sm:px-6">
            {built.items.map((item) => (
              <ProjectCard key={item.name} item={item} onOpen={setOpenProject} />
            ))}
          </div>
        ) : (
          <Conveyor paused={openProject !== null} label="Projects">
            {built.items.map((item) => (
              <ProjectCard
                key={item.name}
                item={item}
                onOpen={setOpenProject}
                className="w-[19.5rem] shrink-0 sm:w-[22rem]"
              />
            ))}
          </Conveyor>
        )}
      </div>

      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />

      <div className="feather-top" aria-hidden="true" />
      {/* the campfire below is dark art; melt into dusk, not white sky */}
      <div className="feather-bottom feather-dark" aria-hidden="true" />
    </section>
  )
}

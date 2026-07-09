import { useEffect, useRef } from 'react'
import { ExternalLink, Github, X } from 'lucide-react'

/**
 * Project detail view, built on native <dialog>.showModal(): the platform
 * provides the focus trap, Esc-to-close, top-layer stacking, and focus
 * return to the card that opened it. We add backdrop-click close and a body
 * scroll lock. Repo/demo buttons and the image slot simply don't render
 * when their field is null (LabReach ships with all three null for now).
 */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!project || !dialog) return
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = ''
    }
  }, [project])

  if (!project) return null
  const { name, status, modal, tags, repo, demo, image, accent } = project

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <article className="panel max-h-[85dvh] w-[min(92vw,38rem)] overflow-y-auto p-0 sm:p-0">
        {/* placed-block header in the project's color: tinted dark so white
            text stays readable on every accent, hard accent bottom edge */}
        <header
          className="flex items-start justify-between gap-4 px-6 py-5 sm:px-7"
          style={{
            background: `color-mix(in srgb, ${accent} 34%, rgb(11 15 13))`,
            boxShadow: `inset 0 -4px 0 ${accent}`,
          }}
        >
          <div className="min-w-0">
            <p className="panel-kicker">{status}</p>
            <h3
              id="project-modal-title"
              className="font-display mt-1 text-xl font-bold tracking-tight text-balance sm:text-2xl"
            >
              {name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-black/25 text-white/85 transition-colors duration-200 hover:bg-black/45 hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="p-6 sm:p-7">
          {image && (
            <img
              src={image}
              alt={`${name} screenshot`}
              loading="lazy"
              className="mb-5 w-full rounded-lg border border-white/15"
            />
          )}

          <p className="panel-body">{modal}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <li key={t} className="panel-chip">
                {t}
              </li>
            ))}
          </ul>

          {(repo || demo) && (
            <div className="mt-6 flex flex-wrap gap-2.5 border-t border-white/15 pt-5">
              {repo && (
                <a
                  href={repo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name} on GitHub`}
                  title="View on GitHub"
                  className="btn btn-secondary w-12 px-0"
                >
                  <Github className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live demo
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </dialog>
  )
}

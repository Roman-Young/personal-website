import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Mail, Github, Linkedin, Printer } from 'lucide-react'
import { site, resume } from '../content.js'

export default function Resume() {
  useEffect(() => {
    document.title = `Resume · ${site.name}`
    return () => {
      document.title = `${site.name} · Creative · Scientist · Developer`
    }
  }, [])

  return (
    <div className="min-h-dvh">
      {/* slim header */}
      <header className="no-print sticky top-0 z-50 border-b border-line/60 bg-sky/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2 sm:px-6">
          <Link
            to="/"
            className="flex min-h-12 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-inksoft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the world
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-ghost min-h-11 px-4 py-2 text-sm"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print
            </button>
            {site.resumePdf && (
              <a
                href={site.resumePdf}
                download
                className="btn-primary min-h-11 px-4 py-2 text-sm"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                PDF
              </a>
            )}
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 print:py-0">
          {/* letterhead */}
          <header className="border-b-2 border-line pb-6">
            <p className="kicker mb-2 print:hidden">The short version</p>
            <h1 className="font-display text-4xl font-bold tracking-tight">
              {site.name}
            </h1>
            <p className="mt-1 text-inksoft">{site.school}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-inksoft">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-1.5 hover:text-accent"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </header>

          <section className="mt-8">
            <h2 className="kicker mb-3">Summary</h2>
            <p className="leading-relaxed text-inksoft">{resume.summary}</p>
          </section>

          <section className="mt-8">
            <h2 className="kicker mb-4">Education</h2>
            {resume.education.map((e) => (
              <div key={e.school} className="mb-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-lg font-bold">{e.school}</h3>
                  <p className="text-sm text-inksoft">{e.dates}</p>
                </div>
                <p className="font-medium text-accent">{e.degree}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] leading-relaxed text-inksoft">
                  {e.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h2 className="kicker mb-4">Experience</h2>
            {resume.experience.map((x) => (
              <div key={x.role} className="mb-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-display text-lg font-bold">{x.role}</h3>
                  <p className="text-sm text-inksoft">{x.dates}</p>
                </div>
                <p className="font-medium text-accent">{x.org}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] leading-relaxed text-inksoft">
                  {x.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {resume.leadership?.length > 0 && (
            <section className="mt-8">
              <h2 className="kicker mb-4">Leadership & Service</h2>
              {resume.leadership.map((x) => (
                <div key={x.role} className="mb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-lg font-bold">{x.role}</h3>
                    <p className="text-sm text-inksoft">{x.dates}</p>
                  </div>
                  <p className="font-medium text-accent">{x.org}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem] leading-relaxed text-inksoft">
                    {x.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          <section className="mt-8 mb-16">
            <h2 className="kicker mb-4">Skills</h2>
            <dl className="space-y-3">
              {resume.skills.map(({ group, items }) => (
                <div key={group} className="flex flex-wrap gap-x-3 gap-y-1">
                  <dt className="w-28 shrink-0 font-semibold">{group}</dt>
                  <dd className="text-inksoft">{items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </section>
        </article>
      </main>
    </div>
  )
}

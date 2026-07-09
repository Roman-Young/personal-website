# Roman Young · Personal Website

A scroll-driven portfolio set in a blocky voxel world. The opening dive is a
scroll-scrubbed video that lands in the About scene; from there the journey
passes an island map, a drifting project conveyor over a living village, and
a campfire contact scene.

Built with React 19, Vite, Tailwind CSS v4, and GSAP. Scene art and video
were generated from my own AI artwork, then encoded keyframe-dense so
reverse scrubbing stays smooth.

## Run it locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Editing content

All site text lives in [`src/content.js`](src/content.js): bio, project
cards, map markers, and the resume data. Edit that file and the site
follows. The downloadable resume PDF lives in `public/`.

## Where things live

| Path | What it is |
|---|---|
| `src/content.js` | All copy and data |
| `src/components/BiomeTrack.jsx` | The scroll-scrubbed video scenes |
| `src/components/Conveyor.jsx` | The drifting project belt |
| `src/sections/` | The five scenes of the journey |
| `src/pages/Resume.jsx` | Printable resume at `/resume` |
| `public/flights/`, `public/ambient/` | Video assets |

## Deploy

Pushes to `main` deploy on Vercel; `vercel.json` handles the `/resume`
rewrite.

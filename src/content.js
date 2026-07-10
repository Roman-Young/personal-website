/**
 * ============================================================================
 * Everything editable on the site lives in this one file.
 * ============================================================================
 */

export const site = {
  name: 'Roman Young',
  firstName: 'Roman',
  lastName: 'Young',
  nametag: 'romanyoung', // floats over the hero like a player nametag
  tagline: 'Creative · Scientist · Developer',
  location: 'La Jolla, California',
  school: 'UC San Diego · B.S. Bioinformatics (CS minor) · Class of 2028',
  email: 'romanyoung9981@gmail.com',
  github: 'https://github.com/Roman-Young',
  linkedin: 'https://www.linkedin.com/in/roman-young06',
  resumePdf: '/Roman-Young-Resume.pdf',
}

/** The opening flight. Lines assemble word-by-word as you fly. */
export const hero = {
  heading: 'Welcome to my world.',
  sub: 'Bioinformatics at UC San Diego. I build computational tools for biology. Scroll to explore.',
  cta: 'Begin the journey',
}

/**
 * Base camp / About: the dive lands here and this block rises over it.
 */
export const explorer = {
  kicker: 'Base camp',
  title: 'Meet the explorer',
  headline:
    'Roman Young · B.S. Bioinformatics, Computer Science minor · UC San Diego, Class of 2028',
  subline: 'I build computational tools for biology.',
  // The About bio: the journey into code, then where it is heading.
  paragraphs: [
    'I’m a bioinformatics student at UC San Diego, and what I mostly do is build computational tools for biology and perform data analysis for various experiments in Immunology. My journey began with a love of biology (and even pre-med considerations); that came first. However, my passion for science is actually what pulled me in a new direction: into code, machine learning, and Artificial Intelligence.',
    'Right now I’m working to move from academia into biotech and pharma, but more than anything, I’m here to explore.',
  ],
  photoCaption: 'Geisel Library · UC San Diego',
  facts: [
    { label: 'Studying', value: 'Bioinformatics' },
    { label: 'Minor', value: 'Computer Science' },
    { label: 'Class of', value: '2028' },
    { label: 'GPA', value: '4.00' },
  ],
  // identity-at-a-glance skill chips (not the full resume)
  provisions: [
    'Python',
    'Rust',
    'Machine Learning',
    'Bioinformatics',
    'AI / LLMs',
    'Data analysis',
  ],
}

/**
 * The island map: the journey's index. Marker coordinates are % of the
 * map image; each marker links to a section.
 */
export const worldMap = {
  kicker: 'The known world',
  title: 'Pick a destination',
  caption: 'More waits beyond the clouds. New regions appear as I explore.',
  // oasis = the turquoise pond, campfire = the fire glow in the spruce
  // forest, village = the central houses
  markers: [
    { id: 'about', name: 'The Oasis', note: 'About', x: 39.5, y: 34, accent: '#1c9490' },
    { id: 'built', name: 'The Village', note: 'Projects', x: 65, y: 56, accent: '#b06a2a' },
    { id: 'contact', name: 'The Campfire', note: 'Say hi', x: 66.3, y: 33.5, accent: '#f0a24a' },
  ],
}

/**
 * The Village: everything built, flagship first. `description` is the
 * card line and `modal` the detail view. `accent` is a status category
 * color: 'Under construction' = amber #f0a24a, 'Built' = green #5cbf72.
 */
export const built = {
  kicker: 'The Village',
  title: 'Everything I’ve built',
  blurb: 'Every structure in the village is something shipped, or being raised.',
  items: [
    {
      name: 'PepMatch 2.0',
      status: 'Under construction',
      description:
        'Adding indel-tolerant search to PEPMatch, a published peptide-matching tool used in immunology. Core algorithm written in Rust.',
      modal:
        'Extended PEPMatch (published, BMC Bioinformatics 2023; used for tasks like T-cell epitope mapping) to support insertion/deletion matching, a capability its substitution-only engine lacked. I designed and implemented the indel algorithm in the tool’s Rust core (exposed to Python via PyO3): a pigeonhole seed-and-extend method that guarantees an exact-matching anchor, then extends bidirectionally under a configurable edit budget. Because indel alignment is full of boundary conditions, I built correctness on an independent brute-force oracle and randomized differential property testing, which surfaced and fixed a real off-by-one bug. Single-indel search is implemented and validated end-to-end and went through peer review against the official IEDB repository; I’m now extending it to multi-indel, benchmarking against BLAST/MMseqs2/DIAMOND, and preparing the manuscript.',
      tags: ['Rust', 'Python', 'PyO3', 'Algorithm design', 'Property-based testing'],
      repo: 'https://github.com/IEDB/PEPMatch',
      demo: null,
      image: null,
      accent: '#f0a24a',
    },
    {
      name: 'LabReach',
      status: 'Under construction',
      description:
        'An AI agent that turns a research lab’s website into a personalized, evidence-grounded cold email to its PI.',
      modal:
        'A full-stack AI agent that researches a lab from its website and PubMed, then writes a personalized cold email grounded strictly in what it found. Its focus is making AI writing measurably good, not vibes-based: a calibrated LLM-as-judge scores every draft across nine axes and drives an automatic revise-until-it-passes loop, and a DSPy/GEPA harness uses that judge as a reward signal to evolve the writer’s prompt automatically.',
      tags: ['Next.js', 'TypeScript', 'Claude + Gemini', 'DSPy/GEPA', 'PubMed API'],
      repo: null, // stays private until it is good enough to run
      demo: null,
      image: null, // drop a screenshot/GIF in /public and point here as the proof-it-works
      accent: '#f0a24a',
    },
    {
      name: 'Tumor-type classifier',
      status: 'Built',
      description:
        'A machine-learning model that identifies a tumor’s type from its gene-expression profile.',
      modal:
        'Trained an XGBoost classifier on the TCGA PAN-Cancer dataset (801 patients, ~20,500 genes) to distinguish five tumor types. Rather than chase the accuracy number on a tractable benchmark, the work focused on rigor and interpretation: feature-importance selection down to 39 genes with no loss of accuracy, checking those genes against known tissue biology, testing engineered ratio features for cross-dataset robustness, and validating with stratified cross-validation, Optuna tuning, and ROC/PR analysis.',
      tags: ['Python', 'XGBoost', 'scikit-learn', 'Optuna'],
      repo: 'https://github.com/Roman-Young/tcga-pancan-tumor-classifier',
      demo: null,
      image: null, // optional: a repo figure (confusion matrix / PCA scatter)
      accent: '#5cbf72',
    },
    {
      name: 'This World',
      status: 'Built',
      description:
        'The site you’re exploring: a scroll-driven journey through a world I generated from my own AI art.',
      modal:
        'A personal portfolio built as a flown journey through a voxel world. Five camera scenes generated from my own AI art, with a scroll-scrubbed opening dive built on an all-intra video pipeline; a React 19 + Vite front end, hand-authored, no templates.',
      tags: ['React', 'Vite', 'GSAP', 'ffmpeg'],
      repo: 'https://github.com/Roman-Young/personal-website',
      demo: 'https://personal-website-seven-chi-65.vercel.app',
      image: null,
      accent: '#5cbf72',
    },
  ],
}

export const contact = {
  kicker: 'The Campfire',
  title: 'Sit down, say hi',
  body: 'Open to research opportunities, internships, collaborations, or a good conversation about science and games.',
  cta: 'Send a message',
}

/**
 * Resume page data mirrors the downloadable PDF. Phone is intentionally
 * omitted from the public web page (it stays only in the PDF).
 */
export const resume = {
  summary:
    'Bioinformatics undergraduate at UC San Diego (Computer Science minor, 4.00 GPA, Class of 2028) building computational tools for biology: from an indel-aware peptide-matching algorithm in Rust to machine-learning tumor classifiers. Seeking research and industry roles across biotech and pharma.',
  education: [
    {
      school: 'University of California, San Diego',
      degree: 'B.S. Bioinformatics · Computer Science minor',
      dates: 'Expected 2028',
      details: [
        '4.00 GPA · La Jolla, CA',
        'Relevant coursework: Organic Chemistry I & II, Data Analysis for Biologists (R), Advanced Bioinformatics Lab, Discrete Math I & II, Advanced Data Structures, Linear Algebra, Probability & Statistics in Bioinformatics',
      ],
    },
  ],
  experience: [
    {
      role: 'Research Intern',
      org: 'Salk Institute for Biological Studies',
      dates: 'Mar 2025 - Present · La Jolla, CA',
      details: [
        'Profiled IgA-coated maternal microbiota to study immune ontogeny; identified microbial targets influencing neonatal gut colonization, feeding projects on the developmental origins of immune health.',
        'Ran gel electrophoresis and genotyping for Cre/lox transgenic mice to confirm APC-knockout efficiency.',
        'Dissected and prepped 100+ colon and intestinal organs for antibody staining to isolate IEL, LPL, and Myeloid cells.',
      ],
    },
    {
      role: 'Project Lead',
      org: 'La Jolla Institute for Immunology',
      dates: 'Sept 2025 - Present · La Jolla, CA',
      details: [
        'Leading an indel-aware peptide-matching pipeline for the IEDB, moving PEPMatch from substitution-only to InDel-alignment for better biological realism.',
        'Designed and implemented the indel-search algorithm in Rust (PyO3/Python bindings): pigeonhole seed-and-extend with bidirectional depth-first alignment under a configurable edit budget.',
        'Built correctness on an independent brute-force oracle and randomized differential property testing; surfaced and fixed a real off-by-one boundary bug.',
        'Built high-speed k-mer indexing (Python/Polars) giving up to 40,000× speedup (hours to sub-second) on 100+ queries against the full human proteome.',
        'Ran 30 Slurm validation jobs (millions of alignments) confirming 100% sensitivity; single-indel validated end-to-end through peer review against the official IEDB repository; now extending to multi-indel and preparing the manuscript.',
      ],
    },
    {
      role: 'Doctor Shadow',
      org: 'Kaiser Permanente',
      dates: 'Sept 2023 - May 2024 · Fremont, CA',
      details: [
        'Shadowed an Internal Medicine specialist across 200+ patient encounters; observed preventative immunizations and diagnostic imaging (MRI/radiographic) workups.',
      ],
    },
    {
      role: 'Clinical Assistant',
      org: 'Great Shape! International Dental Project',
      dates: 'Sept 2023 - Present · San Jose / Caribbean',
      details: [
        'Supported humanitarian dental missions treating 220+ patients (diagnostic X-rays, cleanings, fillings, extractions); ran oral-health workshops for 800+ students.',
      ],
    },
  ],
  leadership: [
    {
      role: 'Publicity Chair',
      org: 'Undergraduate Bioinformatics Club',
      dates: 'Sept 2024 - Present',
      details: [
        'Tripled the club’s social presence (50,000+ views); ran RNA-dataset and assembly-algorithm workshops.',
      ],
    },
    {
      role: 'Project Lead',
      org: 'Wesley United Methodist Church Mural',
      dates: 'Aug 2023 - Apr 2024',
      details: ['8-month commissioned mural, 500+ volunteer hours.'],
    },
  ],
  skills: [
    {
      group: 'Programming',
      items: ['Python', 'Rust', 'R', 'Java', 'TypeScript / JavaScript', 'Unix'],
    },
    {
      group: 'ML / Data',
      items: [
        'XGBoost',
        'scikit-learn',
        'Optuna',
        'Polars',
        'NumPy / Pandas',
        'DSPy/GEPA',
        'Agentic LLM / tool-use',
        'LLM-as-judge evaluation',
      ],
    },
    {
      group: 'Bioinformatics',
      items: [
        'Sequence alignment',
        'Proteomics',
        'Immunoinformatics',
        'Gene-expression analysis',
        'HPC / Slurm',
        'PyO3',
      ],
    },
    {
      group: 'Wet lab',
      items: [
        'PCR & gel electrophoresis',
        'Antibody staining',
        'Flow cytometry (A3 & LSRII)',
        'FlowJo',
        'Rodent handling & dissection',
        'Cell culture',
      ],
    },
    {
      group: 'Interests',
      items: [
        'Video creation',
        'Basketball (Lakers)',
        'Volleyball',
        'Thrifting',
        'Sewing',
        'Theatrical arts',
        'Musicals',
        'Karaoke',
      ],
    },
  ],
}

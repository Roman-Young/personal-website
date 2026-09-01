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
    'I’m a bioinformatics student at UC San Diego, and what I mostly do is build computational tools for biology and perform data analysis for various experiments in Immunology. My journey began with a love of biology, specifically immunology and drug discovery research (and even pre-med considerations). That was the beginning. However, my passion for science is actually what pulled me in a direction that can expand on these interests in unique ways: into data analysis, code, and Artificial Intelligence.',
    'Right now I’m working to move from academia into biotech and pharma, but more than anything, I’m here to explore.',
  ],
  photoCaption: 'Geisel Library · UC San Diego',
  facts: [
    { label: 'Studying', value: 'Bioinformatics' },
    { label: 'Minor', value: 'Computer Science' },
    { label: 'Class of', value: '2028' },
    { label: 'GPA', value: '3.975' },
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
      status: 'Built',
      description:
        'A RAG system over 445 research labs that does the hour of reading a student would do before a cold email, and returns a fit-ranked digest where every claim traces back to a real quote.',
      modal:
        'LabReach is a RAG system for deciding which research labs are worth a cold email. It reads each lab\'s work up front, so a student skips the hour of manual digging per lab, and it leaves the actual email to them. Papers come only from a lab\'s own publications page, scraped with Firecrawl. Gemini 2.5 Flash summarizes each paper into a quote-anchored chunk; chunks get quarantined when attribution gates decide the paper belongs to a different scientist with the same surname, about 2,200 of 8,600. The chunks sit in Neon Postgres with pgvector, across 445 labs at five San Diego institutions. The query itself is an extractive distillation of the student\'s résumé; retrieval runs dense vectors alongside Postgres full-text search, fused by reciprocal-rank fusion. A lab is ranked by how well its strongest papers match you. Writing the email stays the student\'s job. That came out of 53 cold emails I sent over two years: the replies came from labs that matched my work, and how well the email was written mattered less. Built with Next.js 16, deployed on Vercel and Neon. On a held-out test set, it ranks the right lab first for 7 of 8 profiles.',
      tags: ['Next.js', 'TypeScript', 'Postgres + pgvector', 'Hybrid RAG (dense + FTS)', 'Firecrawl', 'Gemini (Flash + embeddings)'],
      repo: 'https://github.com/Roman-Young/labreach',
      demo: 'https://labreach.roman-young.dev',
      image: null, // drop a screenshot/GIF in /public and point here as the proof-it-works
      accent: '#5cbf72', // green: shipped/built project (matches the other Built cards)
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
      demo: 'https://roman-young.dev',
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
    'Bioinformatics undergraduate at UC San Diego (Computer Science minor, 3.975 GPA, Class of 2028) building computational tools for biology: from an indel-aware peptide-matching algorithm in Rust to machine-learning tumor classifiers. Seeking research and industry roles across biotech and pharma.',
  education: [
    {
      school: 'University of California, San Diego',
      degree: 'B.S. Bioinformatics · Computer Science minor',
      dates: 'Expected 2028',
      details: [
        '3.975 GPA · La Jolla, CA',
        'Relevant coursework: Organic Chemistry I & II, Genetics, Molecular Biology, Data Analysis for Biologists (R), Advanced Bioinformatics Lab (BWA, minimap2, SAMtools), Discrete Math I & II, Advanced Data Structures, Statistics in Bioinformatics',
      ],
    },
  ],
  experience: [
    {
      role: 'Bioinformatics Developer',
      org: 'La Jolla Institute for Immunology',
      dates: 'Sept 2025 - Present · La Jolla, CA',
      details: [
        'Authored the indel-aware extension to PEPMatch, advancing it from substitution-only matching to full insertion/deletion alignment via a pigeonhole-seeding and bidirectional-DFS algorithm that guarantees complete recall.',
        'Benchmarked against common aligners BLAST, DIAMOND, and MMseqs2, achieving 100% recall versus 57 to 92% for those aligners while running 50 to 100x faster on all accounts and using ~5x less memory (445MB peak vs. 2.1 to 2.3GB).',
        'Validated correctness against an independent brute-force oracle across 86M+ exhaustive alignment pairs, backed by an ~89-test pytest suite and CI, and shipped four pull requests merged into the official IEDB/PEPMatch repository.',
      ],
    },
    {
      role: 'Research Intern',
      org: 'Salk Institute for Biological Studies',
      dates: 'Mar 2025 - Present · La Jolla, CA',
      details: [
        'Contributed to the lab’s central investigation of how maternal milk microbiota shapes neonatal gut immune development, using a control vs. cross-fostered (CT/CF) mouse model to isolate nursing-derived microbial effects from genetics.',
        'Executed end-to-end immunophenotyping on CT/CF mice: dissection, isolation of IELs and LPLs from small and large intestine, multicolor antibody staining, and flow cytometry to quantify intestinal T-cell and regulatory T-cell populations.',
        'Analyzed multiplexed single-cell RNA-seq datasets in R/Seurat (QC, HTO demultiplexing of pooled multi-mouse samples, clustering) to resolve immune populations; presented findings at lab meetings.',
      ],
    },
    {
      role: 'Creator',
      org: 'LabReach',
      dates: 'Mar 2026 - Present · La Jolla, CA',
      details: [
        'Built a full-stack RAG system (Next.js, TypeScript, Neon Postgres + pgvector) that pre-researches 445 research labs across 5 San Diego institutions, cutting a student’s per-lab vetting from ~1 hour to seconds before a cold email.',
        'Designed an extractive, non-generative digest that surfaces only quote-backed evidence, eliminating hallucination, and layered attribution gates that quarantined ~2,200 wrong-author papers to keep the corpus contamination-free.',
        'Adopted by UCSD STEM clubs to run cold-email workshops, so students can identify and contact research labs at scale.',
      ],
    },
  ],
  leadership: [
    {
      role: 'Publicity Chair',
      org: 'Undergraduate Bioinformatics Club',
      dates: 'Sept 2024 - Present · La Jolla, CA',
      details: [
        'Tripled the club’s social presence (50,000+ views); ran RNA-dataset and assembly-algorithm workshops.',
      ],
    },
    {
      role: 'Clinical Assistant',
      org: 'Great Shape! International Dental Project',
      dates: 'Sept 2023 - Present · San Jose, CA',
      details: [
        'Selected for international humanitarian missions to deliver dental care to underserved populations across the Caribbean.',
        'Assisted chairside in the treatment of 220+ patients, supporting a range of clinical procedures including diagnostic radiographs for pathology detection, cleanings, restorative fillings, and extractions to alleviate acute oral pain and infection.',
        'Led culturally sensitive workshops for 800+ international students, promoting preventive hygiene and long-term dental care.',
      ],
    },
    {
      role: 'Project Lead',
      org: 'Eagle Scout Service Project',
      dates: 'Aug 2023 - Apr 2024 · San Jose, CA',
      details: [
        'Earned Eagle Scout by leading an 8-month mural commission from concept to completion, coordinating 500+ volunteer hours and maintaining continuous communication with beneficiaries to integrate their feedback into the final design.',
        'Developed a comprehensive risk-mitigation strategy addressing UV degradation and weather-related wear; collaborated with professional muralists to ensure the mural’s long-term structural integrity and positive themes of love and inclusivity.',
      ],
    },
  ],
  skills: [
    {
      group: 'Languages',
      items: ['Python', 'TypeScript / Next.js', 'R', 'SQL', 'Bash'],
    },
    {
      group: 'Dev & compute',
      items: ['Git', 'CI', 'HPC / Slurm'],
    },
    {
      group: 'CS',
      items: ['Algorithm design', 'Performance benchmarking'],
    },
    {
      group: 'Wet lab',
      items: [
        'Flow cytometry',
        'Mouse dissection & handling',
        'ELISA / IgA assays',
        'H&E / Alcian Blue histology',
        'PCR',
        'Genotyping',
      ],
    },
  ],
}

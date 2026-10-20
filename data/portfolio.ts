export type ProjectCategory =
  | "All"
  | "Residential"
  | "Commercial"
  | "Interior"
  | "Landscape"
  | "Conceptual";

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface DrawingItem {
  id: string;
  title: string;
  date?: string;
  src: string;
  alt: string;
  scale?: string;
  dimensions?: string;
  description?: string;
  spaces?: { name: string; dimension?: string }[];
}

export interface SpatialZone {
  zone: string;
  description: string;
  rooms: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  typology: string;
  location: string;
  role: string;
  client?: string;
  practice?: string;
  architect?: string;
  link?: string;
  github?: string;
  image?: string;
  coverImage?: ProjectImage;
  gallery?: ProjectImage[];
  drawings?: DrawingItem[];
  overview?: string[];
  spatialZoning?: SpatialZone[];
  sourceNotes?: string;
  externalLinks?: { label: string; url: string }[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    designPhilosophy: string;
    speciality: string;
    bio: string;
    email: string;
    location: string;
    portraitImage: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  socials: SocialLink[];
  skills: {
    category: string;
    items: string[];
  }[];
  process: ProcessStep[];
  projects: Project[];
  experiences: Experience[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tausif Raza",
    role: "Architectural Technologist & Creative Engineer",
    designPhilosophy:
      "I believe great architecture is found in the balance between form, function, and feeling. Through thoughtful planning, natural materials, and a careful play of light and space, I aim to create meaningful environments that are simple, purposeful, and timeless.",
    speciality: "Architectural Planning & Interior Design",
    bio: "Focused on the intersection of digital architecture and full-stack software development. Designing disciplined design systems, minimalist interfaces, and performant digital spaces with refined typography and warm materiality.",
    email: "tausif@studio.arch",
    location: "Remote",
    portraitImage: "/images/architect-portrait.jpg",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "ArchDaily", url: "https://archdaily.com" },
  ],
  process: [
    {
      step: "01",
      title: "Spatial Brief & Analysis",
      subtitle: "Contextual parameters & systemic constraints",
      description:
        "Rigorous investigation of site geometry, programmatic needs, environmental daylight orientation, and client specifications to establish core design principles.",
      deliverables: [
        "Spatial Diagramming",
        "Requirement Matrix",
        "Climatic & Site Studies",
      ],
    },
    {
      step: "02",
      title: "Parametric Exploration",
      subtitle: "Computational modeling & form generation",
      description:
        "Iterative algorithmic studies examining structure, proportion, and materiality to derive optimized spatial solutions balanced with aesthetic clarity.",
      deliverables: [
        "3D Algorithmic Models",
        "Structural Framing Studies",
        "Daylight Simulations",
      ],
    },
    {
      step: "03",
      title: "Design Systems & Tectonics",
      subtitle: "Material specification & interface tokens",
      description:
        "Translating architectural form into disciplined component systems, unified design tokens, modular joinery details, and responsive digital frameworks.",
      deliverables: [
        "Component Design Systems",
        "Material Specification",
        "Interactive Prototypes",
      ],
    },
    {
      step: "04",
      title: "Execution & Realization",
      subtitle: "High-performance deployment & delivery",
      description:
        "Final execution bridging structural precision and full-stack engineering. Rigorous quality assurance, performance optimization, and spatial handover.",
      deliverables: [
        "Production Codebase",
        "Architectural Documentation",
        "Performance Audit",
      ],
    },
  ],
  skills: [
    {
      category: "Spatial & Design Systems",
      items: [
        "Design Tokens",
        "Grid Systems",
        "Tailwind CSS",
        "Micro-Interactions",
        "Typography Hierarchy",
        "Responsive Logic",
      ],
    },
    {
      category: "Creative Engineering",
      items: [
        "Next.js App Router",
        "React 19",
        "TypeScript",
        "GSAP & ScrollTrigger",
        "WebGL / Canvas",
        "Performance Tuning",
      ],
    },
    {
      category: "Infrastructure & Tools",
      items: [
        "Git / Monorepo",
        "Node.js",
        "Docker",
        "Vercel",
        "Figma",
        "Parametric Modeling",
      ],
    },
  ],
  projects: [
    {
      id: "sheikh-nawaz-bungalow",
      slug: "sheikh-nawaz-bungalow",
      title: "Bungalow — Bihar",
      subtitle: "Neoclassical Residential Estate & Architectural Planning",
      category: "Residential",
      description:
        "A grand neoclassical bungalow commission in Bihar featuring symmetrical columned porticos, a central daylight courtyard, dedicated swimming pool recreation deck, and meticulously planned two-story residential zoning.",
      tags: [
        "Architectural Planning",
        "Interior Design",
        "Floor Plans",
        "Bungalow",
      ],
      year: "2025 – 2026",
      typology: "Residential Bungalow",
      location: "Bihar",
      client: "Mr. Sheikh Nawaz",
      practice: "CIVI ARCHER DESIGNS",
      architect: "Ar. Tausif Raza",
      role: "Architectural Planning & Interior Design",
      link: "/work/sheikh-nawaz-bungalow",
      image: "/images/projects/sheikh-nawaz-bungalow/exterior-front.jpg",
      coverImage: {
        src: "/images/projects/sheikh-nawaz-bungalow/exterior-front.jpg",
        alt: "Front facade elevation of Mr. Sheikh Nawaz's neoclassical bungalow in Bihar",
        caption: "Frontal exterior render showing neoclassical portico, pediment, and grand gated perimeter.",
      },
      gallery: [
        {
          src: "/images/projects/sheikh-nawaz-bungalow/exterior-front.jpg",
          alt: "Grand front elevation of Bungalow in Bihar",
          caption: "Fig. 01 — Symmetrical entrance portico with classical fluted columns and arched fenestration.",
        },
        {
          src: "/images/projects/sheikh-nawaz-bungalow/exterior-perspective.jpg",
          alt: "Aerial corner perspective of Bungalow estate in Bihar",
          caption: "Fig. 02 — Aerial perspective highlighting perimeter boundary wall, landscaped frontage, and rooflines.",
        },
        {
          src: "/images/projects/sheikh-nawaz-bungalow/courtyard-pool.jpg",
          alt: "Private swimming pool and pergola garden courtyard",
          caption: "Fig. 03 — Private 15' x 25' swimming pool with timber decking and vine-draped pergola terrace.",
        },
      ],
      drawings: [
        {
          id: "ground-floor-plan",
          title: "Ground Floor Plan",
          date: "21/04/2026",
          src: "/images/projects/sheikh-nawaz-bungalow/ground-floor-plan.png",
          alt: "Ground floor architectural plan for Mr. Sheikh Nawaz Bungalow by CIVI ARCHER DESIGNS",
          description:
            "Primary level organizing formal reception, daily living, primary suites, internal courtyard, and direct outdoor connectivity to pool and terrace decks.",
          spaces: [
            { name: "Entrance Porch", dimension: "10'-5\" x 8'-9\"" },
            { name: "Drawing Room", dimension: "22'-1\" x 20'-3\"" },
            { name: "Central Living Space", dimension: "22'-2\" x 25'-0\"" },
            { name: "Dining Hall", dimension: "19'-11\" x 14'-11\"" },
            { name: "Kitchen", dimension: "16'-5\" x 14'-0\"" },
            { name: "Storage Room", dimension: "7'-0\" x 14'-0\"" },
            { name: "Utility Space", dimension: "25'-9\" x 5'-0\"" },
            { name: "Courtyard", dimension: "16'-0\" x 11'-10\"" },
            { name: "Master Bedroom 01", dimension: "15'-11\" x 20'-3\"" },
            { name: "Master Bedroom 02", dimension: "13'-10\" x 17'-2\"" },
            { name: "Dress (Bed 01)", dimension: "7'-6\" x 7'-6\"" },
            { name: "Toilet (Bed 01)", dimension: "7'-6\" x 8'-0\"" },
            { name: "Dress (Bed 02)", dimension: "7'-6\" x 8'-5\"" },
            { name: "Toilet (Bed 02)", dimension: "7'-6\" x 8'-5\"" },
            { name: "Grand Stair Void", dimension: "22'-2\" x 17'-3\"" },
            { name: "Swimming Pool", dimension: "15'-0\" x 25'-0\"" },
            { name: "Poolside Deck", dimension: "3'-8\" x 32'-0\"" },
            { name: "Wide Deck", dimension: "5'-0\" x 15'-1\"" },
          ],
        },
        {
          id: "first-floor-plan",
          title: "First Floor Plan",
          date: "19/04/2025",
          src: "/images/projects/sheikh-nawaz-bungalow/first-floor-plan.png",
          alt: "First floor architectural plan for Mr. Sheikh Nawaz Bungalow by CIVI ARCHER DESIGNS",
          description:
            "Upper level dedicated to private family sanctuaries, executive meeting room, state-of-the-art home theater, and open courtyard gallery.",
          spaces: [
            { name: "Executive Meeting Room", dimension: "22'-1\" x 20'-3\"" },
            { name: "Upper Living Lounge", dimension: "22'-2\" x 25'-0\"" },
            { name: "Upper Master Bedroom", dimension: "15'-11\" x 20'-3\"" },
            { name: "Kids Bedroom", dimension: "13'-10\" x 17'-2\"" },
            { name: "Theater Room", dimension: "16'-5\" x 14'-0\"" },
            { name: "Multipurpose Lounge Area", dimension: "19'-11\" x 14'-11\"" },
            { name: "Courtyard Opening (Void)", dimension: "16'-0\" x 11'-10\"" },
            { name: "Secondary Staircase", dimension: "7'-0\" x 14'-9\"" },
            { name: "Grand Stair Circulation", dimension: "22'-2\" x 17'-3\"" },
          ],
        },
      ],
      overview: [
        "Commissioned for Mr. Sheikh Nawaz in Bihar by CIVI ARCHER DESIGNS (under lead architect Ar. Tausif Raza), this bespoke residential estate represents a synthesis of classical architectural symmetry and tailored modern living.",
        "The residence is grounded on a disciplined rectilinear grid that separates formal guest greeting from private familial zones, unified around a central open-air courtyard that promotes passive ventilation, natural daylight, and visual connectivity.",
        "Outdoor amenities feature a 15' x 25' swimming pool flanked by treated timber decking and an architectural colonnade pergola, fostering a calm, retreat-like environment within private compound walls.",
      ],
      spatialZoning: [
        {
          zone: "Public & Formal Reception",
          description:
            "Positioned immediately off the grand entrance porch, the formal drawing room provides spacious, secluded entertainment separate from private family spaces.",
          rooms: ["Entrance Porch", "Drawing Room", "Powder Toilet", "Grand Foyer"],
        },
        {
          zone: "Family Living & Dining Core",
          description:
            "The heart of the ground floor centers on a 22' x 25' double-height living hall directly adjoining the dining salon, kitchen pantry, and the landscaped courtyard.",
          rooms: ["Living Space", "Dining Hall", "Kitchen", "Storage", "Utility"],
        },
        {
          zone: "Private Sleeping Quarters",
          description:
            "Generously proportioned bedroom suites on both ground and upper levels, each equipped with dedicated walk-in dressing rooms and en-suite bathrooms.",
          rooms: [
            "Ground Master Suite 01",
            "Ground Master Suite 02",
            "Upper Master Suite",
            "Kids Bedroom Suite",
          ],
        },
        {
          zone: "Recreation & Wellness Spine",
          description:
            "Recreational amenities integrated into both levels, including the ground-level private pool and garden pergola, and the upper-level cinema theater and multipurpose family space.",
          rooms: [
            "Swimming Pool & Decks",
            "Garden Colonnade Pergola",
            "Home Cinema Theater",
            "Multipurpose Lounge",
            "Executive Meeting Room",
          ],
        },
      ],
      featured: true,
    },
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Lead Creative Technologist",
      company: "Atelier Spatial Computing",
      period: "2024 - Present",
      description: [
        "Created unified design systems across web and spatial products using centralized CSS variables and strict token hierarchies.",
        "Built responsive 12-column layout engines and GSAP-driven transitions operating at 60 FPS on desktop, tablet, and mobile devices.",
      ],
      skills: ["TypeScript", "Next.js", "GSAP", "Design Tokens"],
    },
  ],
};

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

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface DesignNarrativeSection {
  title: string;
  subtitle?: string;
  content: string[];
  image?: string;
  imageAlt?: string;
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
  status?: string;
  client?: string;
  practice?: string;
  architect?: string;
  specs?: ProjectSpec[];
  narrative?: DesignNarrativeSection[];
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
  process?: ProcessStep[];
  projects: Project[];
  experiences: Experience[];
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Tausif Raza",
    role: "Architect & Interior Designer",
    designPhilosophy:
      "I believe great architecture is found in the balance between form, function, and feeling. Through thoughtful planning, natural materials, and a careful play of light and space, I aim to create meaningful environments that are simple, purposeful, and timeless.",
    speciality: "Architectural Planning & Interior Design",
    bio: "Dedicated to architectural planning, interior design, space planning, and thoughtful built-environment commissions. Balancing structural clarity, warm materiality, and natural light to create meaningful, enduring spaces.",
    email: "civiarcherdesigns@gmail.com",
    location: "India",
    portraitImage: "/images/architect-portrait.jpg",
  },
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "ArchDaily", url: "https://archdaily.com" },
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
      id: "courtyard-residence",
      slug: "courtyard-residence",
      title: "Courtyard Residence",
      subtitle: "Neoclassical Residential Estate & Architectural Planning",
      category: "Residential",
      description:
        "A stately neoclassical residence in Bihar featuring symmetrical columned porticos, an open-air daylight courtyard, integrated swimming pool terrace, and disciplined two-storey spatial zoning.",
      tags: [
        "Architectural Planning",
        "Residential Architecture",
        "Spatial Zoning",
        "Neoclassical Design",
      ],
      year: "2025 – 2026",
      typology: "Private Residential Estate",
      location: "Bihar",
      practice: "CIVI ARCHER DESIGNS",
      architect: "Ar. Tausif Raza",
      role: "Architectural Planning & Spatial Design",
      status: "Design & Architectural Documentation Completed",
      link: "/work/courtyard-residence",
      image: "/images/projects/courtyard-residence/exterior-front.jpg",
      coverImage: {
        src: "/images/projects/courtyard-residence/exterior-front.jpg",
        alt: "Symmetrical neoclassical front elevation of Courtyard Residence",
        caption: "Frontal elevation featuring classical columned portico, pediment, and formal gated entrance perimeter.",
      },
      specs: [
        { label: "Typology", value: "Private Residential Estate" },
        { label: "Location", value: "Bihar" },
        { label: "Scale", value: "Two-Storey Estate Commission" },
        { label: "Timeline", value: "2025 – 2026" },
        { label: "Status", value: "Planning & Design Complete" },
        { label: "Practice", value: "CIVI ARCHER DESIGNS" },
        { label: "Lead Architect", value: "Ar. Tausif Raza" },
        { label: "Documentation", value: "AutoCAD & 3D Visualization" },
      ],
      gallery: [
        {
          src: "/images/projects/courtyard-residence/exterior-front.jpg",
          alt: "Front facade elevation of Courtyard Residence in Bihar",
          caption: "Fig. 01 — Symmetrical entrance portico with classical fluted columns, pediment detailing, and arched fenestration.",
        },
        {
          src: "/images/projects/courtyard-residence/exterior-perspective.jpg",
          alt: "Aerial corner perspective of Courtyard Residence estate in Bihar",
          caption: "Fig. 02 — Aerial perspective highlighting perimeter boundary wall, landscaped frontage, and cohesive roofline composition.",
        },
        {
          src: "/images/projects/courtyard-residence/courtyard-pool.jpg",
          alt: "Private swimming pool and pergola garden courtyard",
          caption: "Fig. 03 — Private swimming pool and leisure terrace framed by treated timber decking and an architectural colonnade pergola.",
        },
      ],
      drawings: [
        {
          id: "ground-floor-plan",
          title: "Ground Floor Schematic Plan",
          date: "2026",
          src: "/images/projects/courtyard-residence/ground-floor-plan.png",
          alt: "Ground floor architectural layout schematic for Courtyard Residence",
          description:
            "Primary level organizing formal reception, daily living, primary suites, internal courtyard, and direct outdoor connectivity to pool and terrace decks.",
          spaces: [
            { name: "Entrance Porch" },
            { name: "Drawing Room" },
            { name: "Central Living Space" },
            { name: "Dining Hall" },
            { name: "Kitchen" },
            { name: "Storage Room" },
            { name: "Utility Space" },
            { name: "Courtyard" },
            { name: "Master Bedroom 01" },
            { name: "Master Bedroom 02" },
            { name: "Dress (Bed 01)" },
            { name: "Toilet (Bed 01)" },
            { name: "Dress (Bed 02)" },
            { name: "Toilet (Bed 02)" },
            { name: "Grand Stair Void" },
            { name: "Swimming Pool" },
            { name: "Poolside Deck" },
            { name: "Garden Terrace" },
          ],
        },
        {
          id: "first-floor-plan",
          title: "First Floor Schematic Plan",
          date: "2025",
          src: "/images/projects/courtyard-residence/first-floor-plan.png",
          alt: "First floor architectural layout schematic for Courtyard Residence",
          description:
            "Upper level dedicated to private family sanctuaries, executive meeting room, state-of-the-art home theater, and open courtyard gallery.",
          spaces: [
            { name: "Executive Meeting Room" },
            { name: "Upper Living Lounge" },
            { name: "Upper Master Bedroom" },
            { name: "Kids Bedroom" },
            { name: "Theater Room" },
            { name: "Multipurpose Lounge Area" },
            { name: "Courtyard Opening (Void)" },
            { name: "Secondary Staircase" },
            { name: "Grand Stair Circulation" },
          ],
        },
      ],
      overview: [
        "Conceived as a bespoke residential estate in Bihar by CIVI ARCHER DESIGNS (under lead architect Ar. Tausif Raza), this project represents a synthesis of classical architectural symmetry and tailored modern living.",
        "The residence is grounded on a disciplined rectilinear grid that separates formal guest greeting from private familial zones, unified around a central open-air courtyard that promotes passive ventilation, natural daylight, and visual connectivity.",
        "Outdoor amenities feature a private swimming pool flanked by treated timber decking and an architectural colonnade pergola, fostering a calm, retreat-like environment within private compound walls.",
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
            "The heart of the ground floor centers on a double-height living hall directly adjoining the dining salon, kitchen pantry, and the landscaped courtyard.",
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

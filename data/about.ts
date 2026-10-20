export interface DesignPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  organization?: string;
  description?: string;
}

export interface AboutContent {
  eyebrow: string;
  headline: string;
  name: string;
  role: string;
  biography: string;
  specialities: string[];
  image: {
    src: string;
    alt: string;
    caption?: string;
  };
  philosophy: {
    eyebrow?: string;
    statement: string;
    supportingCopy: string;
  };
  principles: {
    eyebrow?: string;
    title: string;
    items: DesignPrinciple[];
  };
  milestones?: MilestoneItem[];
}

export const aboutContent: AboutContent = {
  eyebrow: "ABOUT THE ARCHITECT",
  headline: "Designing spaces with clarity, purpose, and character.",
  name: "Tausif Raza",
  role: "Architectural Planning & Interior Design",
  biography:
    "I'm Tausif Raza, an architect focused on architectural planning and interior design. My approach brings together functional layouts, thoughtful proportions, natural light, and material selection to create meaningful, enduring spaces.",
  specialities: [
    "Architectural Planning",
    "Interior Design",
    "Spatial Organization",
    "Material Selection",
  ],
  image: {
    src: "/images/architect-portrait.jpg",
    alt: "Ar. Tausif Raza — Architectural Planning & Interior Design",
    caption: "Ar. Tausif Raza // Studio Practice",
  },
  philosophy: {
    eyebrow: "DESIGN PHILOSOPHY",
    statement: "Thoughtful spaces. Purposeful design. Lasting experiences.",
    supportingCopy:
      "Architecture begins with understanding how people live. Through functional planning, balanced proportions, natural light, and carefully selected materials, each space should serve a clear purpose while creating an atmosphere that feels comfortable, coherent, and enduring.",
  },
  principles: {
    eyebrow: "CORE TENETS",
    title: "Design Principles",
    items: [
      {
        number: "01",
        title: "Functional Planning",
        description:
          "Spaces organized around purpose, circulation, and usability.",
      },
      {
        number: "02",
        title: "Light & Space",
        description:
          "Thoughtful relationships between openings, daylight, and interior spaces.",
      },
      {
        number: "03",
        title: "Materiality",
        description:
          "Considered materials, textures, and architectural details.",
      },
      {
        number: "04",
        title: "Human-Centred Design",
        description:
          "Spaces designed around comfort and everyday use.",
      },
    ],
  },
  // Optional professional timeline milestones: omitted when not verified to prevent dummy data
  milestones: undefined,
};

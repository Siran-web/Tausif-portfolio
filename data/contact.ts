/**
 * Centralized Contact & Social Configuration
 * Tausif Raza — Architect & Interior Designer
 */
export const CONTACT_DETAILS = {
  email: "civiarcherdesign@gmail.com",
  mailtoUrl: "mailto:civiarcherdesign@gmail.com",
  gmailComposeUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=civiarcherdesign@gmail.com",
  phoneDisplay: "9304448607",
  phoneTel: "tel:+919304448607",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://www.linkedin.com/in/tausif-raza-820b7b207/",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com",
  websiteUrl: "https://tausif-portfolio-three.vercel.app/",
} as const;

export const LINKEDIN_URL: string = CONTACT_DETAILS.linkedinUrl;
export const INSTAGRAM_URL: string = CONTACT_DETAILS.instagramUrl;
export const PORTFOLIO_WEBSITE_URL: string = CONTACT_DETAILS.websiteUrl;

export interface ContactInfo {
  heading: string;
  description: string;
  directEmail: string;
  mailtoUrl: string;
  gmailComposeUrl: string;
  phoneDisplay: string;
  phoneTel: string;
  linkedinUrl: string;
  instagramUrl: string;
  operatingTimezone: {
    label: string;
    display: string;
    iana: string;
  };
  areasOfPractice: {
    label: string;
    items: string[];
  };
}

export const contactInfo: ContactInfo = {
  heading: "Let's Discuss Your Project",
  description:
    "Available for architectural design, interior design, space planning, and thoughtful built-environment projects. Share your ideas, and let's explore how we can bring your vision to life.",
  directEmail: CONTACT_DETAILS.email,
  mailtoUrl: CONTACT_DETAILS.mailtoUrl,
  gmailComposeUrl: CONTACT_DETAILS.gmailComposeUrl,
  phoneDisplay: CONTACT_DETAILS.phoneDisplay,
  phoneTel: CONTACT_DETAILS.phoneTel,
  linkedinUrl: CONTACT_DETAILS.linkedinUrl,
  instagramUrl: CONTACT_DETAILS.instagramUrl,
  operatingTimezone: {
    label: "OPERATING TIMEZONE",
    display: "IST (India Standard Time) / UTC+05:30",
    iana: "Asia/Kolkata",
  },
  areasOfPractice: {
    label: "AREAS OF PRACTICE",
    items: [
      "Architectural Planning",
      "Residential Architecture",
      "Interior Design",
      "Space Planning",
      "Renovation and Remodeling",
      "3D Visualization and Design Presentation",
    ],
  },
};

export const PROJECT_TYPES = [
  "Residential Architecture",
  "New House / Villa Design",
  "Apartment Interior Design",
  "Residential Interior Design",
  "Commercial Architecture",
  "Office / Workspace Design",
  "Retail / Showroom Design",
  "Hospitality Architecture",
  "Healthcare / Hospital Design",
  "Institutional / Educational Architecture",
  "Landscape and Site Planning",
  "Architectural Space Planning",
  "Renovation and Remodeling",
  "Furniture and Custom Interior Design",
  "3D Architectural Visualization",
  "Architectural Consultation",
  "Other / Not Sure Yet",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_AREAS = [
  "Not decided yet",
  "Under 1,000 sq. ft.",
  "1,000–2,500 sq. ft.",
  "2,500–5,000 sq. ft.",
  "5,000–10,000 sq. ft.",
  "Above 10,000 sq. ft.",
  "Other / Not applicable",
] as const;

export type ProjectArea = (typeof PROJECT_AREAS)[number];

export const ESTIMATED_BUDGETS = [
  "To be discussed",
  "Under ₹5 lakh",
  "₹5–15 lakh",
  "₹15–30 lakh",
  "₹30–50 lakh",
  "₹50 lakh–₹1 crore",
  "Above ₹1 crore",
  "Other / Not applicable",
] as const;

export type EstimatedBudget = (typeof ESTIMATED_BUDGETS)[number];

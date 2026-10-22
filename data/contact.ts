export interface ContactInfo {
  heading: string;
  description: string;
  directEmail: string;
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
  directEmail: "civiarcherdesigns@gmail.com",
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

import {
  HeroAboutSection,
  PhilosophySection,
  ProjectsSection,
  ProcessSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main>
      <HeroAboutSection />
      <PhilosophySection />
      <ProjectsSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}

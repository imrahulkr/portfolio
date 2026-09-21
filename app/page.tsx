import { Hero } from "@/components/hero/hero";
import { FocusAreas } from "@/components/home/focus-areas";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Experience } from "@/components/home/experience";
import { Skills } from "@/components/home/skills";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <FocusAreas />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

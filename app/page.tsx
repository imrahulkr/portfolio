import { Hero } from "@/components/hero/hero";
import { TechStrip } from "@/components/home/tech-strip";
import { Services } from "@/components/home/services";
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
        <TechStrip />
        <Services />
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

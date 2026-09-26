import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { TechStrip } from "@/components/home/tech-strip";
import { Services } from "@/components/home/services";
import { Impact } from "@/components/home/impact";
import { Process } from "@/components/home/process";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Experience } from "@/components/home/experience";
import { Skills } from "@/components/home/skills";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <TechStrip />
        <Services />
        <FeaturedProjects />
        <Impact />
        <Process />
        <Experience />
        <Skills />
        <About />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

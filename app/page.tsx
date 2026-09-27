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
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, siteUrl } from "@/data/site-config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteUrl,
  author: { "@type": "Person", name: siteConfig.name, url: siteUrl },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <main id="main-content">
        <Hero />
        <TechStrip />
        <Services />
        <About />
        <FeaturedProjects />
        <Impact />
        <Process />
        <Experience />
        <Skills />
        <BlogTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

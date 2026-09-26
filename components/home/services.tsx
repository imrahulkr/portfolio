import { FiServer, FiMonitor, FiLayers, FiZap, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { services } from "@/data/services";
import type { ServiceIcon } from "@/data/services";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons: Record<ServiceIcon, IconType> = {
  server: FiServer,
  monitor: FiMonitor,
  layers: FiLayers,
  zap: FiZap,
};

export function Services() {
  return (
    <section id="services" className="bg-surface border-y border-border">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <SectionHeading
            title="How I can help"
            subtitle="Freelance projects and collaborations. Tell me what you're building."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => {
              const Icon = icons[service.icon];
              return (
                <article
                  key={service.title}
                  className="card-glow relative flex flex-col bg-bg border border-border rounded-2xl p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-5">
                    <Icon aria-hidden className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text mb-2">{service.title}</h3>
                  <p className="text-base text-text-soft mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-soft border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm self-start"
                  >
                    Get in touch
                    <FiArrowRight aria-hidden className="h-4 w-4" />
                  </a>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

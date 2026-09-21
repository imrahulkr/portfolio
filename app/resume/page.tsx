import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FiMail, FiPhone, FiCalendar, FiMapPin, FiGithub, FiLinkedin, FiDownload, FiServer, FiCode, FiLayers, FiCpu } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site-config";
import { experience } from "@/data/experience";
import { skills, focusAreas } from "@/data/skills";
import { skillIcons } from "@/data/skill-icons";
import { stats } from "@/data/stats";
import { aboutContent } from "@/components/home/about";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Resume — Rahul Kumar",
  description: "Rahul Kumar's background, skills, and work experience.",
};

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm";

// Icons for data/skills.ts's focusAreas, matched by title. Kept separate from
// that data file since icon choice is a presentation detail, not content.
const focusAreaIcons: Record<string, ReactNode> = {
  "Backend engineering": <FiServer aria-hidden="true" />,
  Frontend: <FiCode aria-hidden="true" />,
  "System design": <FiLayers aria-hidden="true" />,
  AI: <FiCpu aria-hidden="true" />,
};

function ContactItem({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="w-9 h-9 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-text-soft uppercase tracking-wide">{label}</span>
        <span className="block text-sm text-text truncate">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} className={`flex items-center gap-3 hover:text-accent transition-colors ${focusRing}`}>
      {content}
    </a>
  ) : (
    <div className="flex items-center gap-3">{content}</div>
  );
}

export default function ResumePage() {
  const currentRole = experience[0];
  const yearsExperience = stats[0].value;

  return (
    <>
      <main id="main-content">
        <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
          <aside className="flex flex-col gap-6 md:sticky md:top-24">
            <div className="border border-border rounded-xl bg-surface p-6 flex flex-col items-center text-center">
              <div
                className="w-20 h-20 rounded-full bg-accent/10 border border-border flex items-center justify-center font-heading text-xl font-semibold text-accent mb-4"
                aria-hidden="true"
              >
                RK
              </div>
              <h1 className="font-heading text-lg font-semibold text-text">{siteConfig.name}</h1>
              <span className="mt-2 inline-block text-xs px-3 py-1 rounded-full border border-border text-text-soft">
                {siteConfig.role}
              </span>
            </div>

            <div className="border border-border rounded-xl bg-surface p-6 flex flex-col gap-5">
              <ContactItem icon={<FiMail aria-hidden="true" />} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <ContactItem icon={<FiPhone aria-hidden="true" />} label="Phone" value="[Add phone number]" />
              <ContactItem icon={<FiCalendar aria-hidden="true" />} label="Experience" value={`${yearsExperience} years`} />
              <ContactItem icon={<FiMapPin aria-hidden="true" />} label="Location" value={currentRole.location} />
            </div>

            <div className="border border-border rounded-xl bg-surface p-6">
              <p className="text-xs text-text-soft uppercase tracking-wide mb-4">Elsewhere</p>
              <div className="flex gap-3 text-text-soft">
                <a href={siteConfig.links.github} aria-label="GitHub" className={`hover:text-text transition-colors ${focusRing}`}>
                  <FiGithub size={18} aria-hidden="true" />
                </a>
                <a href={siteConfig.links.linkedin} aria-label="LinkedIn" className={`hover:text-text transition-colors ${focusRing}`}>
                  <FiLinkedin size={18} aria-hidden="true" />
                </a>
                <a href={siteConfig.links.leetcode} aria-label="LeetCode" className={`hover:text-text transition-colors ${focusRing}`}>
                  <SiLeetcode size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <a
              href={siteConfig.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-text text-bg hover:bg-accent transition-colors text-sm font-medium ${focusRing}`}
            >
              <FiDownload aria-hidden="true" /> Download PDF
            </a>
          </aside>

          <div className="flex flex-col gap-14 min-w-0">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-text mb-4">About Me</h2>
              <div className="w-10 h-0.5 bg-accent mb-6" aria-hidden="true" />
              <p className="text-base text-text-soft max-w-[65ch]">{aboutContent.intro}</p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-text mb-6">What I&apos;m Doing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {focusAreas.map((area) => (
                  <div key={area.title} className="border border-border rounded-xl bg-surface p-5 flex gap-4">
                    <span className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      {focusAreaIcons[area.title]}
                    </span>
                    <div>
                      <h3 className="text-sm font-medium text-text mb-1">{area.title}</h3>
                      <p className="text-xs text-text-soft">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-text mb-6">Skills</h2>
              <div className="flex flex-col gap-5">
                {skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-medium text-text-soft uppercase tracking-wide mb-2">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const entry = skillIcons[item];
                        const Icon = entry?.icon;
                        return (
                          <span
                            key={item}
                            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
                          >
                            {Icon && (
                              <Icon
                                aria-hidden="true"
                                className="w-3.5 h-3.5 shrink-0"
                                style={entry.color ? { color: entry.color } : undefined}
                              />
                            )}
                            {item}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-text mb-6">Experience</h2>
              <div className="flex flex-col gap-8">
                {experience.map((entry) => (
                  <div key={`${entry.company}-${entry.role}`} className="relative border-l-2 border-border pl-5">
                    <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-accent" aria-hidden="true" />
                    <p className="text-xs text-text-soft mb-1">
                      {entry.duration} · {entry.location}
                    </p>
                    <h3 className="text-sm font-medium text-text">
                      {entry.role} · {entry.company}
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-text-soft list-disc list-inside">
                      {entry.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

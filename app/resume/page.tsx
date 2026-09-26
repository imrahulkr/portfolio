import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiFileText,
  FiServer,
  FiCode,
  FiLayers,
  FiCpu,
  FiAward,
  FiExternalLink,
} from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { siteConfig } from "@/data/site-config";
import { experience } from "@/data/experience";
import { skills, focusAreas } from "@/data/skills";
import { skillIcons, genericSkillIcons } from "@/data/skill-icons";
import { stats } from "@/data/stats";
import { projects } from "@/data/projects";
import { achievements, certifications } from "@/data/achievements";
import { aboutContent } from "@/components/home/about";
import { Footer } from "@/components/layout/footer";
import { LeetCodeCard } from "@/components/home/leetcode-card";
import { CopyButton } from "@/components/ui/copy-button";

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

function ContactItem({
  icon,
  label,
  value,
  href,
  action,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  // Rendered beside the row rather than inside the link, since a button
  // can't be nested in an anchor.
  action?: ReactNode;
}) {
  const content = (
    <>
      <span className="w-9 h-9 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-xs text-text-soft uppercase tracking-wide">{label}</span>
        <span className="block text-sm text-text truncate">{value}</span>
      </span>
    </>
  );
  return (
    <div className="flex items-center gap-2">
      {href ? (
        <a href={href} className={`flex min-w-0 flex-1 items-center gap-3 hover:text-accent transition-colors ${focusRing}`}>
          {content}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-3">{content}</div>
      )}
      {action}
    </div>
  );
}

export default function ResumePage() {
  const currentRole = experience[0];
  const yearsExperience = stats[0].value;

  return (
    <>
      <main id="main-content">
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
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
              <ContactItem
                icon={<FiMail aria-hidden="true" />}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
                action={
                  <CopyButton
                    text={siteConfig.email}
                    label="Copy email address"
                    copiedLabel="Email address copied"
                    size={16}
                    className={`shrink-0 p-1 text-text-soft ${focusRing}`}
                  />
                }
              />
              <ContactItem icon={<FiPhone aria-hidden="true" />} label="Phone" value={siteConfig.phone} href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} />
              <ContactItem icon={<FiCalendar aria-hidden="true" />} label="Experience" value={`${yearsExperience} years`} />
              <ContactItem icon={<FiMapPin aria-hidden="true" />} label="Location" value={currentRole.location} />
            </div>

            <LeetCodeCard compact />

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
                <a href={`mailto:${siteConfig.email}`} aria-label="Email" className={`hover:text-text transition-colors ${focusRing}`}>
                  <FiMail size={18} aria-hidden="true" />
                </a>
                <a href={siteConfig.links.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF)" className={`hover:text-text transition-colors ${focusRing}`}>
                  <FiFileText size={18} aria-hidden="true" />
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
                      <ul className="flex flex-wrap gap-1.5" aria-label={area.description}>
                        {area.highlights.map((item) => {
                          const entry = skillIcons[item];
                          const BrandIcon = entry?.icon;
                          const GenericIcon = genericSkillIcons[item];
                          return (
                            <li
                              key={item}
                              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border border-border bg-bg text-text-soft"
                            >
                              {BrandIcon && (
                                <BrandIcon
                                  aria-hidden="true"
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={entry.color ? { color: entry.color } : undefined}
                                />
                              )}
                              {!BrandIcon && GenericIcon && (
                                <GenericIcon aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-accent" />
                              )}
                              {item}
                            </li>
                          );
                        })}
                      </ul>
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
                        const GenericIcon = genericSkillIcons[item];
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
                            {!Icon && GenericIcon && (
                              <GenericIcon aria-hidden="true" className="w-3.5 h-3.5 shrink-0 text-accent" />
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

            <div>
              <h2 className="font-heading text-xl font-semibold text-text mb-6">Projects</h2>
              <div className="flex flex-col gap-5">
                {projects.map((project) => (
                  <div key={project.slug} className="border border-border rounded-xl bg-surface p-5">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <h3 className="text-sm font-medium text-text">{project.title}</h3>
                      {project.status === "in-progress" && (
                        <span className="text-xs px-2 py-0.5 rounded-full border border-accent text-accent">
                          Currently building
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-soft mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-bg text-text-soft border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 text-xs">
                      <a
                        href={`/projects/${project.slug}`}
                        className={`flex items-center gap-1 text-accent hover:underline font-medium ${focusRing}`}
                      >
                        View case study <FiExternalLink aria-hidden="true" />
                      </a>
                      {project.github && (
                        <a href={project.github} className={`text-text-soft hover:text-text transition-colors ${focusRing}`}>
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} className={`text-text-soft hover:text-text transition-colors ${focusRing}`}>
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-text mb-6">Achievements &amp; Certifications</h2>
              <div className="flex flex-col gap-3">
                {[stats[2], stats[1]].map((stat) => (
                  <div key={stat.label} className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <FiAward aria-hidden="true" size={14} />
                    </span>
                    <p className="text-sm text-text pt-1.5">
                      <span className="font-medium text-accent">{stat.value}</span> {stat.label}
                    </p>
                  </div>
                ))}
                {achievements.map((achievement) => (
                  <div key={achievement} className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <FiAward aria-hidden="true" size={14} />
                    </span>
                    <p className="text-sm text-text pt-1.5">{achievement}</p>
                  </div>
                ))}
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <FiAward aria-hidden="true" size={14} />
                    </span>
                    <p className="text-sm text-text pt-1.5">{cert}</p>
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

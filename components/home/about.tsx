import { Reveal } from "@/components/ui/reveal";

export type AboutContent = {
  intro: string;
  currentlyBuilding: string;
  currentlyLearning: string;
  interestedIn: string;
};

export const aboutContent: AboutContent = {
  intro:
    "I'm a backend-leaning engineer who likes systems that stay boring in production — predictable, observable, and hard to break by accident.",
  currentlyBuilding: "[Add what you're currently building]",
  currentlyLearning: "[Add what you're currently learning]",
  interestedIn: "[Add what you're interested in]",
};

export function About({ content = aboutContent }: { content?: AboutContent }) {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20">
      <Reveal>
        <h2 className="font-heading text-xl font-semibold text-text mb-6">About</h2>
        <p className="text-base text-text-soft max-w-[65ch] mb-8">{content.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-text-soft mb-1.5">Currently building</p>
            <p className="text-text">{content.currentlyBuilding}</p>
          </div>
          <div>
            <p className="text-text-soft mb-1.5">Currently learning</p>
            <p className="text-text">{content.currentlyLearning}</p>
          </div>
          <div>
            <p className="text-text-soft mb-1.5">Interested in</p>
            <p className="text-text">{content.interestedIn}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

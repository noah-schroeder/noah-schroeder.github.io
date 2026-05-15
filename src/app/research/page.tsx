import type { Metadata } from "next";
import { getPublications } from "@/lib/data";
import PublicationCard from "@/components/PublicationCard";

export const metadata: Metadata = {
  title: "Research — Noah Lee Schroeder",
};

const areas = [
  {
    title: "Pedagogical Agents & Virtual Humans",
    description:
      "Pedagogical agents are on-screen characters embedded in learning environments to guide and motivate learners. My work investigates how agent design choices — persona, voice, gender, appearance, and expressed emotion — shape trust, perception, and learning outcomes. I use meta-analysis and controlled experiments to identify which design variables actually move the needle and which are myths.",
    keyPaperIds: ["W4416823136", "W4412594062", "W4402544340", "W3092141661"],
  },
  {
    title: "Multimedia Learning & Cognitive Science",
    description:
      "How should text, images, and audio be arranged in digital learning materials? I run theoretically-grounded meta-analyses synthesizing decades of experimental research to produce actionable insights for instructional design.",
    keyPaperIds: ["W2603090530", "W2794691683", "W4207047326", "W2945435832"],
  },
  {
    title: "Artificial Intelligence, Sensing & Learning Analytics",
    description:
      "Emerging AI tools open new ways to measure and respond to learner states in real time. My current work explores generative AI from multiple perspectives, and in the past I have explored wearable biosensors (EDA, heart rate, skin temperature) and machine learning models to infer cognitive load during problem-solving.",
    keyPaperIds: ["W4405893789", "W7133340772", "W4410379016", "W3080112302"],
  },
  {
    title: "Systematic Review Methods",
    description:
      "How can AI influence the systematic review process? I explore if and how we can use AI to facilitate reproducible systematic reviews.",
    keyPaperIds: ["W7142557847", "W4404206627", "W7148176216", "W4406745129"],
  },
];

export default function ResearchPage() {
  const pubs = getPublications();
  const pubMap = Object.fromEntries(pubs.map((p) => [p.id, p]));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-5xl text-stone-900 tracking-tight mb-3">Research</h1>
      <p className="text-stone-500 max-w-2xl mb-16 text-base leading-relaxed">
        My work sits at the intersection of cognitive science, educational
        technology, and artificial intelligence — asking how intelligent systems
        can be designed to improve human learning.
      </p>

      <div className="flex flex-col gap-16">
        {areas.map((area, index) => (
          <section
            key={area.title}
            style={{ animation: "fade-up 0.5s ease-out both", animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-baseline gap-5 mb-4">
              <span className="font-display text-7xl font-bold text-stone-100 select-none leading-none shrink-0" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-3xl text-stone-900 tracking-tight leading-tight">
                {area.title}
              </h2>
            </div>
            <p className="text-stone-600 leading-relaxed mb-6 max-w-3xl pl-5 border-l-2 border-teal-200 text-base">
              {area.description}
            </p>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
              Key Papers
            </h3>
            <div className="flex flex-col gap-3">
              {area.keyPaperIds
                .map((id) => pubMap[id])
                .filter(Boolean)
                .map((pub) => (
                  <PublicationCard key={pub.id} pub={pub} compact />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

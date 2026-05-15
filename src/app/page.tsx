import Image from "next/image";
import Link from "next/link";
import { getAuthor, getPublications } from "@/lib/data";
import MetricsBanner from "@/components/MetricsBanner";
import NodeGraph from "@/components/NodeGraph";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import PublicationCard from "@/components/PublicationCard";

const researchTags = [
  "Generative AI",
  "Pedagogical Agents",
  "Virtual Humans",
  "Meta-Analysis",
];

export default function Home() {
  const author = getAuthor();
  const publications = getPublications();

  return (
    <>
      {/* Hero — Bioluminescent Lab */}
      <section className="relative overflow-hidden bg-[#070d0c] py-12 md:py-20">
        <NodeGraph />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:gap-16">

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold text-cyan-400/70 tracking-widest uppercase mb-6"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "0ms" }}
              >
                Research Scientist · University of Florida
              </p>

              <h1
                className="font-display leading-none tracking-tight mb-5"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "80ms" }}
              >
                <span className="text-white text-6xl md:text-7xl lg:text-8xl block">Noah Lee</span>
                <span
                  className="block text-6xl md:text-7xl lg:text-8xl"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 25%, #67e8f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Schroeder
                </span>
              </h1>

              <p
                className="font-display italic text-xl md:text-2xl text-cyan-300/75 mb-7 leading-snug"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "160ms" }}
              >
                Designing intelligence for learning.
              </p>

              <p
                className="text-base text-white/50 max-w-lg leading-relaxed mb-9"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "220ms" }}
              >
                I study how people learn with artificial agents, virtual humans, and
                intelligent educational systems — using cognitive theory,
                meta-analysis, and AI to improve how we design technology for
                learning.
              </p>

              <div
                className="flex flex-wrap gap-2 mb-10"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "280ms" }}
              >
                {researchTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm border text-cyan-300/65 rounded-full px-3 py-1"
                    style={{ backgroundColor: "rgba(34,211,238,0.06)", borderColor: "rgba(34,211,238,0.2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="flex flex-wrap gap-4"
                style={{ animation: "hero-in 0.6s ease-out both", animationDelay: "340ms" }}
              >
                <Link
                  href="/publications/"
                  className="inline-flex items-center gap-2 bg-teal-500 text-white rounded-lg px-5 py-2.5 text-sm font-semibold hover:bg-teal-400 transition-colors"
                  style={{ boxShadow: "0 0 24px rgba(20,184,166,0.35), 0 4px 12px rgba(0,0,0,0.4)" }}
                >
                  View Publications
                </Link>
                <Link
                  href="/research/"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: "rgba(34,211,238,0.07)",
                    border: "1px solid rgba(34,211,238,0.25)",
                    color: "rgba(103,232,249,0.85)",
                  }}
                >
                  Research Areas
                </Link>
              </div>
            </div>

            {/* Headshot with bioluminescent glow */}
            <div
              className="shrink-0 order-first md:order-last mb-10 md:mb-0 relative"
              style={{ animation: "hero-in 0.7s ease-out both", animationDelay: "120ms" }}
            >
              {/* Outer bloom */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-40%",
                  background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Mid glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-15%",
                  background: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 65%)",
                  filter: "blur(12px)",
                }}
              />
              {/* Photo */}
              <div className="relative w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{ boxShadow: "0 0 0 1px rgba(34,211,238,0.25), 0 0 40px rgba(20,184,166,0.15)" }}
              >
                <Image
                  src="/images/headshot.jpg"
                  alt="Noah Lee Schroeder"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover object-center"
                  priority
                />
                {/* Light-leak overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(34,211,238,0.1) 0%, transparent 50%)" }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Metrics */}
      <MetricsBanner stats={author.summary_stats} worksCount={publications.length} />

      {/* Most Cited */}
      <section className="bg-[#fafaf8] border-t border-stone-100 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl text-stone-900 tracking-tight mb-1">
                Most-Cited Work
              </h2>
              <p className="text-sm text-stone-400">Sorted by citation count</p>
            </div>
            <Link
              href="/publications/"
              className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors shrink-0 ml-4"
            >
              All {publications.length} papers →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {publications
              .slice()
              .sort((a, b) => b.cited_by_count - a.cited_by_count)
              .slice(0, 5)
              .map((pub) => (
                <PublicationCard key={pub.id} pub={pub} />
              ))}
          </div>
        </div>
      </section>
      <ExperienceTimeline />
    </>
  );
}

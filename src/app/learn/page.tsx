import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Meta-Analysis — Noah Lee Schroeder",
};

const resources = [
  {
    type: "YouTube",
    title: "Learn Meta-Analysis on YouTube",
    description:
      "Free video tutorials covering the full workflow of systematic review and meta-analysis — from literature search and screening to effect-size calculation, forest plots, and publication bias. Designed for researchers at any experience level.",
    cta: "Watch on YouTube →",
    href: "https://www.youtube.com/@learnmetaanalysis",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-teal-600 fill-current" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    type: "Book",
    title: "Introduction to Systematic Review & Meta-Analysis",
    description:
      "A free, open-access textbook walking through every stage of a rigorous systematic review and meta-analysis. Covers research question formulation, search strategy, risk of bias assessment, and statistical synthesis — with practical examples throughout.",
    cta: "Read the Book →",
    href: "https://noah-schroeder.github.io/reviewbook/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9 text-teal-600 fill-current" aria-hidden>
        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
      </svg>
    ),
  },
];

export default function LearnPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-5xl text-stone-900 tracking-tight mb-3">
        Learn Meta-Analysis
      </h1>
      <p className="text-stone-500 max-w-2xl mb-14 text-base leading-relaxed">
        Free resources for researchers getting started with systematic review
        and meta-analysis — from first principles to full synthesis.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((resource, i) => (
          <article
            key={resource.type}
            style={{ animation: "fade-up 0.5s ease-out both", animationDelay: `${i * 100}ms` }}
            className="bg-white rounded-xl border border-stone-200 p-8 flex flex-col gap-5 hover:border-teal-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              {resource.icon}
              <span className="shrink-0 text-xs font-semibold uppercase tracking-widest border rounded-full px-2.5 py-0.5 bg-teal-50 text-teal-700 border-teal-200">
                {resource.type}
              </span>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <h2 className="font-display text-xl text-stone-900 leading-snug">
                {resource.title}
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                {resource.description}
              </p>
            </div>

            <a
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              {resource.cta}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

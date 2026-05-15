import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Software — Noah Lee Schroeder",
};

const tools = [
  {
    name: "Full-Text Finder",
    image: "/images/tool-full-text-finder.png",
    status: "active",
    description:
      "Automates the tedious step of locating open-access versions of papers in a reference list. Give it a CSV of references and it returns direct PDF links or the article landing page — saving hours during literature review.",
    tags: ["Unpaywall", "Open Access", "Literature Review"],
    github: "https://github.com/noah-schroeder/fulltextfinder",
    website: "https://noah-schroeder.github.io/fulltextfinder/",
  },
  {
    name: "AI-Assisted Data Extraction",
    image: "/images/tool-aide.png",
    status: "active",
    description:
      "An LLM-powered tool that reads PDFs and extracts structured coding data for systematic reviews and meta-analyses. Upload your coding schema, set up your AI tools, and upload your paper. The tool extracts data for you to review for your coding form — dramatically reducing the manual effort of primary study coding.",
    tags: ["LLM", "Systematic Review", "Data Extraction"],
    github: "https://github.com/noah-schroeder/AIDE-Web",
    website: "https://noah-schroeder.github.io/AIDE-Web/",
  },
  {
    name: "Simple Meta-Analysis",
    image: "/images/tool-simplema.png",
    status: "active",
    description:
      "A lightweight meta-analysis tool designed for researchers who need to run a quick effect-size synthesis without wrestling with R packages. Supports conventional and three-level meta-analysis, including robust variance estimation, with Hedge's g effect sizes with forest plot output, heterogeneity statistics (I², Q), and publication bias diagnostics.",
    tags: ["Statistics", "Meta-Analysis", "Forest Plot"],
    github: "https://github.com/noah-schroeder/simple_meta-analysis",
    website: null,
  },
];

const statusColors: Record<string, string> = {
  active: "bg-teal-50 text-teal-700 border-teal-200",
  beta: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-stone-100 text-stone-500 border-stone-200",
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function SoftwarePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-5xl text-stone-900 tracking-tight mb-3">Software</h1>
      <p className="text-stone-500 max-w-2xl mb-14 text-base leading-relaxed">
        I develop open-source tools to help researchers conduct more rigorous and
        efficient work — lowering the barrier to systematic review, meta-analysis,
        and open-access literature workflows without requiring specialized
        programming knowledge. All tools are free to use.
      </p>

      <div className="mb-6">
        <h2 className="font-display text-2xl text-stone-900 tracking-tight mb-1">
          Systematic Review Workflow Tools
        </h2>
        <p className="text-sm text-stone-400">
          Designed as a pipeline — from retrieving full texts, to extracting data, to running the analysis.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <article
            key={tool.name}
            style={{ animation: "fade-up 0.5s ease-out both", animationDelay: `${i * 100}ms` }}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col hover:border-teal-300 hover:shadow-md transition-all"
          >
            <div className="aspect-video overflow-hidden bg-stone-100">
              <Image
                src={tool.image}
                alt={`${tool.name} screenshot`}
                width={600}
                height={338}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-xl text-stone-900 leading-snug">
                  {tool.website ?? tool.github ? (
                    <a
                      href={tool.website ?? tool.github!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      {tool.name}
                    </a>
                  ) : tool.name}
                </h2>
                <span
                  className={`shrink-0 text-xs font-medium border rounded-full px-2 py-0.5 capitalize ${statusColors[tool.status]}`}
                >
                  {tool.status}
                </span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed flex-1">
                {tool.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-stone-100 text-stone-500 rounded-full px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href={tool.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors"
                  aria-label={`${tool.name} on GitHub`}
                >
                  <GitHubIcon />
                  GitHub
                </a>
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Open tool →
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

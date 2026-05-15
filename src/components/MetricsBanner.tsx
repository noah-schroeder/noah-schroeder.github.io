import type { SummaryStats } from "@/types";
import AnimatedCount from "./AnimatedCount";

const SCHOLAR_URL =
  "https://scholar.google.com/citations?user=W-Ij6voAAAAJ&hl=en";

interface Props {
  stats: SummaryStats;
  worksCount?: number;
}

export default function MetricsBanner({ stats, worksCount }: Props) {
  return (
    <div className="bg-white border-y border-stone-200">
      <div className="max-w-5xl mx-auto px-6 pt-5 pb-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <a
            href={SCHOLAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-2 group"
          >
            <span className="font-mono text-3xl font-bold text-teal-600 group-hover:text-teal-500 transition-colors leading-none">
              ↗
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 group-hover:text-teal-600 transition-colors">
              Google Scholar
            </span>
          </a>
        </div>
        <div>
          <p
            className="font-mono text-3xl font-bold text-teal-600 leading-none tabular-nums"
            style={{ textShadow: "0 0 20px rgba(45,212,191,0.35)" }}
          >
            <AnimatedCount target={worksCount ?? stats.works_count} />
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mt-1">Papers</p>
        </div>
        <div>
          <p
            className="font-mono text-3xl font-bold text-teal-600 leading-none tabular-nums"
            style={{ textShadow: "0 0 20px rgba(45,212,191,0.35)" }}
          >
            <AnimatedCount target={stats.h_index} />
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mt-1">h-index</p>
        </div>
        <div>
          <p
            className="font-mono text-3xl font-bold text-teal-600 leading-none tabular-nums"
            style={{ textShadow: "0 0 20px rgba(45,212,191,0.35)" }}
          >
            <AnimatedCount target={stats.i10_index} />
          </p>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mt-1">i10-index</p>
        </div>
      </div>
      <p className="text-center text-xs text-stone-300 pb-2">
        Data via{" "}
        <a
          href="https://openalex.org/authors/A5014375110"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-stone-500 transition-colors underline underline-offset-2"
        >
          OpenAlex
        </a>
        {" · "}Updated weekly
      </p>
    </div>
  );
}

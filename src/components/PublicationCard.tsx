import type { Publication } from "@/types";

interface Props {
  pub: Publication;
  compact?: boolean;
}

export default function PublicationCard({ pub, compact = false }: Props) {
  return (
    <article className="bg-white rounded-xl border border-stone-200 border-l-4 border-l-teal-200 p-5 hover:border-l-teal-500 hover:border-stone-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <a
            href={pub.doi ?? `https://openalex.org/${pub.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-stone-900 hover:text-teal-600 transition-colors leading-snug block"
          >
            {pub.title}
          </a>

          {!compact && (
            <p className="text-sm text-stone-500 mt-1.5">
              {pub.authors.join(", ")}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2">
            {pub.venue && (
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {pub.venue}
              </span>
            )}
            {pub.venue && <span className="text-stone-300" aria-hidden>·</span>}
            <span className="font-mono text-xs text-stone-400">{pub.year}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {pub.is_oa && (
            <span className="text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 whitespace-nowrap">
              Open Access
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

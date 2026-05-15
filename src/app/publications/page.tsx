import type { Metadata } from "next";
import { getAuthor, getPublications } from "@/lib/data";
import MetricsBanner from "@/components/MetricsBanner";
import PublicationsList from "@/components/PublicationsList";

export const metadata: Metadata = {
  title: "Publications — Noah Lee Schroeder",
};

export default function PublicationsPage() {
  const author = getAuthor();
  const publications = getPublications();

  return (
    <>
      <MetricsBanner stats={author.summary_stats} worksCount={publications.length} />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="font-display text-4xl text-stone-900 mb-2">
            Publications
          </h1>
          <p className="text-stone-500 text-sm">
            Last updated {author.last_updated} · data via{" "}
            <a
              href="https://openalex.org/authors/A5014375110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:underline"
            >
              OpenAlex
            </a>
          </p>
        </div>
        <PublicationsList publications={publications} />
      </div>
    </>
  );
}

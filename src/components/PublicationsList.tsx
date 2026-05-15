"use client";

import { useState, useMemo } from "react";
import type { Publication } from "@/types";
import PublicationCard from "./PublicationCard";

interface Props {
  publications: Publication[];
}

type SortKey = "citations" | "year_desc" | "year_asc";

export default function PublicationsList({ publications }: Props) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("year_desc");

  const years = useMemo(() => {
    const set = new Set(publications.map((p) => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(() => {
    const results = publications.filter((p) => {
      const matchesYear =
        yearFilter === "all" || p.year === Number(yearFilter);
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q)) ||
        (p.venue ?? "").toLowerCase().includes(q);
      return matchesYear && matchesQuery;
    });

    return results.sort((a, b) => {
      if (sort === "citations") return b.cited_by_count - a.cited_by_count;
      if (sort === "year_desc") return b.year - a.year;
      return a.year - b.year;
    });
  }, [publications, query, yearFilter, sort]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          placeholder="Search by title, author, or venue…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
        />
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-lg border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-colors"
        >
          <option value="citations">Most cited</option>
          <option value="year_desc">Newest first</option>
          <option value="year_asc">Oldest first</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
        {filtered.length} paper{filtered.length !== 1 ? "s" : ""}
        {query || yearFilter !== "all" ? " matching filters" : ""}
      </p>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.map((pub) => (
          <PublicationCard key={pub.id} pub={pub} />
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-12 font-display italic text-lg">
            No papers match your search.
          </p>
        )}
      </div>
    </div>
  );
}

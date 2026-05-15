#!/usr/bin/env node
/**
 * Fetches author metadata and publications from the OpenAlex API and writes
 * them to src/data/author.json and src/data/publications.json.
 *
 * Run manually:  node scripts/fetch-openalex.mjs
 * Run via CI:    triggered by the update-data GitHub Actions workflow
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const AUTHOR_ID = "A5014375110";
const BASE = "https://api.openalex.org";
// Adding an email to the polite pool gives higher rate limits (OpenAlex policy)
const MAILTO = "mailto=nschroeder@ufl.edu";
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), "../src/data");

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
  return res.json();
}

async function fetchAuthor() {
  const fields =
    "id,display_name,last_known_institutions,summary_stats,topics,works_count,cited_by_count";
  const data = await fetchJSON(
    `${BASE}/authors/${AUTHOR_ID}?select=${fields}&${MAILTO}`
  );

  const institution =
    data.last_known_institutions?.[0]?.display_name ?? "University of Florida";

  const topics = (data.topics ?? []).slice(0, 8).map((t) => ({
    name: t.display_name,
    count: t.count,
  }));

  return {
    id: AUTHOR_ID,
    name: data.display_name,
    institution,
    summary_stats: {
      h_index: data.summary_stats?.h_index ?? 0,
      i10_index: data.summary_stats?.i10_index ?? 0,
      cited_by_count: data.cited_by_count ?? 0,
      works_count: data.works_count ?? 0,
      "2yr_mean_citedness": data.summary_stats?.["2yr_mean_citedness"] ?? 0,
    },
    topics,
    last_updated: new Date().toISOString().split("T")[0],
  };
}

async function fetchAllWorks() {
  const select =
    "id,title,publication_year,cited_by_count,primary_location,authorships,doi,open_access";
  const works = [];
  let cursor = "*";

  while (cursor) {
    const url = `${BASE}/works?filter=author.id:${AUTHOR_ID}&sort=cited_by_count:desc&per-page=200&cursor=${cursor}&select=${select}&${MAILTO}`;
    const data = await fetchJSON(url);

    for (const w of data.results) {
      works.push({
        id: w.id.split("/").pop(),
        title: w.title ?? "Untitled",
        year: w.publication_year,
        cited_by_count: w.cited_by_count ?? 0,
        venue: w.primary_location?.source?.display_name ?? null,
        doi: w.doi ?? null,
        is_oa: w.open_access?.is_oa ?? false,
        authors: (w.authorships ?? [])
          .slice(0, 5)
          .map((a) => a.author?.display_name)
          .filter(Boolean),
      });
    }

    cursor = data.meta?.next_cursor ?? null;
    // Small delay to be polite to the API
    if (cursor) await new Promise((r) => setTimeout(r, 200));
  }

  return works;
}

async function main() {
  console.log("Fetching author metadata…");
  const author = await fetchAuthor();
  writeFileSync(
    join(DATA_DIR, "author.json"),
    JSON.stringify(author, null, 2) + "\n"
  );
  console.log(`  ✓ ${author.name} — h${author.summary_stats.h_index}, ${author.summary_stats.cited_by_count} citations`);

  console.log("Fetching publications…");
  const publications = await fetchAllWorks();
  writeFileSync(
    join(DATA_DIR, "publications.json"),
    JSON.stringify(publications, null, 2) + "\n"
  );
  console.log(`  ✓ ${publications.length} works written`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

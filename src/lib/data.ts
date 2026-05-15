import type { Author, Publication } from "@/types";
import authorJson from "@/data/author.json";
import publicationsJson from "@/data/publications.json";
import excludedIds from "@/data/exclude";

export function getAuthor(): Author {
  return authorJson as Author;
}

export function getPublications(): Publication[] {
  const excluded = new Set(excludedIds);
  return (publicationsJson as Publication[]).filter((p) => !excluded.has(p.id));
}

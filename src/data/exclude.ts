/**
 * OpenAlex work IDs to hide from the site (e.g. misattributed papers).
 * Find an ID by opening the paper on openalex.org — it's the W-number in the URL.
 * Example: https://openalex.org/works/W1234567890  →  add "W1234567890"
 *
 * This file is never overwritten by the weekly data fetch.
 */
const excludedIds: string[] = [
  "W263258957",
];

export default excludedIds;

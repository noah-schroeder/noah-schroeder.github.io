/**
 * OpenAlex work IDs to hide from the site (e.g. misattributed papers).
 * Find an ID by opening the paper on openalex.org — it's the W-number in the URL.
 * Example: https://openalex.org/works/W1234567890  →  add "W1234567890"
 *
 * This file is never overwritten by the weekly data fetch.
 */
const excludedIds: string[] = [
  "W263258957",
  "W2911809983", // Effective Grain-Size of Mastery-Style Online Homework Levels (Gutmann et al., 2019)
];

export default excludedIds;
export interface SummaryStats {
  h_index: number;
  i10_index: number;
  cited_by_count: number;
  works_count: number;
  "2yr_mean_citedness": number;
}

export interface Topic {
  name: string;
  count: number;
}

export interface Author {
  id: string;
  name: string;
  institution: string;
  summary_stats: SummaryStats;
  topics: Topic[];
  last_updated: string;
}

export interface Publication {
  id: string;
  title: string;
  year: number;
  cited_by_count: number;
  venue: string | null;
  doi: string | null;
  is_oa: boolean;
  authors: string[];
}

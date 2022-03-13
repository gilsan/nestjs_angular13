export interface movie {
  dates: { maximun: string; minimum: string };
  page: number;
  results: result[];
  total_pages: number;
  total_results: number;
}

export interface result {
  adult: string;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

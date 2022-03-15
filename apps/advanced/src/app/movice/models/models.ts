export interface MOVIE {
  dates: { maximun: string; minimum: string };
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
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

export interface MOVICEDETAIL {
  adult: string;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: GANRE[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  production_companies: COMPANY[];
  production_countries: COUNTRY[];
  release_date: string;
  revenue: number;
  runtime: number;
  poken_languages: LANGUAGE[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GANRE {
  id: number;
  name: string;
}

export interface COMPANY {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface COUNTRY {
  iso_31661_1: string;
  name: string;
}

export interface LANGUAGE {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TVLIST {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}

export interface TV {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface CONF {
  change_keys: string[];
  images: IMAGE;
}
export interface IMAGE {
  backdrop_sizes: string[];
  base_url: string;
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  secure_base_url: string;
  still_sizes: string[];
}

export interface Video {
  id: number;
  results: VIDEO[];
}

export interface VIDEO {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Image {
  id: number;
  backdrops: BACKDROP[];
  posters: POSTER[];
  logos: LOGO[];
}
export interface BACKDROP {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface LOGO {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface POSTER {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Credit {
  id: number;
  cast: CAST[];
  crew: CREW[];
}
export interface CAST {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface CREW {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Similar {
  results: SIMILAR[];
  total_pages: number;
  total_results: number;
}
export interface SIMILAR {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export interface Genres {
  genres: GENRES[];
}

export interface GENRES {
  id: number;
  name: string;
}

import type { Film } from '../types';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export function tmdbPosterUrl(posterPath: string | null | undefined): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

async function searchMoviePoster(apiKey: string, query: string, year?: string): Promise<string | null> {
  const params = new URLSearchParams({ api_key: apiKey, query });
  if (year) params.set('year', year);
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?${params}`);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const data = (await res.json()) as { results?: { poster_path?: string | null }[] };
  return data.results?.[0]?.poster_path ?? null;
}

async function searchTvPoster(apiKey: string, query: string, year?: string): Promise<string | null> {
  const params = new URLSearchParams({ api_key: apiKey, query });
  if (year) params.set('first_air_date_year', year);
  const res = await fetch(`https://api.themoviedb.org/3/search/tv?${params}`);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const data = (await res.json()) as { results?: { poster_path?: string | null }[] };
  return data.results?.[0]?.poster_path ?? null;
}

/** Live TMDB lookup only — do not persist the returned path on the Film record. */
export async function fetchTmdbPosterPath(film: Film, apiKey: string): Promise<string | null> {
  const year = film.releaseYear?.trim() || undefined;
  const primary = (film.originalTitle || film.turkishTitle || '').trim();
  if (!primary) return null;

  const secondary =
    film.turkishTitle && film.originalTitle && film.turkishTitle.trim() !== film.originalTitle.trim()
      ? film.turkishTitle.trim()
      : '';

  if (film.type === 'Movie') {
    let path = await searchMoviePoster(apiKey, primary, year);
    if (!path && secondary) path = await searchMoviePoster(apiKey, secondary, year);
    return path;
  }

  let path = await searchTvPoster(apiKey, primary, year);
  if (!path && secondary) path = await searchTvPoster(apiKey, secondary, year);
  return path;
}

import { EpisodeResponse } from '../types/episode';

export async function getEpisodes(page: number = 1): Promise<EpisodeResponse> {
  const url = `https://rickandmortyapi.com/api/episode/?page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 1, next: null, prev: null },
        results: []
      };
    }
    throw new Error('Failed to fetch episodes');
  }
  return response.json();
} 
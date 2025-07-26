import { CharacterResponse } from '../types/character';

export async function getCharacters(page: number = 1, name: string = '', species: string = ''): Promise<CharacterResponse> {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  if (name) url += `&name=${encodeURIComponent(name)}`;
  if (species) url += `&species=${encodeURIComponent(species)}`;
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      return {
        info: { count: 0, pages: 1, next: null, prev: null },
        results: []
      };
    }
    throw new Error('Failed to fetch characters');
  }
  return response.json();
} 
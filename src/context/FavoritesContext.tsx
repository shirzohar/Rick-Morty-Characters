import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Character } from '../types/character';

const FAVORITES_KEY = 'rickmorty_favorites';

interface FavoritesContextType {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (character: Character) => {
    setFavorites((prev) => (prev.some((c) => c.id === character.id) ? prev : [...prev, character]));
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((c) => c.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
}; 
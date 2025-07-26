import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/FavoritesList.module.css';

const FavoritesList: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <div className={styles.empty}>No favorites yet.</div>;
  }

  return (
    <ul className={styles.list}>
      {favorites.map((char) => (
        <li key={char.id} className={styles.item}>
          <img src={char.image} alt={char.name} className={styles.img} />
          <span className={styles.name}>{char.name}</span>
          <button className={styles.removeBtn} onClick={() => removeFavorite(char.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default FavoritesList; 
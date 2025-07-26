import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import styles from '../styles/FavoritesListDrawer.module.css';

const FAVORITES_BG_COLORS = [
  '#fffbe6', '#e6f7ff', '#f6ffed', '#fff0f6', '#f0f5ff', '#232946', '#fff', '#f7f8fa'
];

const FavoritesListDrawer: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [open, setOpen] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  const handleToggleBg = () => {
    setBgIndex((i) => (i + 1) % FAVORITES_BG_COLORS.length);
  };

  return (
    <div className={styles.drawerWrapper}>
      <button className={styles.favBtn} onClick={() => setOpen((o) => !o)}>
        <span className={styles.star}>★</span>
        <span className={styles.favText}>Favorites ({favorites.length})</span>
      </button>
      {open && (
        <div className={styles.drawerOverlay} onClick={() => setOpen(false)}>
          <div className={styles.drawer} style={{ background: FAVORITES_BG_COLORS[bgIndex] }} onClick={e => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <span>My Favorites</span>
              <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close">×</button>
            </div>
            <button className={styles.bgToggleBtn} onClick={handleToggleBg}>Change Background</button>
            <ul className={styles.favList}>
              {favorites.length === 0 && <li className={styles.empty}>No favorites yet.</li>}
              {favorites.map((char) => (
                <li key={char.id} className={styles.favItem}>
                  <img src={char.image} alt={char.name} className={styles.favImg} />
                  <span className={styles.favName}>{char.name}</span>
                  <button className={styles.removeBtn} onClick={() => removeFavorite(char.id)}>×</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesListDrawer; 
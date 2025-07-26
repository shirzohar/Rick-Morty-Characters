import React from 'react';
import { Character } from '../types/character';
import styles from '../styles/CharacterCard.module.css';
import { useFavorites } from '../context/FavoritesContext';

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(character.id);

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <div className={styles.card} onClick={onClick} tabIndex={0} role="button">
      <button
        className={favorite ? styles.favBtnActive : styles.favBtn}
        onClick={handleFavClick}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        style={{ position: 'absolute', top: 16, right: 16 }}
        tabIndex={-1}
      >
        ★
      </button>
      <img src={character.image} alt={character.name} className={styles.img} />
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{character.name}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard; 
import React, { useEffect, useState } from 'react';
import { Character } from '../types/character';
import styles from '../styles/CharacterModal.module.css';

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

interface LocationData {
  name: string;
  type: string;
  dimension: string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  const [originDetails, setOriginDetails] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    if (character.origin.url) {
      setLoading(true);
      setError('');
      fetch(character.origin.url)
        .then(res => res.json())
        .then(data => {
          if (!ignore) setOriginDetails({ name: data.name, type: data.type, dimension: data.dimension });
        })
        .catch(() => {
          if (!ignore) setError('Failed to load origin details');
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    } else {
      setOriginDetails(null);
    }
    return () => { ignore = true; };
  }, [character.origin.url]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <img src={character.image} alt={character.name} className={styles.img} />
        <div className={styles.info} style={{ textAlign: 'center', width: '100%' }}>
          <h2 className={styles.name}>{character.name}</h2>
          <div className={styles.meta}><b>Status:</b> {character.status}</div>
          <div className={styles.meta}><b>Species:</b> {character.species}</div>
          <div className={styles.meta}><b>Gender:</b> {character.gender}</div>
          <div className={styles.meta}><b>Origin:</b> {character.origin.name}</div>
          {character.origin.url && (
            loading ? <div className={styles.meta}>Loading origin details...</div> :
            error ? <div className={styles.meta}>{error}</div> :
            originDetails && (
              <>
                <div className={styles.meta}><b>Origin Type:</b> {originDetails.type || 'Unknown'}</div>
                <div className={styles.meta}><b>Origin Dimension:</b> {originDetails.dimension || 'Unknown'}</div>
              </>
            )
          )}
          <div className={styles.meta}><b>Location:</b> {character.location.name}</div>
          <div className={styles.meta}><b>Episodes:</b> {character.episode.length}</div>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>
  );
};

export default CharacterModal; 
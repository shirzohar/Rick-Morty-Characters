import React, { useEffect, useState, Suspense, lazy } from 'react';
import { getCharacters } from '../services/characterService';
import { Character } from '../types/character';
import CharacterCard from './CharacterCard';
import styles from '../styles/CharacterList.module.css';

const CharacterModal = lazy(() => import('./CharacterModal'));

interface CharacterListProps {
  search: string;
  species?: string;
}

const CharacterList: React.FC<CharacterListProps> = ({ search, species = '' }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<Character | null>(null);

  useEffect(() => {
    setLoading(true);
    setError('');
    getCharacters(page, search, species)
      .then((data) => {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      })
      .catch((err) => {
        setCharacters([]);
        setTotalPages(1);
        setError('No characters found.');
      })
      .finally(() => setLoading(false));
  }, [page, search, species]);

  useEffect(() => {
    setPage(1);
  }, [search, species]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!characters.length) return <div className={styles.empty}>No characters found.</div>;

  return (
    <div>
      <div className={styles.listGrid}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} onClick={() => setSelected(char)} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className={styles.pageBtn}>Prev</button>
        <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={styles.pageBtn}>Next</button>
      </div>
      {selected && (
        <Suspense fallback={<div>Loading...</div>}>
          <CharacterModal character={selected} onClose={() => setSelected(null)} />
        </Suspense>
      )}
    </div>
  );
};

export default CharacterList; 
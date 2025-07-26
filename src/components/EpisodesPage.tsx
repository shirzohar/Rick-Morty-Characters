import React from 'react';
import { getEpisodes } from '../services/episodeService';
import { Episode } from '../types/episode';
import styles from '../styles/EpisodesPage.module.css';

const EpisodesPage: React.FC = () => {
  const [episodes, setEpisodes] = React.useState<Episode[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    setLoading(true);
    setError('');
    getEpisodes(page)
      .then((data) => {
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      })
      .catch(() => {
        setEpisodes([]);
        setTotalPages(1);
        setError('No episodes found.');
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className={styles.episodesWrapper}>
      <h2 className={styles.episodesTitle}>Episodes</h2>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && episodes.length === 0 && <div className={styles.empty}>No episodes found.</div>}
      <div className={styles.episodesGrid}>
        {episodes.map((ep) => (
          <div key={ep.id} className={styles.episodeCard}>
            <div className={styles.episodeName}>{ep.name}</div>
            <div className={styles.episodeCode}>{ep.episode}</div>
            <div className={styles.episodeAir}>Air date: {ep.air_date}</div>
            <div className={styles.episodeChars}>Characters: <span style={{ fontWeight: 700 }}>{ep.characters.length}</span></div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className={styles.pageBtn}>Prev</button>
        <span className={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={styles.pageBtn}>Next</button>
      </div>
    </div>
  );
};
export default EpisodesPage; 
import React, { useState } from 'react';
import styles from '../styles/AboutPage.module.css';

const funFacts = [
  'The show was inspired by a Back to the Future parody.',
  'There are over 100 different Ricks in the multiverse.',
  'The portal gun is one of the most iconic items in the show.',
  'Pickle Rick is one of the most famous episodes.',
  'The creators often improvise dialogue.'
];

const rickInfo = `Rick Sanchez is a genius scientist and inventor, known for his reckless, nihilistic, and eccentric personality. He travels the multiverse with his grandson Morty, getting into wild adventures.`;
const mortyInfo = `Morty Smith is Rick's good-hearted but easily influenced grandson. He often finds himself in dangerous and bizarre situations due to Rick's experiments and adventures.`;

const AboutPage: React.FC = () => {
  const [fact, setFact] = useState('');
  const [showRick, setShowRick] = useState(false);
  const [showMorty, setShowMorty] = useState(false);

  const handleShowFact = () => {
    const idx = Math.floor(Math.random() * funFacts.length);
    setFact(funFacts[idx]);
  };

  return (
    <div className={styles.aboutWrapper} style={{ fontFamily: 'Segoe UI, Arial, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div className={styles.starsBg} />
      <div className={styles.aboutTitle + ' ' + styles.gradientAnim}>About This App</div>
      <div className={styles.seriesInfoBox + ' ' + styles.fadeIn}>
        <div className={styles.seriesTitle}>
          What is Rick & Morty?
          <button className={styles.infoBtn} onClick={() => setShowRick(true)}>Who is Rick?</button>
          <button className={styles.infoBtn} onClick={() => setShowMorty(true)}>Who is Morty?</button>
        </div>
        <div className={styles.svgAnim}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="#6366f1" strokeWidth="4" fill="#fff" />
            <ellipse cx="24" cy="24" rx="12" ry="16" fill="#b3c6ff">
              <animate attributeName="rx" values="12;14;12" dur="2s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="24" cy="24" r="8" fill="#fff" />
            <circle cx="20" cy="22" r="2" fill="#232946" />
            <circle cx="28" cy="22" r="2" fill="#232946" />
            <ellipse cx="24" cy="28" rx="4" ry="2" fill="#232946" />
          </svg>
        </div>
        <p className={styles.seriesText}>
          <b>Rick & Morty</b> is an animated sci-fi comedy series following the adventures of the eccentric scientist Rick Sanchez and his good-hearted but easily influenced grandson Morty Smith. Together, they travel across dimensions, encounter bizarre creatures, and get into wild, hilarious, and often dangerous situations.<br /><br />
          The show is known for its sharp humor, creative storytelling, and unique take on science fiction and pop culture.
        </p>
      </div>
      <button className={styles.funFactBtn} onClick={handleShowFact}>Show Fun Fact</button>
      {fact && <div className={styles.funFactBox + ' ' + styles.fadeIn}>{fact}</div>}
      <p className={styles.aboutDesc + ' ' + styles.fadeIn}>
        This app lets you explore Rick & Morty characters, search and filter them, browse episodes, and manage your favorites.<br />
        Enjoy a modern UI with dark/light mode and a smooth experience!
      </p>
      <div className={styles.aboutApi + ' ' + styles.fadeIn}>
        Data is fetched from the <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">Rick and Morty API</a>.
      </div>
      <p className={styles.aboutNote + ' ' + styles.fadeIn}>
        <b>Features:</b> Character search, favorites, episodes, dark/light mode, about page, and more.
      </p>
      {showRick && (
        <div className={styles.modalOverlay} onClick={() => setShowRick(false)}>
          <div className={styles.infoModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>Who is Rick?</div>
            <div className={styles.modalText}>{rickInfo}</div>
            <button className={styles.closeBtn} onClick={() => setShowRick(false)}>×</button>
          </div>
                  </div>
        )}
      {showMorty && (
        <div className={styles.modalOverlay} onClick={() => setShowMorty(false)}>
          <div className={styles.infoModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitle}>Who is Morty?</div>
            <div className={styles.modalText}>{mortyInfo}</div>
            <button className={styles.closeBtn} onClick={() => setShowMorty(false)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage; 
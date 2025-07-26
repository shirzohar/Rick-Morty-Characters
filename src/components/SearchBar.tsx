import React from 'react';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  history?: string[];
  onHistorySelect?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, className, history = [], onHistorySelect }) => {
  const [showHistory, setShowHistory] = React.useState(false);

  return (
    <div className={className ? `${styles.wrapper} ${className}` : styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search characters..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search characters"
        onFocus={() => setShowHistory(true)}
        onBlur={() => setTimeout(() => setShowHistory(false), 150)}
        autoComplete="off"
      />
      {showHistory && history.length > 0 && (
        <div className={styles.historyDropdown}>
          {history.map((item, idx) => (
            <div
              key={idx}
              className={styles.historyItem}
              onMouseDown={() => onHistorySelect && onHistorySelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
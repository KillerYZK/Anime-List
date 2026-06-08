import styles from './AnimeCard.module.css'

export default function AnimeCard({ title, score, episodes, type, rank, accentColor = '#ff2d78', placeholder }) {
  return (
    <div className={styles.card}>
      <div className={styles.thumb} style={{ '--accent': accentColor }}>
        <div className={styles.thumbPlaceholder}>
          <span>{placeholder || title?.slice(0, 2).toUpperCase()}</span>
        </div>
        <div className={styles.overlay}>
          <button className={styles.addBtn}>+</button>
        </div>
        {score && (
          <div className={styles.scoreBadge}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {score}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>
          {type && <span>{type}</span>}
          {episodes && <span>{episodes} eps</span>}
        </p>
      </div>
    </div>
  )
}

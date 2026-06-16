import styles from './AnimeCard.module.css'
import { Link } from 'react-router-dom'

export default function AnimeCard({ anime }) {
  if (!anime) return null;

  return (
    <Link to={`/anime/${anime.mal_id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.thumb} style={{ '--accent': '#ff2d78' }}>
          {/* Mostrar imagen del anime en lugar de placeholder */}
          {anime.images?.jpg?.large_image_url ? (
            <img 
              src={anime.images.jpg.large_image_url} 
              alt={anime.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div className={styles.thumbPlaceholder}>
              <span>{anime.title?.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
          
          <div className={styles.overlay}>
            <button className={styles.addBtn} onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}>+</button>
          </div>

          {/* Score del anime */}
          {anime.score && (
            <div className={styles.scoreBadge}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/> 
              </svg>
              {anime.score}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.title}>{anime.title}</p>
          <p className={styles.meta}>
            {anime.type && <span>{anime.type}</span>}
            {anime.episodes && <span>{anime.episodes} eps</span>}
          </p>
        </div>
      </div>
    </Link>
  )
}

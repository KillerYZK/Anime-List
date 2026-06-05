import AnimeCard from './AnimeCard'
import styles from './SeasonSection.module.css'

const SEASON_ANIME = [
  { id: 1, title: 'Yomi no Tsugai', score: '8.41', type: 'TV', episodes: 12, accentColor: '#e74c3c', placeholder: 'YT' },
  { id: 2, title: 'Tsue to Tsurugi no Wistoria Season 2', score: '8.15', type: 'TV', episodes: 13, accentColor: '#3498db', placeholder: 'TW' },
  { id: 3, title: 'Dr. Stone: Science Future Part 3', score: '8.62', type: 'TV', episodes: 11, accentColor: '#27ae60', placeholder: 'DS' },
  { id: 4, title: 'Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken 2', score: '8.30', type: 'TV', episodes: 13, accentColor: '#f39c12', placeholder: 'OT' },
  { id: 5, title: 'Classe de 2 Onnanoko Natta', score: '7.95', type: 'TV', episodes: 12, accentColor: '#9b59b6', placeholder: 'CL' },
  { id: 6, title: 'Chiikawa', score: '8.60', type: 'TV', episodes: null, accentColor: '#ff7eb3', placeholder: 'CH' },
]

export default function SeasonSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.label}>Primavera 2026</span>
          <h2 className={styles.title}>Temporada actual</h2>
        </div>
        <a href="#" className={styles.viewAll}>
          Ver todo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <div className={styles.grid}>
        {SEASON_ANIME.map(anime => (
          <AnimeCard key={anime.id} {...anime} />
        ))}
      </div>
    </section>
  )
}

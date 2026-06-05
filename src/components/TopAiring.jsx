import styles from './TopAiring.module.css'

const TOP_ANIME = [
  { rank: 1, title: 'Steel Ball Run: JoJo no Kimyou na Bouken', score: 9.13, members: '210,327', type: 'ONA', color: '#e74c3c' },
  { rank: 2, title: 'Re:Zero kara Hajimeru Isekai Seikatsu 4th Season', score: 8.97, members: '241,154', type: 'TV', color: '#3498db' },
  { rank: 3, title: 'One Piece', score: 8.73, members: '2,690,400', type: 'TV', color: '#f39c12' },
  { rank: 4, title: 'Tongari Boushi no Atelier', score: 8.72, members: '319,184', type: 'TV', color: '#9b59b6' },
  { rank: 5, title: 'Chiikawa', score: 8.60, members: '21,663', type: 'TV', color: '#ff7eb3' },
]

export default function TopAiring() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3 className={styles.blockTitle}>Top Airing</h3>
            <a href="#" className={styles.more}>Más →</a>
          </div>
          <ul className={styles.list}>
            {TOP_ANIME.map(item => (
              <li key={item.rank} className={styles.item}>
                <span className={styles.rank}>{item.rank}</span>
                <div className={styles.thumb} style={{ '--accent': item.color }}>
                  <span>{item.title.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemMeta}>
                    <span className={styles.itemType}>{item.type}</span>
                    <span className={styles.itemScore}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--pink)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {item.score}
                    </span>
                    <span>{item.members} miembros</span>
                  </p>
                </div>
                <button className={styles.addBtn} title="Agregar">+</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

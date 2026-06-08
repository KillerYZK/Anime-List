import styles from './TopAiring.module.css'

const COLORS = ['#e74c3c', '#3498db', '#f39c12', '#9b59b6', '#ff7eb3', '#1abc9c', '#e67e22', '#34495e']

export default function TopAiring({ animes }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.block}>
          <div className={styles.blockHeader}>
            <h3 className={styles.blockTitle}>Top Airing</h3>
            <a href="#" className={styles.more}>Más →</a>
          </div>
          <ul className={styles.list}>
            {animes.slice(0, 20).map((item, index) => {
              const color = COLORS[index % COLORS.length];
              
              return (
                <li key={item.mal_id} className={styles.item}>
                  <span className={styles.rank}>{index + 1}</span>
                  <div className={styles.thumb} style={{ '--accent': color }}>
                    {item.images?.jpg?.large_image_url ? (
                      <img 
                        src={item.images.jpg.large_image_url} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    ) : (
                      <span>{item.title.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemMeta}>
                      <span className={styles.itemType}>{item.type || 'N/A'}</span>
                      <span className={styles.itemScore}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--pink)">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        {item.score || 'N/A'}
                      </span>
                      {item.episodes && <span>{item.episodes} eps</span>}
                    </p>
                  </div>
                  <button className={styles.addBtn} title="Agregar">+</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Hero.module.css'

const COLORS = ['#c0392b', '#2980b9', '#8e44ad', '#e74c3c', '#f39c12']

export default function Hero({ animes = [] }) {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  const handlePrev = () => {
    setActive(prev => (prev - 1 + animes.length) % animes.length)
  }

  const handleNext = () => {
    setActive(prev => (prev + 1) % animes.length)
  }

  const handleViewDetails = () => {
    navigate(`/anime/${animes[active].mal_id}`)
  }

  useEffect(() => {
    if (!animes || animes.length === 0) return

    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % animes.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [animes.length])
  
  if (!animes || animes.length === 0) {
    return <div style={{ height: '500px' }}>Cargando...</div>
  }
  
  const current = animes[active]
  const color = COLORS[active % COLORS.length]

  return (
    <section className={styles.hero}>
      {/* Background glow */}
      <div className={styles.bgGlow} style={{ '--accent': color }} />

      <div className={styles.inner}>
        {/* Left: info */}
        <div className={styles.info}>
          <span className={styles.tag}>{current.type || 'TV'} · {current.airing?.status || 'En emisión'}</span>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{current.title}</h1>
          </div>
          <p className={styles.subtitle}>{current.title_english || ''}</p>
          <div className={styles.meta}>
            <span className={styles.score}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--pink)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {current.score || 'N/A'}
            </span>
            <span className={styles.genre}>
              {current.genres?.map(g => g.name).join(' • ') || 'Anime'}
            </span>
          </div>
          <p className={styles.desc}>{current.synopsis?.slice(0, 200)}...</p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={handleViewDetails}>Ver detalles</button>
            <button className={styles.btnSecondary}>+ Añadir lista</button>
          </div>
        </div>

        {/* Right: card */}
        <div className={styles.cardWrap}>
          <div className={styles.card} style={{ '--accent': color }}>
            {current.images?.jpg?.large_image_url ? (
              <img 
                src={current.images.jpg.large_image_url} 
                alt={current.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            ) : (
              <div className={styles.cardPlaceholder}>
                <span>{current.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
            <div className={styles.cardGlare} />
          </div>
          <div className={styles.cardShadow} style={{ '--accent': color }} />

          <div className={styles.heroNav}>
            <button type="button" className={styles.heroButton} onClick={handlePrev} aria-label="Anterior">
              ‹
            </button>
            <button type="button" className={styles.heroButton} onClick={handleNext} aria-label="Siguiente">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {animes.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  )
}

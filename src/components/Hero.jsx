import { useState } from 'react'
import styles from './Hero.module.css'

const FEATURED = [
  {
    id: 1,
    title: 'Steel Ball Run',
    subtitle: 'JoJo no Kimyou na Bouken',
    score: '9.13',
    genre: 'Aventura • Acción • Sobrenatural',
    desc: 'Una carrera a caballo a lo largo de Estados Unidos esconde secretos oscuros y poderes místicos en esta épica aventura.',
    tag: 'ONA · En emisión',
    color: '#c0392b',
    placeholder: 'SBR',
  },
  {
    id: 2,
    title: 'Re:Zero',
    subtitle: '4ta Temporada',
    score: '8.97',
    genre: 'Isekai • Drama • Fantasía',
    desc: 'Subaru Natsuki regresa con más desafíos y emociones en la continuación de este aclamado isekai.',
    tag: 'TV · 19 eps',
    color: '#2980b9',
    placeholder: 'RZ',
  },
  {
    id: 3,
    title: 'Tongari Boushi',
    subtitle: 'no Atelier',
    score: '8.72',
    genre: 'Magia • Aventura • Slice of Life',
    desc: 'Una joven descubre el mundo de la magia y los sombreros encantados en esta hermosa historia de crecimiento.',
    tag: 'TV · 13 eps',
    color: '#8e44ad',
    placeholder: 'TB',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const current = FEATURED[active]

  return (
    <section className={styles.hero}>
      {/* Background glow */}
      <div className={styles.bgGlow} style={{ '--accent': current.color }} />

      <div className={styles.inner}>
        {/* Left: info */}
        <div className={styles.info}>
          <span className={styles.tag}>{current.tag}</span>
          <h1 className={styles.title}>{current.title}</h1>
          <p className={styles.subtitle}>{current.subtitle}</p>
          <div className={styles.meta}>
            <span className={styles.score}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--pink)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {current.score}
            </span>
            <span className={styles.genre}>{current.genre}</span>
          </div>
          <p className={styles.desc}>{current.desc}</p>
          <div className={styles.actions}>
            <button className={styles.btnPrimary}>Ver detalles</button>
            <button className={styles.btnSecondary}>+ Añadir lista</button>
          </div>
        </div>

        {/* Right: card */}
        <div className={styles.cardWrap}>
          <div className={styles.card} style={{ '--accent': current.color }}>
            <div className={styles.cardPlaceholder}>
              <span>{current.placeholder}</span>
            </div>
            <div className={styles.cardGlare} />
          </div>
          <div className={styles.cardShadow} style={{ '--accent': current.color }} />
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {FEATURED.map((_, i) => (
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

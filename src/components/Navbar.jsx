import { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = ['Anime', 'Manga', 'Comunidad', 'Temporada', 'Top']

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <span className={styles.logoMain}>Ani</span>
          <span className={styles.logoAccent}>Verse</span>
        </a>

        {/* Links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link}>
              <a href="#" className={styles.link}>{link}</a>
            </li>
          ))}
        </ul>

        {/* Search + Actions */}
        <div className={styles.right}>
          <div className={`${styles.searchWrap} ${searchFocused ? styles.focused : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar anime, manga..."
              className={styles.searchInput}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          <a href="#" className={styles.loginBtn}>Entrar</a>
          <a href="#" className={styles.signupBtn}>Registrarse</a>

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

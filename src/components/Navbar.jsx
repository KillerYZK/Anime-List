import { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { name: 'Anime',
    submenu: [
      { name: 'Animes Populares' },
      { name: 'Animes De Temporada' },
      { name: 'Animes Mas Vistos' },
      { name: 'Animes Menos Vistos' },
    ]
   },
  { name: 'Manga',
    submenu: [
      { name: 'Mangas Populares' },
      { name: 'Mangas De Temporada' },
      { name: 'Mangas Mas Vistos' },
      { name: 'Mangas Menos Vistos' },
    ]
   },
]

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
            <li key={link.name} className={styles.navItem}>
              <a href="#" className={styles.link}>{link.name}</a>
              {link.submenu && (
                <ul className={styles.submenu}>
                  {link.submenu.map(sublink => (
                    <li key={sublink.name}>
                      <a href="#" className={styles.submenuLink}>
                        {sublink.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
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

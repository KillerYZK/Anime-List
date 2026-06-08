import { useState } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navLinks'

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMain}>Ani</span>
          <span className={styles.logoAccent}>Verse</span>
        </Link>

        {/* Links */}
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {NAV_LINKS.map(link => (
            <li key={link.name} className={styles.navItem}>
              <Link to={link.path} className={styles.link}>
                {link.name}
              </Link>
              {link.submenu && (
                <ul className={styles.submenu}>
                  {link.submenu.map(sublink => (
                    <li key={sublink.name}>
                      <Link to={sublink.path} className={styles.submenuLink}>
                        {sublink.name}
                      </Link>
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

          <Link to="/login" className={styles.loginBtn}>Entrar</Link>
          <Link to="/signup" className={styles.signupBtn}>Registrarse</Link>

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  )
}

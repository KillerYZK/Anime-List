import { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { NAV_LINKS } from '../../data/navLinks'

export default function Navbar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()

  // Función para manejar la tecla Enter en la búsqueda
  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const query = searchQuery.trim()
      if (query) {
        navigate(`/search?q=${encodeURIComponent(query)}`)
        setSearchFocused(false)
        setSearchQuery('')
        setSearchResults([])
      }
    }
  }

  // Función para manejar la selección de un resultado
  const handleSelectAnime = (anime) => {
    setSearchQuery('')
    setSearchResults([])
    setSearchFocused(false)
    navigate(`/anime/${anime.mal_id}`)
  }

  useEffect(() => {
    const controller = new AbortController()
    const delay = setTimeout(async () => {
      const query = searchQuery.trim()
      if (!query) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=8`,
          { signal: controller.signal }
        )
        const data = await response.json()
        setSearchResults(data.data || [])
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error de búsqueda:', error)
          setSearchResults([])
        }
      } finally {
        setIsSearching(false)
      }
    }, 450)

    return () => {
      clearTimeout(delay)
      controller.abort()
    }
  }, [searchQuery])

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onKeyDown={handleSearchKeyDown}
            />
            {(searchFocused || searchQuery.length > 0) && (
              <div className={styles.searchResults}>
                {isSearching ? (
                  <p>Cargando resultados…</p>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((anime) => (
                      <li
                        key={anime.mal_id}
                        className={styles.searchResultItem}
                        onMouseDown={() => handleSelectAnime(anime)}
                        onClick={() => handleSelectAnime(anime)}
                      >
                        {anime.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No se encontraron resultados</p>
                )}
              </div>
            )}
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
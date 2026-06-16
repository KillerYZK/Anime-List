import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './AnimeView.css'

export default function AnimeView() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [translatedSynopsis, setTranslatedSynopsis] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState(null)

  const translateText = async (text) => {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=${encodeURIComponent(text)}`
    )

    if (!response.ok) {
      throw new Error('Error al traducir texto')
    }

    const result = await response.json()
    return result[0]?.map(item => item[0]).join('') || ''
  }

  const handleSynopsisTranslate = async () => {
    if (translatedSynopsis) {
      setTranslatedSynopsis('')
      setTranslationError(null)
      return
    }

    if (!anime?.synopsis) return

    setIsTranslating(true)
    setTranslationError(null)

    try {
      const translated = await translateText(anime.synopsis)
      setTranslatedSynopsis(translated)
    } catch (err) {
      console.error(err)
      setTranslationError('No fue posible traducir la sinopsis. Intenta de nuevo más tarde.')
    } finally {
      setIsTranslating(false)
    }
  }

  const getTrailerSrc = (embedUrl) => {
    if (!embedUrl) return ''

    try {
      const url = new URL(embedUrl)
      const params = url.searchParams
      params.set('autoplay', '1')
      params.set('mute', '1')
      params.set('loop', '1')
      params.set('controls', '1')
      params.set('rel', '0')
      params.set('enablejsapi', '1')

      if (url.hostname.includes('youtube') && url.pathname.includes('/embed/')) {
        const videoId = url.pathname.split('/').pop()
        if (videoId) {
          params.set('playlist', videoId)
        }
      }

      url.search = params.toString()
      return url.toString()
    } catch (err) {
      console.error('Trailer URL parse error:', err)
      return embedUrl
    }
  }

  useEffect(() => {
    const obtenerAnime = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
        const data = await response.json()
        console.log('Anime data:', data.data)
        console.log('Trailer:', data.data?.trailer)
        setAnime(data.data)
        setCargando(false)
      } catch (err) {
        console.error('Error:', err)
        setError(err.message)
        setCargando(false)
      }
    }

    obtenerAnime()
  }, [id])

  if (cargando) return <div className="loading">Cargando información...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!anime) return <div className="error">No se encontró el anime</div>

  return (
    <div className="animeView">
      {/* Hero Background */}
      <div className="heroBg">
        {anime.trailer?.embed_url ? (
          <>
            <iframe
              key={anime.trailer.embed_url}
              className="trailerVideo"
              src={getTrailerSrc(anime.trailer.embed_url)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="trailer"
            />
            <div className="heroOverlay" />
          </>
        ) : (
          <>
            <div
              className="heroBgImage"
              style={{
                backgroundImage: `url(${anime.images?.jpg?.large_image_url || ''})`,
              }}
            />
            <div className="heroOverlay" />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="contentWrapper">
          {/* Left: Poster */}
          <div className="posterSection">
            <img
              src={anime.images?.jpg?.large_image_url || ''}
              alt={anime.title}
              className="poster"
            />
            <div className="actionButtons">
              <button className="btnPrimary">▶ Ver Ahora</button>
              <button className="btnSecondary">+ Mi Lista</button>
            </div>
          </div>

          {/* Right: Info */}
          <div className="infoSection">
            <div className="titleArea">
              <h1 className="mainTitle">{anime.title}</h1>
              {anime.title_japanese && (
                <p className="subtitleJp">{anime.title_japanese}</p>
              )}
            </div>

            {/* Score & Meta */}
            <div className="ratingRow">
              <div className="scoreCard">
                <span className="label">Score</span>
                <span className="value">
                  ★ {anime.score || 'N/A'}
                </span>
              </div>
              <div className="metaCard">
                <span className="label">Tipo</span>
                <span className="value">{anime.type || 'N/A'}</span>
              </div>
              <div className="metaCard">
                <span className="label">Episodios</span>
                <span className="value">{anime.episodes || 'N/A'}</span>
              </div>
              <div className="metaCard">
                <span className="label">Estado</span>
                <span className="value">{anime.status || 'N/A'}</span>
              </div>
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="synopsisSection">
                <div className="synopsisHeader">
                  <h3>Sinopsis</h3>
                  <button
                    className="btnSecondary"
                    onClick={handleSynopsisTranslate}
                    disabled={isTranslating}
                  >
                    {translatedSynopsis ? 'Ver original' : isTranslating ? 'Traduciendo...' : 'Traducir al español'}
                  </button>
                </div>
                <p>{translatedSynopsis || anime.synopsis}</p>
                {translationError && <p className="error">{translationError}</p>}
              </div>
            )}

            {/* Details Grid */}
            <div className="detailsGrid">
              {anime.aired?.string && (
                <div className="detail">
                  <span className="label">Periodo de Emisión</span>
                  <span className="value">{anime.aired.string}</span>
                </div>
              )}
              
              {anime.studios && anime.studios.length > 0 && (
                <div className="detail">
                  <span className="label">Estudio</span>
                  <span className="value">
                    {anime.studios.map(s => s.name).join(', ')}
                  </span>
                </div>
              )}

              {anime.source && (
                <div className="detail">
                  <span className="label">Fuente</span>
                  <span className="value">{anime.source}</span>
                </div>
              )}

              {anime.season && (
                <div className="detail">
                  <span className="label">Temporada</span>
                  <span className="value">
                    {anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} {anime.year}
                  </span>
                </div>
              )}
            </div>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div className="genresSection">
                <h3>Géneros</h3>
                <div className="genresList">
                  {anime.genres.map(genre => (
                    <span key={genre.mal_id} className="genreTag">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Info Sections */}
      <div className="additionalInfo">
        <div className="container">
          {/* Producer */}
          {anime.producers && anime.producers.length > 0 && (
            <div className="infoBlock">
              <h3>Productores</h3>
              <div className="tagsList">
                {anime.producers.map(producer => (
                  <span key={producer.mal_id} className="tag">
                    {producer.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Characters */}
          {anime.rating && (
            <div className="infoBlock">
              <h3>Clasificación</h3>
              <p>{anime.rating}</p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
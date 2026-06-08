import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopAiring from './components/TopAiring';
import AnimeCard from './components/AnimeCard';

function App() {
  const [animes, setAnimes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAnimes = async () => {
      try {
        // Obtener anime actual (airing)
        const respuesta = await fetch('https://api.jikan.moe/v4/seasons/now?limit=25');
        const { data } = await respuesta.json();
        
        setAnimes(data);
        setCargando(false);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        setCargando(false);
      }
    };

    obtenerAnimes();
  }, []);

  if (cargando) return <div>Cargando animes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <Navbar />
      <Hero animes={animes} />
      <TopAiring animes={animes} />
    </div>
  );
}

export default App;

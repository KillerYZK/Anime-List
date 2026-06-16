import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AnimeView from './pages/AnimeView';
import Home from './pages/Home';
import Anime from './pages/Anime';
import Manga from './pages/Manga';

function App() {
  const [animes, setAnimes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerAnimes = async () => {
      try {
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
      <Routes>
        <Route path="/" element={<Home animes={animes} />} />
        <Route path="/anime/:id" element={<AnimeView />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
      </Routes>
    </div>
  );
}

export default App;

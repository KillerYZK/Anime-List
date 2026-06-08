import Navbar from './components/Navbar'
import Home from './pages/Home'
import Anime from './pages/Anime'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </BrowserRouter>
  )
}
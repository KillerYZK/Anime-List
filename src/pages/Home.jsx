import Hero from '../components/Hero'
import SeasonSection from '../components/SeasonSection'
import TopAiring from '../components/TopAiring'

export default function Home({ animes }) {
  return (
    <>
      <Hero animes={animes} />
      <SeasonSection />
      <TopAiring animes={animes} />
    </>
  )
}
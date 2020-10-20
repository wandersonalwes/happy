import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import { Container } from '../styles/pages/landing'

const Home = () => {
  return (
    <Container>
      <div className="content-wrapper">
        <img src="/images/logo.svg" alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>

          <div className="location">
            <strong>Goiânia</strong>
            <span>Goiás</span>
          </div>

          <Link href="/app">
            <a className="enter-app">
              <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
            </a>
          </Link>
        </main>
      </div>
    </Container>
  )
}

export default Home

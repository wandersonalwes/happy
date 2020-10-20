import Link from 'next/link'
import dynamic from 'next/dynamic'
import { FiPlus } from 'react-icons/fi'

import api from '../services/api'

import { Container } from '../styles/pages/app'

const MapWithNoSSR = dynamic(() => import('../components/map'), {
  ssr: false
})

const App = ({ orphanages }) => {
  return (
    <Container>
      <aside>
        <header>
          <img src="/images/map-marker.svg" alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Goiânia</strong>
          <span>Goiás</span>
        </footer>
      </aside>

      <MapWithNoSSR data={orphanages}>{''}</MapWithNoSSR>

      <Link href="/orphanages/create">
        <a className="create-orphanage">
          <FiPlus size={32} color="#fff" />
        </a>
      </Link>
    </Container>
  )
}

export default App

export async function getServerSideProps() {
  const { data } = await api.get('/orphanages')
  const orphanages = data
  return {
    props: { orphanages }
  }
}

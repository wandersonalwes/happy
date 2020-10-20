import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useRouter } from 'next/router'

import { Container } from '../styles/components/sidebar'

const Sidebar: React.FC = () => {
  const { back } = useRouter()
  return (
    <Container>
      <img src="/images/map-marker.svg" alt="Happy" />

      <footer>
        <button type="button" onClick={back}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </Container>
  )
}

export default Sidebar

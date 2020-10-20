import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiClock, FiInfo } from 'react-icons/fi'
import dynamic from 'next/dynamic'
import Sidebar from '../../components/sidebar'
import { Orphanage } from '../../types'
import { InferGetStaticPropsType } from 'next'

import api from '../../services/api'

import { Container } from '../../styles/pages/orphanage'

const MapWithNoSSR = dynamic(() => import('../../components/map'), {
  ssr: false
})

export default function OrphanagePage({
  orphanage
}: InferGetStaticPropsType<typeof getServerSideProps>): JSX.Element {
  const [activeImage, setActiveImage] = useState(orphanage.images[0].url)

  return (
    <Container>
      <div id="page-orphanage">
        <Sidebar />

        <main>
          <div className="orphanage-details">
            <img src={activeImage} alt="" />

            <div className="images">
              {orphanage.images.map(image => (
                <button
                  key={image.id}
                  className={image.url === activeImage ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveImage(image.url)}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              ))}
            </div>

            <div className="orphanage-details-content">
              <h1>{orphanage.name}</h1>
              <p>{orphanage.about}</p>

              <div className="map-container">
                <MapWithNoSSR
                  center={[orphanage.latitude, orphanage.longitude]}
                  data={[orphanage]}
                  style={{ width: '100%', height: '280px' }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  popupVisible={false}
                >
                  {' '}
                </MapWithNoSSR>

                <footer>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${orphanage.latitude},${orphanage.longitude}`}
                  >
                    Ver rotas no Google Maps
                  </a>
                </footer>
              </div>

              <hr />

              <h2>Instruções para visita</h2>
              <p>{orphanage.instructions}</p>

              <div className="open-details">
                <div className="hour">
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  8h às 18h
                </div>

                {orphanage.open_on_weekends && (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                )}

                {!orphanage.open_on_weekends && (
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não Atendemos <br />
                    fim de semana
                  </div>
                )}
              </div>

              <button type="button" className="contact-button">
                <FaWhatsapp size={20} color="#FFF" />
                Entrar em contato
              </button>
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}

export async function getServerSideProps({ params }) {
  const { data } = await api.get(`/orphanages/${params.id}`)

  const orphanage: Orphanage = data

  return {
    props: {
      orphanage
    }
  }
}

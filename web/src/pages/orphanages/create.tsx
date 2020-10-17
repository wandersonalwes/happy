import { FormEvent, ChangeEvent, useState } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '../../components/Sidebar'
import { FiPlus } from 'react-icons/fi'
import { LeafletMouseEvent } from 'leaflet'
import { useRouter } from 'next/router'
import api from '../../services/api'

import { Container } from '../../styles/pages/CreateOrphanage'

const MapWithNoSSR = dynamic(() => import('../../components/Map'), {
  ssr: false
})

export default function CreateOrphanage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setLatitude(lat)
    setLongitude(lng)
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('opening_hours', opening_hours)

    images.forEach(image => {
      data.append('images', image)
    })

    await api.post('orphanages', data)

    router.push('/app')
  }

  return (
    <Container>
      <div id="page-create-orphanage">
        <Sidebar />

        <main>
          <form onSubmit={handleSubmit} className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <MapWithNoSSR
                style={{ width: '100%', height: '280px' }}
                onclick={handleMapClick}
                markerPosition={[latitude, longitude]}
              >
                {' '}
              </MapWithNoSSR>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">
                  Sobre <span>Máximo de 300 caracteres</span>
                </label>
                <textarea
                  id="name"
                  maxLength={300}
                  value={about}
                  onChange={event => setAbout(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>
                <div className="images-container">
                  {previewImages.map((image, index) => (
                    <div key={image}>
                      <img src={image} />
                    </div>
                  ))}

                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>

                  <input
                    multiple
                    onChange={handleSelectImages}
                    type="file"
                    id="image[]"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={event => setInstructions(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Horário de funcionamento</label>
                <input
                  id="opening_hours"
                  value={opening_hours}
                  onChange={event => setOpeningHours(event.target.value)}
                />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={open_on_weekends ? 'active' : ''}
                    onClick={() => setOpenOnWeekends(true)}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!open_on_weekends ? 'active' : ''}
                    onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>

            <button className="confirm-button" type="submit">
              Confirmar
            </button>
          </form>
        </main>
      </div>
    </Container>
  )
}

export interface Image {
  id: number
  url: string
}

export interface Orphanage {
  id: number
  name: string
  about: string
  instructions: string
  latitude: number
  longitude: number
  opening_hours: string
  open_on_weekends: boolean
  images: Image[]
}

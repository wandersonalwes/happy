import Leaflet from 'leaflet'

const mapIcon = Leaflet.icon({
  iconUrl: '/images/map-marker.svg',

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default mapIcon

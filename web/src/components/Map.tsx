import React from 'react'
import Link from 'next/link'
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  MapProps,
  MapEvents
} from 'react-leaflet'
import { FiArrowRight } from 'react-icons/fi'
import mapIcon from '../utils/mapIcon'
import { Orphanage } from '../types'

interface MyMapProps extends MapProps, MapEvents {
  data?: Orphanage[]
  style?: React.CSSProperties
  popupVisible?: boolean
  markerPosition?: [number, number]
}

const MyMap: React.FC<MyMapProps> = ({
  data,
  popupVisible = true,
  children,
  markerPosition,
  ...rest
}) => {
  return (
    <Map
      center={[-16.687463, -49.217119]}
      zoom={15}
      style={{ width: '100%', height: '100%' }}
      {...rest}
    >
      {children}
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      />
      {data &&
        data.map(orphanage => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            {popupVisible && (
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                minHeight={240}
              >
                {orphanage.name}
                <Link
                  href="/orphanages/[id]"
                  as={`/orphanages/${orphanage.id}`}
                >
                  <a>
                    <FiArrowRight size={20} color="#fff" />
                  </a>
                </Link>
              </Popup>
            )}
          </Marker>
        ))}

      {!data && (
        <Marker
          icon={mapIcon}
          position={[markerPosition[0], markerPosition[1]]}
        ></Marker>
      )}
    </Map>
  )
}

export default MyMap

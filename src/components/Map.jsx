import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';

import { useCities } from '../contexts/CitiesContext';

import styles from './Map.module.css';
import { useEffect } from 'react';

function Map() {
  const { cities } = useCities();

  // Position for Leaflet
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Hook from react-router which allows us to get data from the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Mind breaking, returns string. For using in prop position it must be number
  const mapLat = Number(searchParams.get('lat'));
  const mapLng = Number(searchParams.get('lng'));

  // We want to remember lat and lng values for rendering current position on map.
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {/* mapLat || DEFAULT POSITION */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Custom component for changing position on map
function ChangeCenter({ position }) {
  // Hook by Leaflet
  const map = useMap();
  map.setView(position, 6);

  return null;
}

function DetectClick() {
  // Hook from react-router which allows us to programmatically navigate user to needed us URL
  const navigate = useNavigate();

  // Hook by Leaflet
  // Put data from event of useMapEvents to url for accessing it into form component
  // Making query string
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;

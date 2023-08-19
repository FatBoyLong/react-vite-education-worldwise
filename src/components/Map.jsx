// React libraries` imports
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

// Side libraries` imports
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';

// Custom hooks` imports
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';

// Styles` imports
import styles from './Map.module.css';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlposition';

function Map() {
  const { cities } = useCities();

  // Position for Leaflet
  const [mapPosition, setMapPosition] = useState([40, 0]);

  // Custom hook useGeolocation
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // Custom hook useUrlPosition
  const [mapLat, mapLng] = useUrlPosition();

  // We want to remember lat and lng values for rendering current position on map.
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading' : 'Use your position'}
        </Button>
      )}
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

import { useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  // Hook from react-router which allows us to get data from the URL
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button>Change position</button>
    </div>
  );
}

export default Map;
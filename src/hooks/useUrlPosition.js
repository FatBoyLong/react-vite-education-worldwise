import { useSearchParams } from 'react-router-dom';

export function useUrlPosition() {
  // Hook from react-router which allows us to get data from the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Mind breaking, returns string. For using in prop position it must be number
  const lat = Number(searchParams.get('lat'));
  const lng = Number(searchParams.get('lng'));
  return [lat, lng];
}

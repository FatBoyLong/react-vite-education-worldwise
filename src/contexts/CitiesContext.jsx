import { useContext } from 'react';
import { createContext, useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        setCities(data);
      } catch (err) {
        throw new Error('There was an error loading data...');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{ cities, setCities, isLoading, setIsLoading }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export default CitiesProvider;

// Custom hook for getting Cities Context
export function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('The context was used outside of the Provider Component');

  return context;
}

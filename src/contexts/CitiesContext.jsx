import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext, useEffect } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'cities/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => action.payload !== city.id),
        currentCity: {},
      };

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  // COMMENTED AFTER REFACTORING TO USEREDUCER
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // // Piece of state of City.jsx
  // const [currentCity, setCurrentCity] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity, error } = state;

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data...',
        });
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === id) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading cities...',
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'cities/created', payload: data });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading city...',
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });

      // Don`t need to store result of deleting by await
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'cities/deleted', payload: id });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting city...',
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
      }}
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

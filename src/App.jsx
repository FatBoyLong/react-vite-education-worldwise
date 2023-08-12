import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

const BASE_URL = 'http://localhost:9000';

function App() {
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
    <BrowserRouter>
      <Routes>
        {/* path="/" is root path */}
        <Route path="/" element={<Homepage />} />

        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          {/* Index Route (default route) */}
          <Route index element={<Navigate replace to="cities" />} />

          {/* Nested Route */}
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />

          {/* /:NAME (NAME CAN BE ANYTHING), later it will be key of param */}
          <Route path="cities/:id" element={<City />} />

          {/* Nested Route */}
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />

          {/* Nested Route */}
          <Route path="form" element={<Form />} />
        </Route>

        {/* path="*" displays if not matched rout exists */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

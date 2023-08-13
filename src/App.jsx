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
import CitiesProvider from './contexts/CitiesContext';

function App() {
  return (
    <CitiesProvider>
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
            <Route path="cities" element={<CityList />} />

            {/* /:NAME (NAME CAN BE ANYTHING), later it will be key of param */}
            <Route path="cities/:id" element={<City />} />

            {/* Nested Route */}
            <Route path="countries" element={<CountryList />} />

            {/* Nested Route */}
            <Route path="form" element={<Form />} />
          </Route>

          {/* path="*" displays if not matched rout exists */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;

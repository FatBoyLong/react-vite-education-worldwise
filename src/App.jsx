import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CitiesProvider from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';

// Commented for making bundle lazy loading
// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from './pages/PageNotFound';
// import AppLayout from './pages/AppLayout';
// import Login from './pages/Login';

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

const Homepage = lazy(() => import('./pages/Homepage'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/* Suspense - ожидание, React API. */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* path="/" is root path */}
              <Route path="/" element={<Homepage />} />

              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

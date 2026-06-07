import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Assets/context/AuthContext.jsx';
import { CartProvider } from './Assets/context/CartContext.jsx';
import './Assets/Styles/Pages/HomePage.css'; 

// Importação das Páginas
import HomePage from './Assets/Pages/HomePage';
import StorePage from './Assets/Pages/Store';
import CustomOrderPage from './Assets/Pages/CustomOrder';
import Coupons from "./Assets/Pages/Coupons";
import Checkout from "./Assets/Pages/Checkout";

// Importação do nosso novo Componente Global
import Footer from "./Assets/components/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/custom" element={<CustomOrderPage />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />  
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
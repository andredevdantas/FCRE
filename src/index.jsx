import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Assets/Styles/Pages/HomePage.css';
import HomePage from './Assets/Pages/HomePage';
import StorePage from './Assets/Pages/Store';
import CustomOrderPage from './Assets/Pages/CustomOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/custom" element={<CustomOrderPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);

// src/pages/home/hooks/useHome.js
import { useState, useEffect } from 'react';
import { getBanners, getLibrosPopulares } from '../services/homeService';

// Datos públicos que arma el Home: el primer banner activo y unos cuantos
// libros populares para la vitrina de "recomendados".
export const useHome = () => {
  const [banners, setBanners] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    getBanners().then(setBanners).catch(() => setBanners([]));
    getLibrosPopulares(6).then(setLibros);
  }, []);

  return { banners, libros };
};

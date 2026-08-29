// src/pages/home/hooks/useHome.js
import { useState, useEffect } from 'react';
import { getBanners, getLibrosPopulares } from '../services/homeService';
import { getAll as getAutores } from '../../../services/api/autores.api';
import { getAll as getEditoriales } from '../../../services/api/editoriales.api';

// Datos públicos que arma el Home: el primer banner activo, unos cuantos
// libros populares para la vitrina de "recomendados", y todos los autores y
// editoriales para los carruseles.
export const useHome = () => {
  const [banners, setBanners] = useState([]);
  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);

  useEffect(() => {
    getBanners().then(setBanners).catch(() => setBanners([]));
    getLibrosPopulares({ limit: 6 }).then(setLibros);
    getAutores({ limit: 200 }).then(({ items }) => setAutores(items));
    getEditoriales({ limit: 200 }).then(({ items }) => setEditoriales(items));
  }, []);

  return { banners, libros, autores, editoriales };
};

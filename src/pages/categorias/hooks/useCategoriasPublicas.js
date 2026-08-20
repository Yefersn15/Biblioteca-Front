// src/pages/categorias/hooks/useCategoriasPublicas.js
import { useState, useEffect } from 'react';
import { getAll } from '../../../services/api/categorias.api';

export const useCategoriasPublicas = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll({ limit: 200 }).then(({ items }) => {
      setCategorias(items);
      setLoading(false);
    });
  }, []);

  return { categorias, loading };
};

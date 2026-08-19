// src/pages/autores/hooks/useAutoresPublicos.js
import { useState, useEffect } from 'react';
import { getAll } from '../services/autoresService';

export const useAutoresPublicos = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll({ limit: 200 }).then(({ items }) => {
      setAutores(items);
      setLoading(false);
    });
  }, []);

  return { autores, loading };
};

// src/pages/prestamos/hooks/useMisPrestamos.js
import { useState, useEffect } from 'react';
import { getPrestamos } from '../services/prestamosService';

export const useMisPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrestamos({ limit: 100 }).then(({ items }) => {
      setPrestamos(items);
      setLoading(false);
    });
  }, []);

  return { prestamos, loading };
};

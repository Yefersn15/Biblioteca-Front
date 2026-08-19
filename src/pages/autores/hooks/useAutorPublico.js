// src/pages/autores/hooks/useAutorPublico.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/autoresService';
import { getLibros } from '../../../services/api/libros.api';

export const useAutorPublico = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getById(id), getLibros({ autorId: id, limit: 50 })]).then(([a, { items }]) => {
      setAutor(a);
      setLibros(items);
      setLoading(false);
    });
  }, [id]);

  return { autor, libros, loading };
};

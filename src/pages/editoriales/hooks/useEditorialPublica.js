// src/pages/editoriales/hooks/useEditorialPublica.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/editorialesService';
import { getLibros } from '../../../services/api/libros.api';

export const useEditorialPublica = () => {
  const { id } = useParams();
  const [editorial, setEditorial] = useState(null);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getById(id), getLibros({ editorialId: id, limit: 100 })]).then(([e, { items }]) => {
      setEditorial(e);
      setLibros(items);
      setLoading(false);
    });
  }, [id]);

  return { editorial, libros, loading };
};

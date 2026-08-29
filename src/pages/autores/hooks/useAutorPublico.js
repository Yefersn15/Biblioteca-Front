// src/pages/autores/hooks/useAutorPublico.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../services/autoresService';
import { getLibros } from '../../../services/api/libros.api';
import { getAll as getCategorias } from '../../../services/api/categorias.api';

export const useAutorPublico = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [libros, setLibros] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getById(id), getLibros({ autorId: id, limit: 100 }), getCategorias({ limit: 200 })]).then(
      ([a, { items }, { items: categorias }]) => {
        setAutor(a);
        setLibros(items);
        setGeneros(categorias.filter((c) => a.generoLiterario?.includes(c.id)));
        setLoading(false);
      },
    );
  }, [id]);

  const obrasDestacadas = libros.filter((l) => autor?.obrasDestacadas?.includes(l.id));

  return { autor, libros, generos, obrasDestacadas, loading };
};

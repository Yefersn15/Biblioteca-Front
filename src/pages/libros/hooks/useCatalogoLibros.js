// src/pages/libros/hooks/useCatalogoLibros.js
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLibros } from '../services/librosService';
import { getAll as getCategorias } from '../../../services/api/categorias.api';
import { getAll as getAutores } from '../../../services/api/autores.api';
import { getById as getEditorial } from '../../../services/api/editoriales.api';

export const ORDENES = [
  { value: 'titulo-asc', label: 'Título (A-Z)' },
  { value: 'titulo-desc', label: 'Título (Z-A)' },
  { value: 'disponibles-desc', label: 'Más disponibles primero' },
  { value: 'disponibles-asc', label: 'Agotados primero' },
  { value: 'recientes', label: 'Agregados recientemente' },
];

export const useCatalogoLibros = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const autorId = searchParams.get('autorId') || '';
  const categoriaId = searchParams.get('categoriaId') || '';
  const editorialId = searchParams.get('editorialId');
  const sort = searchParams.get('sort') || 'titulo-asc';

  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [nombreFiltroEditorial, setNombreFiltroEditorial] = useState('');

  useEffect(() => {
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
    getAutores({ limit: 200 }).then(({ items }) => setAutores(items));
  }, []);

  useEffect(() => {
    if (editorialId) getEditorial(editorialId).then((e) => setNombreFiltroEditorial(e.nombre)).catch(() => setNombreFiltroEditorial(''));
    else setNombreFiltroEditorial('');
  }, [editorialId]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      getLibros({ limit: 100, search: search || undefined, autorId: autorId || undefined, categoriaId: categoriaId || undefined, editorialId, sort }).then(({ items }) => {
        setLibros(items);
        setLoading(false);
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, autorId, categoriaId, editorialId, sort]);

  const actualizarFiltro = (clave, valor) => {
    const next = new URLSearchParams(searchParams);
    if (valor) next.set(clave, valor);
    else next.delete(clave);
    if (clave !== 'editorialId') next.delete('editorialId'); // los filtros de la barra reemplazan el de editorial (venía de un enlace externo)
    setSearchParams(next);
  };

  const limpiarFiltros = () => setSearchParams({});

  const hayFiltros = autorId || categoriaId || editorialId || sort !== 'titulo-asc';

  return {
    libros,
    loading,
    search,
    setSearch,
    categorias,
    autores,
    nombreFiltroEditorial,
    autorId,
    categoriaId,
    sort,
    actualizarFiltro,
    limpiarFiltros,
    hayFiltros,
  };
};

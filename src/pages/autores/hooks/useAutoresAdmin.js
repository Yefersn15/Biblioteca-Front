// src/pages/autores/hooks/useAutoresAdmin.js
import { useState, useEffect } from 'react';
import { getAll, update, remove } from '../services/autoresService';
import { getAll as getCategorias } from '../../../services/api/categorias.api';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useAutoresAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [autores, setAutores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [nacionalidadFiltro, setNacionalidadFiltro] = useState('');
  const [generoFiltro, setGeneroFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');

  useEffect(() => {
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
  }, []);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({
      limit: 100,
      search: search || undefined,
      nacionalidad: nacionalidadFiltro || undefined,
      generoLiterario: generoFiltro || undefined,
      estado: estadoFiltro === '' ? undefined : estadoFiltro === 'true',
    });
    setAutores(items);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, [search, nacionalidadFiltro, generoFiltro, estadoFiltro]);

  const toggleEstado = async (autor) => {
    try {
      await update(autor.id, { estado: !autor.estado });
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEliminar = async (autor) => {
    if (!(await confirm(`¿Eliminar a "${autor.nombre} ${autor.apellido || ''}"?`))) return;
    try {
      await remove(autor.id);
      toast.success('Autor eliminado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const nacionalidades = [...new Set(autores.map((a) => a.nacionalidad).filter(Boolean))];

  return {
    autores,
    categorias,
    nacionalidades,
    loading,
    search,
    setSearch,
    nacionalidadFiltro,
    setNacionalidadFiltro,
    generoFiltro,
    setGeneroFiltro,
    estadoFiltro,
    setEstadoFiltro,
    cargar,
    toggleEstado,
    handleEliminar,
  };
};

// src/pages/categorias/hooks/useCategoriasAdmin.js
import { useState, useEffect } from 'react';
import { getAll, update, remove } from '../services/categoriasService';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useCategoriasAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({
      limit: 100,
      search: search || undefined,
      estado: estadoFiltro === '' ? undefined : estadoFiltro === 'true',
    });
    setCategorias(items);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, [search, estadoFiltro]);

  const toggleEstado = async (categoria) => {
    try {
      await update(categoria.id, { estado: !categoria.estado });
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEliminar = async (categoria) => {
    if (!(await confirm(`¿Eliminar "${categoria.nombre}"?`))) return;
    try {
      await remove(categoria.id);
      toast.success('Categoría eliminada');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    categorias,
    loading,
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    cargar,
    toggleEstado,
    handleEliminar,
  };
};

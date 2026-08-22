// src/pages/editoriales/hooks/useEditorialesAdmin.js
import { useState, useEffect } from 'react';
import { getAll, update, remove } from '../services/editorialesService';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useEditorialesAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [editoriales, setEditoriales] = useState([]);
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
    setEditoriales(items);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, [search, estadoFiltro]);

  const toggleEstado = async (editorial) => {
    try {
      await update(editorial.id, { estado: !editorial.estado });
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEliminar = async (editorial) => {
    if (!(await confirm(`¿Eliminar "${editorial.nombre}"?`))) return;
    try {
      await remove(editorial.id);
      toast.success('Editorial eliminada');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    editoriales,
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

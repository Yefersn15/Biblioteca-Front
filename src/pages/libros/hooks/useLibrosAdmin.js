// src/pages/libros/hooks/useLibrosAdmin.js
import { useState, useEffect } from 'react';
import { getLibros, eliminarLibro } from '../services/librosService';
import { getAll as getEditoriales } from '../../../services/api/editoriales.api';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useLibrosAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editorialId, setEditorialId] = useState('');
  const [tipo, setTipo] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [editoriales, setEditoriales] = useState([]);

  useEffect(() => {
    getEditoriales({ limit: 200 }).then(({ items }) => setEditoriales(items));
  }, []);

  const paramsEstado = () => {
    switch (estadoFiltro) {
      case 'habilitados': return { estado: true, agotados: undefined };
      case 'inhabilitados': return { estado: false, agotados: undefined };
      case 'agotados': return { estado: undefined, agotados: true };
      default: return { estado: undefined, agotados: undefined };
    }
  };

  const cargar = async () => {
    setLoading(true);
    const { items } = await getLibros({
      limit: 100,
      search: search || undefined,
      editorialId: editorialId || undefined,
      tipo: tipo || undefined,
      ...paramsEstado(),
    });
    setLibros(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [search, editorialId, tipo, estadoFiltro]);

  const handleEliminar = async (libro) => {
    if (!(await confirm(`¿Eliminar "${libro.titulo}"? Esta acción no se puede deshacer.`))) return;
    try {
      await eliminarLibro(libro.id);
      toast.success('Libro eliminado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const hayFiltros = search || editorialId || tipo || estadoFiltro;

  const limpiarFiltros = () => {
    setSearch('');
    setEditorialId('');
    setTipo('');
    setEstadoFiltro('');
  };

  return {
    libros,
    loading,
    search,
    setSearch,
    editorialId,
    setEditorialId,
    tipo,
    setTipo,
    estadoFiltro,
    setEstadoFiltro,
    editoriales,
    hayFiltros,
    limpiarFiltros,
    handleEliminar,
  };
};

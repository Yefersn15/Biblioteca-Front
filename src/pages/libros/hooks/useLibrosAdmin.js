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
  const [agotados, setAgotados] = useState(false);
  const [editoriales, setEditoriales] = useState([]);

  useEffect(() => {
    getEditoriales({ limit: 200 }).then(({ items }) => setEditoriales(items));
  }, []);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getLibros({
      limit: 100,
      search: search || undefined,
      editorialId: editorialId || undefined,
      tipo: tipo || undefined,
      agotados: agotados || undefined,
    });
    setLibros(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [search, editorialId, tipo, agotados]);

  const handleEliminar = async (libro) => {
    if (!(await confirm(`¿Eliminar "${libro.titulo}"? Se ocultará del catálogo público.`))) return;
    try {
      await eliminarLibro(libro.id);
      toast.success('Libro eliminado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const hayFiltros = search || editorialId || tipo || agotados;

  const limpiarFiltros = () => {
    setSearch('');
    setEditorialId('');
    setTipo('');
    setAgotados(false);
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
    agotados,
    setAgotados,
    editoriales,
    hayFiltros,
    limpiarFiltros,
    handleEliminar,
  };
};

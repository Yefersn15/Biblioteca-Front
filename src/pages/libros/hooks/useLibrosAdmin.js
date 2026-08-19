// src/pages/libros/hooks/useLibrosAdmin.js
import { useState, useEffect } from 'react';
import { getLibros, eliminarLibro } from '../services/librosService';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useLibrosAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const cargar = async () => {
    setLoading(true);
    const { items } = await getLibros({ limit: 100, search: search || undefined });
    setLibros(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [search]);

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

  return { libros, loading, search, setSearch, handleEliminar };
};

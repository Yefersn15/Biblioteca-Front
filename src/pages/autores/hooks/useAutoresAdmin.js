// src/pages/autores/hooks/useAutoresAdmin.js
import { useState, useEffect } from 'react';
import { getAll, remove } from '../services/autoresService';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useAutoresAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({ limit: 200 });
    setAutores(items);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

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

  return { autores, loading, cargar, handleEliminar };
};

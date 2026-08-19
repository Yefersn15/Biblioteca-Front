// src/pages/editoriales/hooks/useEditorialesAdmin.js
import { useState, useEffect } from 'react';
import { getAll, remove } from '../services/editorialesService';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const useEditorialesAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [editoriales, setEditoriales] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({ limit: 200 });
    setEditoriales(items);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

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

  return { editoriales, loading, cargar, handleEliminar };
};

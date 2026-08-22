// src/pages/libros/hooks/useLibroDetalle.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLibro } from '../services/librosService';
import { solicitarPrestamo } from '../../../services/api/prestamos.api';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const useLibroDetalle = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [libro, setLibro] = useState(null);
  const [solicitando, setSolicitando] = useState(false);
  const [solicitado, setSolicitado] = useState(false);

  useEffect(() => {
    getLibro(id).then(setLibro);
  }, [id]);

  const handleSolicitar = async () => {
    setSolicitando(true);
    try {
      await solicitarPrestamo({ libroId: libro.id });
      toast.success('Préstamo solicitado, queda pendiente de aprobación');
      setSolicitado(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSolicitando(false);
    }
  };

  return {
    user,
    libro,
    solicitando,
    solicitado,
    handleSolicitar,
  };
};

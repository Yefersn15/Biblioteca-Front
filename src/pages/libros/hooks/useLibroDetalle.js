// src/pages/libros/hooks/useLibroDetalle.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLibro } from '../services/librosService';
import { solicitarPrestamo } from '../../../services/api/prestamos.api';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const hoyMasDias = (dias) => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().slice(0, 10);
};

export const useLibroDetalle = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const toast = useToast();
  const [libro, setLibro] = useState(null);
  const [fechaDevolucion, setFechaDevolucion] = useState(hoyMasDias(14));
  const [solicitando, setSolicitando] = useState(false);
  const [solicitado, setSolicitado] = useState(false);

  useEffect(() => {
    getLibro(id).then(setLibro);
  }, [id]);

  const handleSolicitar = async () => {
    setSolicitando(true);
    try {
      await solicitarPrestamo({ libroId: libro.id, fechaDevolucionEstimada: fechaDevolucion });
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
    fechaDevolucion,
    setFechaDevolucion,
    fechaMinima: hoyMasDias(1),
    solicitando,
    solicitado,
    handleSolicitar,
  };
};

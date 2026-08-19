// src/pages/prestamos/hooks/usePrestamosAdmin.js
import { useState, useEffect } from 'react';
import { getPrestamos, aprobarPrestamo, rechazarPrestamo, devolverPrestamo } from '../services/prestamosService';
import { useToast } from '../../../context/ToastContext';

export const usePrestamosAdmin = () => {
  const toast = useToast();
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [modal, setModal] = useState(null); // { tipo: 'aprobar'|'rechazar'|'devolver'|'observacion', prestamo, observaciones }

  const cargar = async () => {
    setLoading(true);
    const { items } = await getPrestamos({ limit: 100, estado: filtro || undefined });
    setPrestamos(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [filtro]);

  const abrirModal = (tipo, prestamo) => setModal({ tipo, prestamo, observaciones: '' });
  const cerrarModal = () => setModal(null);
  const verObservacion = (prestamo) => setModal({ tipo: 'observacion', prestamo });
  const cambiarObservaciones = (observaciones) => setModal((prev) => ({ ...prev, observaciones }));

  const confirmarModal = async () => {
    setProcesando(true);
    try {
      const { tipo, prestamo, observaciones } = modal;
      if (tipo === 'aprobar') await aprobarPrestamo(prestamo.id);
      if (tipo === 'rechazar') await rechazarPrestamo(prestamo.id, observaciones || undefined);
      if (tipo === 'devolver') await devolverPrestamo(prestamo.id, observaciones || undefined);
      await cargar();
      cerrarModal();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProcesando(false);
    }
  };

  return {
    prestamos,
    loading,
    filtro,
    setFiltro,
    procesando,
    modal,
    abrirModal,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    confirmarModal,
  };
};

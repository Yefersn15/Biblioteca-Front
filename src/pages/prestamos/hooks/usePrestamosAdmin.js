// src/pages/prestamos/hooks/usePrestamosAdmin.js
import { useState, useEffect } from 'react';
import { getPrestamos, aprobarPrestamo, rechazarPrestamo, devolverPrestamo } from '../services/prestamosService';
import { useToast } from '../../../context/ToastContext';

const hoyMasDias = (dias) => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().slice(0, 10);
};

export const usePrestamosAdmin = () => {
  const toast = useToast();
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [modal, setModal] = useState(null); // { tipo: 'aprobar'|'rechazar'|'devolver'|'observacion', prestamo, observaciones }

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getPrestamos({ limit: 100, estado: filtro || undefined, search: searchDebounced || undefined });
    setPrestamos(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [filtro, searchDebounced]);

  const abrirModal = (tipo, prestamo) =>
    setModal({ tipo, prestamo, observaciones: '', fechaDevolucionEstimada: hoyMasDias(14) });
  const cerrarModal = () => setModal(null);
  const verObservacion = (prestamo) => setModal({ tipo: 'observacion', prestamo });
  const cambiarObservaciones = (observaciones) => setModal((prev) => ({ ...prev, observaciones }));
  const cambiarFechaDevolucion = (fechaDevolucionEstimada) => setModal((prev) => ({ ...prev, fechaDevolucionEstimada }));

  const confirmarModal = async () => {
    setProcesando(true);
    try {
      const { tipo, prestamo, observaciones, fechaDevolucionEstimada } = modal;
      if (tipo === 'aprobar') await aprobarPrestamo(prestamo.id, fechaDevolucionEstimada);
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
    search,
    setSearch,
    procesando,
    modal,
    abrirModal,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    cambiarFechaDevolucion,
    confirmarModal,
  };
};

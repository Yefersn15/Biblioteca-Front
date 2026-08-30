// src/pages/prestamos/hooks/usePrestamosAdmin.js
import { useState, useEffect } from 'react';
import { getPrestamos, aprobarPrestamo, rechazarPrestamo, devolverPrestamo, registrarPrestamoPresencial } from '../services/prestamosService';
import * as usuariosApi from '../../../services/api/usuarios.api';
import * as librosApi from '../../../services/api/libros.api';
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
  const [modal, setModal] = useState(null); // { tipo: 'aprobar'|'rechazar'|'devolver'|'observacion'|'presencial', prestamo, observaciones }
  const [usuarios, setUsuarios] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setSearchDebounced(search.trim()), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Para el selector de "Registrar préstamo presencial": solo cuentas
  // activas y solo libros activos con al menos una copia disponible.
  useEffect(() => {
    (async () => {
      const [{ items: u }, { items: l }] = await Promise.all([
        usuariosApi.getUsuarios({ limit: 200, estado: true }),
        librosApi.getLibros({ limit: 200, estado: true }),
      ]);
      setUsuarios(u);
      setLibrosDisponibles(l.filter((libro) => libro.copiasDisponibles > 0));
    })();
  }, []);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getPrestamos({ limit: 100, estado: filtro || undefined, search: searchDebounced || undefined });
    setPrestamos(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [filtro, searchDebounced]);

  const USUARIO_NUEVO_INICIAL = { nombres: '', apellidos: '', email: '', celular: '', documento: '' };

  const abrirModal = (tipo, prestamo) =>
    setModal({ tipo, prestamo, observaciones: '', fechaDevolucionEstimada: hoyMasDias(14) });
  const abrirModalPresencial = () =>
    setModal({
      tipo: 'presencial',
      modoUsuario: 'buscar',
      usuarioSeleccionado: null,
      usuarioNuevo: USUARIO_NUEVO_INICIAL,
      libroSeleccionado: null,
      fechaDevolucionEstimada: hoyMasDias(14),
    });
  const cerrarModal = () => setModal(null);
  const verObservacion = (prestamo) => setModal({ tipo: 'observacion', prestamo });
  const cambiarObservaciones = (observaciones) => setModal((prev) => ({ ...prev, observaciones }));
  const cambiarFechaDevolucion = (fechaDevolucionEstimada) => setModal((prev) => ({ ...prev, fechaDevolucionEstimada }));
  const cambiarModoUsuario = (modoUsuario) =>
    setModal((prev) => ({ ...prev, modoUsuario, usuarioSeleccionado: null, usuarioNuevo: USUARIO_NUEVO_INICIAL }));
  const seleccionarUsuarioPresencial = (usuarioSeleccionado) => setModal((prev) => ({ ...prev, usuarioSeleccionado }));
  const cambiarCampoUsuarioNuevo = (campo, valor) =>
    setModal((prev) => ({ ...prev, usuarioNuevo: { ...prev.usuarioNuevo, [campo]: valor } }));
  const seleccionarLibroPresencial = (libroSeleccionado) => setModal((prev) => ({ ...prev, libroSeleccionado }));

  const MENSAJES_EXITO = {
    aprobar: 'Préstamo aprobado',
    rechazar: 'Préstamo rechazado',
    devolver: 'Devolución registrada',
    presencial: 'Préstamo registrado',
  };

  const confirmarModal = async () => {
    const { tipo, prestamo, observaciones, fechaDevolucionEstimada } = modal;
    if (tipo === 'presencial') {
      const { modoUsuario, usuarioSeleccionado, usuarioNuevo, libroSeleccionado } = modal;
      if (!libroSeleccionado) return toast.error('Selecciona un libro');
      if (modoUsuario === 'buscar' && !usuarioSeleccionado) return toast.error('Selecciona un usuario');
      if (modoUsuario === 'nuevo' && (!usuarioNuevo.nombres || !usuarioNuevo.apellidos || !usuarioNuevo.email)) {
        return toast.error('Completa nombres, apellidos y correo del usuario nuevo');
      }
    }

    setProcesando(true);
    try {
      if (tipo === 'aprobar') await aprobarPrestamo(prestamo.id, fechaDevolucionEstimada);
      if (tipo === 'rechazar') await rechazarPrestamo(prestamo.id, observaciones || undefined);
      if (tipo === 'devolver') await devolverPrestamo(prestamo.id, observaciones || undefined);
      if (tipo === 'presencial') {
        const { modoUsuario, usuarioSeleccionado, usuarioNuevo, libroSeleccionado } = modal;
        const payload = { libroId: libroSeleccionado.id, fechaDevolucionEstimada };
        if (modoUsuario === 'buscar') {
          payload.usuarioId = usuarioSeleccionado.id;
        } else {
          payload.usuarioNuevo = {
            ...usuarioNuevo,
            celular: usuarioNuevo.celular || undefined,
            documento: usuarioNuevo.documento || undefined,
          };
        }
        await registrarPrestamoPresencial(payload);
      }
      await cargar();
      cerrarModal();
      toast.success(MENSAJES_EXITO[tipo]);
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
    usuarios,
    librosDisponibles,
    abrirModal,
    abrirModalPresencial,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    cambiarFechaDevolucion,
    cambiarModoUsuario,
    seleccionarUsuarioPresencial,
    cambiarCampoUsuarioNuevo,
    seleccionarLibroPresencial,
    confirmarModal,
  };
};

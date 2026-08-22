// src/pages/usuarios/hooks/useUsuariosAdmin.js
import { useState, useEffect } from 'react';
import { getUsuarios, actualizarUsuario, eliminarUsuario } from '../services/usuariosService';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useConfirm } from '../../../context/ConfirmContext';

export const ROLES = ['USUARIO', 'BIBLIOTECARIO', 'ADMIN'];

export const useUsuariosAdmin = () => {
  const { user: usuarioActual } = useAuth();
  const toast = useToast();
  const confirm = useConfirm();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setSearchDebounced(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getUsuarios({
      limit: 100,
      search: searchDebounced || undefined,
      rol: rolFiltro || undefined,
      estado: estadoFiltro || undefined,
    });
    setUsuarios(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [searchDebounced, rolFiltro, estadoFiltro]);

  const cambiarRol = async (usuario, rol) => {
    try {
      await actualizarUsuario(usuario.id, { rol });
      toast.success('Rol actualizado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleEstado = async (usuario) => {
    try {
      await actualizarUsuario(usuario.id, { estado: !usuario.estado });
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEliminar = async (usuario) => {
    if (!(await confirm(`¿Deshabilitar a "${usuario.nombres} ${usuario.apellidos}"?`))) return;
    try {
      await eliminarUsuario(usuario.id);
      toast.success('Usuario deshabilitado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    usuarios,
    loading,
    usuarioActual,
    search,
    setSearch,
    rolFiltro,
    setRolFiltro,
    estadoFiltro,
    setEstadoFiltro,
    cargar,
    cambiarRol,
    toggleEstado,
    handleEliminar,
  };
};

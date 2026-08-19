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

  const cargar = async () => {
    setLoading(true);
    const { items } = await getUsuarios({ limit: 100 });
    setUsuarios(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

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
    cargar,
    cambiarRol,
    toggleEstado,
    handleEliminar,
  };
};

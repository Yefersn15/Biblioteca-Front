// src/pages/usuarios/hooks/usePerfilForm.js
import { useState, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { actualizarUsuario } from '../services/usuariosService';
import { usePasswordFields } from '../../../hooks/usePasswordFields';
import { resolverImagenPendiente } from '../../../components/upload/useImageUpload';

export const usePerfilForm = () => {
  const { user, actualizarUsuarioLocal } = useAuth();
  const toast = useToast();
  const esAdmin = user.rol === 'ADMIN';

  const [form, setForm] = useState({
    nombres: user.nombres,
    apellidos: user.apellidos,
    genero: user.genero || '',
    celular: user.celular || '',
    avatar: user.avatar || '',
    avatarPublicId: user.avatarPublicId || '',
    tipoDocumento: user.tipoDocumento || '',
    documento: user.documento || '',
    direccion: user.direccion || '',
    barrio: user.barrio || '',
  });
  const [guardando, setGuardando] = useState(false);
  const avatarRef = useRef(null);
  const { password, setPassword, confirmPassword, setConfirmPassword, noCoinciden, validar, reset: resetPassword } = usePasswordFields();

  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorPassword = validar({ obligatoria: false });
    if (errorPassword) {
      toast.error(errorPassword);
      return;
    }
    setGuardando(true);
    try {
      const imagen = await resolverImagenPendiente(avatarRef, { url: form.avatar, publicId: form.avatarPublicId });
      if (!imagen.ok) {
        setGuardando(false);
        return;
      }
      const payload = {
        genero: form.genero,
        celular: form.celular,
        avatar: imagen.url,
        avatarPublicId: imagen.publicId,
      };
      if (esAdmin) {
        Object.assign(payload, {
          nombres: form.nombres,
          apellidos: form.apellidos,
          tipoDocumento: form.tipoDocumento,
          documento: form.documento,
          direccion: form.direccion,
          barrio: form.barrio,
        });
      }
      if (password) payload.password = password;
      const usuarioActualizado = await actualizarUsuario(user.id, payload);
      actualizarUsuarioLocal(usuarioActualizado);
      resetPassword();
      toast.success('Perfil actualizado');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return {
    user,
    esAdmin,
    form,
    setField,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    noCoinciden,
    guardando,
    handleSubmit,
    avatarRef,
  };
};

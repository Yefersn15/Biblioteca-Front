// src/pages/perfil/hooks/usePerfilForm.js
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { actualizarUsuario } from '../services/perfilService';

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
    tipoDocumento: user.tipoDocumento || '',
    documento: user.documento || '',
    direccion: user.direccion || '',
    barrio: user.barrio || '',
  });
  const [password, setPassword] = useState('');
  const [guardando, setGuardando] = useState(false);

  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const payload = { nombres: form.nombres, apellidos: form.apellidos, genero: form.genero, celular: form.celular, avatar: form.avatar };
      if (esAdmin) {
        Object.assign(payload, {
          tipoDocumento: form.tipoDocumento,
          documento: form.documento,
          direccion: form.direccion,
          barrio: form.barrio,
        });
      }
      if (password) payload.password = password;
      const usuarioActualizado = await actualizarUsuario(user.id, payload);
      actualizarUsuarioLocal(usuarioActualizado);
      setPassword('');
      toast.success('Perfil actualizado');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return { user, esAdmin, form, setField, password, setPassword, guardando, handleSubmit };
};

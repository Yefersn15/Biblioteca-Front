// src/pages/auth/hooks/useRegisterForm.js
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { usePasswordFields } from '../../../hooks/usePasswordFields';
import { resolverImagenPendiente } from '../../../components/upload/useImageUpload';

const FORM_INICIAL = {
  nombres: '',
  apellidos: '',
  genero: '',
  tipoDocumento: '',
  documento: '',
  email: '',
  celular: '',
  direccion: '',
  barrio: '',
  avatar: '',
  avatarPublicId: '',
};

export const useRegisterForm = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_INICIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const avatarRef = useRef(null);
  const { password, setPassword, confirmPassword, setConfirmPassword, noCoinciden, validar } = usePasswordFields();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const setAvatar = (url, publicId) => setForm((prev) => ({ ...prev, avatar: url, avatarPublicId: publicId }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const errorPassword = validar({ obligatoria: true });
    if (errorPassword) {
      setError(errorPassword);
      return;
    }

    setLoading(true);
    try {
      const imagen = await resolverImagenPendiente(avatarRef, { url: form.avatar, publicId: form.avatarPublicId });
      if (!imagen.ok) {
        setLoading(false);
        return;
      }
      const datos = { ...form, avatar: imagen.url, avatarPublicId: imagen.publicId, password };
      await registrar(datos);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
    avatarRef,
    setAvatar,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordsNoCoinciden: noCoinciden,
  };
};

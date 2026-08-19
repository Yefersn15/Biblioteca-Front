// src/pages/auth/hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

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
  password: '',
  confirmPassword: '',
};

export const useRegisterForm = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_INICIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const datos = { ...form };
      delete datos.confirmPassword;
      await registrar(datos);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { form, error, loading, handleChange, handleSubmit };
};

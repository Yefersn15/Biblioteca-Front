// src/pages/auth/hooks/useResetPasswordForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as authService from '../services/authService';

export const useResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';

  // 'verificando' -> 'valido' -> formulario visible; 'invalido' -> mensaje de error fijo.
  const [estadoEnlace, setEstadoEnlace] = useState('verificando');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      setEstadoEnlace('invalido');
      return;
    }
    authService.verificarToken(email, token)
      .then(() => setEstadoEnlace('valido'))
      .catch(() => setEstadoEnlace('invalido'));
  }, [email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await authService.restablecerPassword(email, token, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    estadoEnlace,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  };
};

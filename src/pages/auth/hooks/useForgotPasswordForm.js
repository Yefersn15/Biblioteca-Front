// src/pages/auth/hooks/useForgotPasswordForm.js
import { useState } from 'react';
import * as authService from '../services/authService';

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolicitar = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.solicitarRecuperacion(email);
      // Mismo mensaje exista o no la cuenta: el backend nunca revela si el
      // correo está registrado, así que aquí tampoco cambiamos el mensaje.
      setEnviado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    enviado,
    error,
    loading,
    handleSolicitar,
  };
};

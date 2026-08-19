// src/pages/auth/hooks/useLoginForm.js
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export const useLoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // No navega manualmente: en cuanto login() actualiza el usuario, el
  // PrivateRoute que envuelve esta página (requireGuest) se encarga de
  // mandar al panel de admin o de vuelta a donde estaba, según el rol.
  // Navegar aquí también generaba una carrera con ese redireccionamiento.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, error, loading, handleSubmit };
};

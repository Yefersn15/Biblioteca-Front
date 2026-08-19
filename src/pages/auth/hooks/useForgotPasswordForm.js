// src/pages/auth/hooks/useForgotPasswordForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export const useForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: código, 3: nueva contraseña
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolicitar = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.solicitarRecuperacion(email);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificar = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.verificarCodigo(email, codigo);
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestablecer = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await authService.restablecerPassword(email, codigo, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    email,
    setEmail,
    codigo,
    setCodigo,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSolicitar,
    handleVerificar,
    handleRestablecer,
  };
};

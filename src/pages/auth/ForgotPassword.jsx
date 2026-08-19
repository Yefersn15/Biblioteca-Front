import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authApi from '../../services/api/auth.api';

const ForgotPassword = () => {
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
      await authApi.solicitarRecuperacion(email);
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
      await authApi.verificarCodigo(email, codigo);
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
      await authApi.restablecerPassword(email, codigo, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {step === 1 && 'Recuperar contraseña'}
            {step === 2 && 'Verificar código'}
            {step === 3 && 'Nueva contraseña'}
          </h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {step === 1 && (
            <form onSubmit={handleSolicitar}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <small className="form-text text-muted">Si el correo está registrado, te enviaremos un código de verificación.</small>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar código'}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerificar}>
              <div className="alert alert-info">
                Revisa la bandeja de entrada de <strong>{email}</strong> (y la carpeta de spam) para ver el código de 6 dígitos.
              </div>
              <div className="mb-3">
                <label className="form-label">Código de verificación</label>
                <input
                  type="text"
                  className="form-control"
                  maxLength={6}
                  required
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Verificando...' : 'Verificar código'}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleRestablecer}>
              <div className="mb-3">
                <label className="form-label">Nueva contraseña</label>
                <input type="password" className="form-control" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input type="password" className="form-control" minLength={8} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Actualizando...' : 'Actualizar contraseña'}
              </button>
            </form>
          )}

          <div className="text-center mt-3">
            <Link to="/login">Volver a iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

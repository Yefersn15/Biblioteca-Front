import { Link } from 'react-router-dom';
import { useLoginForm } from './hooks/useLoginForm';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';
import PasswordInput from '../../components/PasswordInput';

const Login = () => {
  useAyudaPagina({
    titulo: 'Ingresar',
    contenido: (
      <>
        <p>Inicia sesión con tu correo y contraseña. Si olvidaste tu contraseña, usa "¿Olvidaste tu contraseña?" para recibir un enlace de recuperación por correo (válido por 15 minutos).</p>
        <p>Para explorar el panel de administración sin crear tu propia cuenta, puedes usar esta cuenta de prueba: <strong>admin@test.com</strong> / <strong>Test123.</strong></p>
      </>
    ),
  });
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } = useLoginForm();

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="text-center mb-4"><i className="fas fa-book-open me-2"></i>Ingresar</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <PasswordInput required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
          <p className="text-center mt-3 mb-1">
            <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
          </p>
          <p className="text-center mb-0">
            ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

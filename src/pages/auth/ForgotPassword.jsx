import { Link } from 'react-router-dom';
import { useForgotPasswordForm } from './hooks/useForgotPasswordForm';
import RequestEmailStep from './components/RequestEmailStep';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const ForgotPassword = () => {
  useAyudaPagina({
    titulo: 'Recuperar contraseña',
    contenido: (
      <p>
        Escribe tu correo y te enviaremos un enlace para crear una nueva contraseña, válido por 15 minutos. El mensaje que ves ("Si el correo existe...") es siempre el mismo,
        exista o no una cuenta con ese correo, para no revelar qué correos están registrados.
      </p>
    ),
  });
  const { email, setEmail, enviado, error, loading, handleSolicitar } = useForgotPasswordForm();

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Recuperar contraseña</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          {enviado ? (
            <div className="alert alert-info mb-0">
              Si el correo existe, te enviamos un enlace de recuperación. Revisa tu bandeja de entrada (y la carpeta de spam).
            </div>
          ) : (
            <RequestEmailStep email={email} setEmail={setEmail} loading={loading} onSubmit={handleSolicitar} />
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

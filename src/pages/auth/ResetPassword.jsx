import { Link } from 'react-router-dom';
import { useResetPasswordForm } from './hooks/useResetPasswordForm';
import ResetPasswordStep from './components/ResetPasswordStep';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const ResetPassword = () => {
  useAyudaPagina({
    titulo: 'Nueva contraseña',
    contenido: <p>Se abre desde el enlace que llega por correo. Si el enlace ya venció (pasaron más de 15 minutos) o ya se usó, se te avisa aquí mismo y puedes pedir uno nuevo.</p>,
  });
  const {
    estadoEnlace,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    noCoinciden,
    error,
    loading,
    handleSubmit,
  } = useResetPasswordForm();

  return (
    <div className="container py-5" style={{ maxWidth: 460 }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Nueva contraseña</h4>
        </div>
        <div className="card-body">
          {estadoEnlace === 'verificando' && (
            <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>
          )}

          {estadoEnlace === 'invalido' && (
            <div>
              <div className="alert alert-danger">El enlace es inválido o ya expiró.</div>
              <Link to="/recuperar-password" className="btn btn-primary w-100">Solicitar un enlace nuevo</Link>
            </div>
          )}

          {estadoEnlace === 'valido' && (
            <>
              {error && <div className="alert alert-danger">{error}</div>}
              <ResetPasswordStep
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                noCoinciden={noCoinciden}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </>
          )}

          <div className="text-center mt-3">
            <Link to="/login">Volver a iniciar sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

import { Link } from 'react-router-dom';
import { useForgotPasswordForm } from './hooks/useForgotPasswordForm';
import RequestEmailStep from './components/RequestEmailStep';
import VerifyCodeStep from './components/VerifyCodeStep';
import ResetPasswordStep from './components/ResetPasswordStep';

const ForgotPassword = () => {
  const {
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
  } = useForgotPasswordForm();

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
            <RequestEmailStep email={email} setEmail={setEmail} loading={loading} onSubmit={handleSolicitar} />
          )}

          {step === 2 && (
            <VerifyCodeStep email={email} codigo={codigo} setCodigo={setCodigo} loading={loading} onSubmit={handleVerificar} />
          )}

          {step === 3 && (
            <ResetPasswordStep
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              loading={loading}
              onSubmit={handleRestablecer}
            />
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

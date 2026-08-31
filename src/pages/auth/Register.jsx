import { Link } from 'react-router-dom';
import { useRegisterForm } from './hooks/useRegisterForm';
import RegisterFormFields from './components/RegisterFormFields';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const Register = () => {
  useAyudaPagina({
    titulo: 'Crear cuenta',
    contenido: (
      <>
        <p>Regístrate como usuario para solicitar préstamos. Todas las cuentas nuevas quedan con rol <strong>USUARIO</strong>; un administrador puede luego darte más permisos si corresponde.</p>
        <p>La contraseña debe tener al menos 8 caracteres, con mayúscula, minúscula, número y símbolo. La foto de perfil aquí solo se puede pegar como URL, no subir un archivo, porque subir archivos requiere estar logueado (eso sí está disponible después, en "Mi perfil").</p>
      </>
    ),
  });
  const {
    form,
    error,
    loading,
    handleChange,
    handleSubmit,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordsNoCoinciden,
    avatarRef,
    setAvatar,
  } = useRegisterForm();

  return (
    <div className="container py-3" style={{ maxWidth: 820 }}>
      <div className="card shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h2 className="text-center mb-3"><i className="fas fa-user-plus me-2"></i>Crear cuenta</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <RegisterFormFields
              form={form}
              handleChange={handleChange}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordsNoCoinciden={passwordsNoCoinciden}
              avatarRef={avatarRef}
              setAvatar={setAvatar}
            />
            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
              {loading ? 'Creando...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center mt-2 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

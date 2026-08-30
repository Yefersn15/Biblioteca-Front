import { Link } from 'react-router-dom';
import { useRegisterForm } from './hooks/useRegisterForm';
import RegisterFormFields from './components/RegisterFormFields';

const Register = () => {
  const { form, error, loading, handleChange, handleSubmit, passwordsNoCoinciden } = useRegisterForm();

  return (
    <div className="container py-3" style={{ maxWidth: 820 }}>
      <div className="card shadow-sm">
        <div className="card-body p-3 p-md-4">
          <h2 className="text-center mb-3"><i className="fas fa-user-plus me-2"></i>Crear cuenta</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <RegisterFormFields form={form} handleChange={handleChange} passwordsNoCoinciden={passwordsNoCoinciden} />
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

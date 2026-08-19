import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FORM_INICIAL = {
  nombres: '',
  apellidos: '',
  genero: '',
  tipoDocumento: '',
  documento: '',
  email: '',
  celular: '',
  direccion: '',
  barrio: '',
  avatar: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_INICIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      const datos = { ...form };
      delete datos.confirmPassword;
      await registrar(datos);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 640 }}>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <h2 className="text-center mb-4"><i className="fas fa-user-plus me-2"></i>Crear cuenta</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombres *</label>
                <input type="text" className="form-control" name="nombres" required value={form.nombres} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos *</label>
                <input type="text" className="form-control" name="apellidos" required value={form.apellidos} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Tipo de documento *</label>
                <select className="form-select" name="tipoDocumento" required value={form.tipoDocumento} onChange={handleChange}>
                  <option value="">Seleccionar...</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="PASAPORTE">Pasaporte</option>
                  <option value="CEDULA_EXTRANJERA">Cédula de extranjería</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Número de documento *</label>
                <input type="text" className="form-control" name="documento" required value={form.documento} onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label d-block">Género *</label>
                <div className="d-flex gap-4">
                  {[['HOMBRE', 'Hombre'], ['MUJER', 'Mujer'], ['OTRO', 'Otro']].map(([value, label]) => (
                    <div className="form-check" key={value}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="genero"
                        id={`genero-${value}`}
                        value={value}
                        checked={form.genero === value}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor={`genero-${value}`}>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Correo *</label>
                <input type="email" className="form-control" name="email" required value={form.email} onChange={handleChange} />
                <small className="text-muted">Lo usarás para iniciar sesión y para recuperar tu contraseña.</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Celular *</label>
                <input type="tel" className="form-control" name="celular" required value={form.celular} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Dirección *</label>
                <input type="text" className="form-control" name="direccion" required value={form.direccion} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Barrio *</label>
                <input type="text" className="form-control" name="barrio" required value={form.barrio} onChange={handleChange} />
              </div>

              <div className="col-12">
                <label className="form-label">Foto de perfil (URL, opcional)</label>
                <input type="url" className="form-control" name="avatar" placeholder="https://ejemplo.com/foto.jpg" value={form.avatar} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contraseña *</label>
                <input type="password" className="form-control" name="password" required minLength={8} value={form.password} onChange={handleChange} />
                <small className="text-muted">Mínimo 8 caracteres</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirmar contraseña *</label>
                <input type="password" className="form-control" name="confirmPassword" required minLength={8} value={form.confirmPassword} onChange={handleChange} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4" disabled={loading}>
              {loading ? 'Creando...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="text-center mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Ingresar</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

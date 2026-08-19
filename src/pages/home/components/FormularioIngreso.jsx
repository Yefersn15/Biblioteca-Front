// src/pages/home/components/FormularioIngreso.jsx
import { Link } from 'react-router-dom';

// Contenido de la tarjeta de la columna "login" del inicio cuando no hay
// sesión: deja ingresar sin salir del Home.
const FormularioIngreso = ({ email, setEmail, password, setPassword, error, loading, onSubmit }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">
      <i className="fas fa-right-to-bracket me-2"></i>Ingresar
    </div>
    <div className="card-body">
      {error && <div className="alert alert-danger py-2 small">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-2">
          <input
            type="email"
            className="form-control form-control-sm"
            placeholder="Correo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            className="form-control form-control-sm"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-sm w-100" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <div className="text-center mt-2 small">
        <Link to="/recuperar-password">¿Olvidaste tu contraseña?</Link>
        <br />
        <Link to="/registro">Crear cuenta nueva</Link>
      </div>
    </div>
  </div>
);

export default FormularioIngreso;

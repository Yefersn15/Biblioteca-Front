import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getPrestamos } from '../../services/api/prestamos.api';

const hoyISO = () => new Date().toISOString().slice(0, 10);
const diasHasta = (fechaISO) => Math.ceil((new Date(fechaISO) - new Date(hoyISO())) / 86400000);

// Columna "login" del inicio (al estilo Proyecto_Six): sin sesión, deja
// ingresar sin salir del Home. Con sesión, en vez de repetir accesos que ya
// están en el desplegable del navbar, muestra información útil: préstamos
// activos, recordatorio de devolución próxima/vencida, y para el staff,
// cuántas solicitudes están pendientes de revisar.
const HomeLoginCard = () => {
  const { user, login, isStaff } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;
    const peticiones = [getPrestamos({ limit: 100 })];
    if (isStaff) peticiones.push(getPrestamos({ estado: 'PENDIENTE', limit: 1 }));

    Promise.all(peticiones).then(([propios, pendientesStaff]) => {
      const activos = propios.items.filter((p) => p.estado === 'APROBADO');
      const proximaDevolucion = activos
        .slice()
        .sort((a, b) => new Date(a.fechaDevolucionEstimada) - new Date(b.fechaDevolucionEstimada))[0];

      setStats({
        activos: activos.length,
        proximaDevolucion,
        pendientesPropios: propios.items.filter((p) => p.estado === 'PENDIENTE').length,
        pendientesStaff: pendientesStaff?.pagination.total,
      });
    });
  }, [user, isStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const usuario = await login(email, password);
      if (['ADMIN', 'BIBLIOTECARIO'].includes(usuario.rol)) navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    const dias = stats?.proximaDevolucion ? diasHasta(stats.proximaDevolucion.fechaDevolucionEstimada) : null;

    return (
      <div className="card h-100">
        <div className="card-header bg-white border-bottom">
          <i className="fas fa-chart-simple me-2"></i>Resumen
        </div>
        <div className="card-body">
          <p className="mb-3">Hola, <strong>{user.nombres}</strong>.</p>

          {!stats ? (
            <div className="text-center py-3"><div className="spinner-border spinner-border-sm" role="status"></div></div>
          ) : (
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-book-open text-muted"></i>
                <span>Préstamos activos: <strong>{stats.activos}</strong></span>
              </div>

              {stats.pendientesPropios > 0 && (
                <div className="d-flex align-items-center gap-2">
                  <i className="fas fa-hourglass-half text-muted"></i>
                  <span>Solicitudes tuyas por aprobar: <strong>{stats.pendientesPropios}</strong></span>
                </div>
              )}

              {stats.proximaDevolucion && (
                <div className={`alert py-2 px-3 mb-0 small ${dias < 0 ? 'alert-danger' : dias <= 3 ? 'alert-warning' : 'alert-light border'}`}>
                  <i className="fas fa-clock me-1"></i>
                  {dias < 0
                    ? <>Venciste la devolución de <strong>{stats.proximaDevolucion.libro?.titulo}</strong> hace {Math.abs(dias)} día{Math.abs(dias) === 1 ? '' : 's'}.</>
                    : dias === 0
                      ? <>Debes devolver <strong>{stats.proximaDevolucion.libro?.titulo}</strong> hoy.</>
                      : <>Debes devolver <strong>{stats.proximaDevolucion.libro?.titulo}</strong> en {dias} día{dias === 1 ? '' : 's'}.</>}
                </div>
              )}

              {isStaff && stats.pendientesStaff > 0 && (
                <div className="alert alert-info py-2 px-3 mb-0 small">
                  <i className="fas fa-bell me-1"></i>
                  Hay <strong>{stats.pendientesStaff}</strong> préstamo{stats.pendientesStaff === 1 ? '' : 's'} esperando aprobación.
                </div>
              )}

              {stats.activos === 0 && !stats.proximaDevolucion && stats.pendientesPropios === 0 && (!isStaff || !stats.pendientesStaff) && (
                <p className="text-muted small mb-0">No tienes préstamos activos en este momento.</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100">
      <div className="card-header bg-white border-bottom">
        <i className="fas fa-right-to-bracket me-2"></i>Ingresar
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
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
};

export default HomeLoginCard;

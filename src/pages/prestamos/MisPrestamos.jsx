import { Link } from 'react-router-dom';
import { useMisPrestamos } from './hooks/useMisPrestamos';

const ESTADO_BADGE = {
  PENDIENTE: 'bg-warning text-dark',
  APROBADO: 'bg-primary',
  RECHAZADO: 'bg-danger',
  DEVUELTO: 'bg-success',
};

const MisPrestamos = () => {
  const { prestamos, loading } = useMisPrestamos();

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-right-left me-2"></i>Mis préstamos</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : prestamos.length === 0 ? (
        <div className="alert alert-info">
          Todavía no has solicitado ningún préstamo. <Link to="/catalogo">Explora el catálogo</Link>.
        </div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Solicitado</th>
              <th>Devolución estimada</th>
              <th>Devolución real</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p.id}>
                <td>{p.libro?.titulo}</td>
                <td>{p.fechaPrestamo}</td>
                <td>{p.fechaDevolucionEstimada || <span className="text-muted">Por definir</span>}</td>
                <td>{p.fechaDevolucionReal || '—'}</td>
                <td><span className={`badge ${ESTADO_BADGE[p.estado]}`}>{p.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisPrestamos;

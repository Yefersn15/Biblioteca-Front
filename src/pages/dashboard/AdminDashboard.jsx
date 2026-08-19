import { useDashboard, diasVencido } from './hooks/useDashboard';
import Stat from './components/Stat';
import ListaLibros from './components/ListaLibros';
import Destacado from './components/Destacado';

const AdminDashboard = () => {
  const { isAdmin, stats, resumen, vencidos } = useDashboard();

  return (
    <div>
      <h2 className="mb-4">Panel de administración</h2>

      <div className="row g-3 mb-4">
        <Stat icon="fa-book" label="Libros en catálogo" value={stats?.libros} />
        <Stat icon="fa-feather" label="Autores" value={stats?.autores} />
        <Stat icon="fa-building" label="Editoriales" value={stats?.editoriales} />
        <Stat icon="fa-tags" label="Categorías" value={stats?.categorias} />
        <Stat icon="fa-book-open" label="Préstamos activos" value={stats?.activos} />
        {isAdmin && <Stat icon="fa-users" label="Usuarios registrados" value={stats?.usuarios} />}
        <Stat
          icon="fa-hourglass-half"
          label="Solicitudes por aprobar"
          value={stats?.pendientes}
          variant={stats?.pendientes > 0 ? 'warning' : undefined}
        />
        <Stat
          icon="fa-circle-exclamation"
          label="Libros agotados"
          value={stats?.agotados}
          variant={stats?.agotados > 0 ? 'warning' : undefined}
        />
      </div>

      <h5 className="mb-3">Estadísticas de préstamos</h5>
      <div className="row g-3 mb-4">
        <div className="col-md-6 col-lg-3">
          <ListaLibros titulo="Libros más prestados" items={resumen?.librosMasPrestados} />
        </div>
        <div className="col-md-6 col-lg-3">
          <ListaLibros titulo="Más prestados este mes" items={resumen?.librosMasPrestadosMes} />
        </div>
        <div className="col-md-6 col-lg-3">
          <Destacado titulo="Editorial más prestada" dato={resumen?.editorialMasPrestada} />
        </div>
        <div className="col-md-6 col-lg-3">
          <Destacado titulo="Autor más prestado" dato={resumen?.autorMasPrestado} />
        </div>
      </div>

      <h5 className="mb-3">
        Préstamos vencidos {vencidos && vencidos.length > 0 && <span className="badge bg-danger">{vencidos.length}</span>}
      </h5>
      <div className="card mb-4">
        <div className="card-body">
          {!vencidos ? (
            <div className="text-center py-3"><div className="spinner-border spinner-border-sm" role="status"></div></div>
          ) : vencidos.length === 0 ? (
            <p className="text-muted small mb-0">No hay préstamos vencidos en este momento.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Libro</th>
                    <th>Usuario</th>
                    <th>Debía devolverse</th>
                    <th>Días vencido</th>
                  </tr>
                </thead>
                <tbody>
                  {vencidos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.libro?.titulo}</td>
                      <td>{p.usuario?.nombres} {p.usuario?.apellidos}</td>
                      <td>{p.fechaDevolucionEstimada}</td>
                      <td><span className="badge bg-danger">{diasVencido(p.fechaDevolucionEstimada)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

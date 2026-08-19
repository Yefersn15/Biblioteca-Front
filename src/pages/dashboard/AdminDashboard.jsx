import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getLibros } from '../../services/api/libros.api';
import { getAll as getAutores } from '../../services/api/autores.api';
import { getAll as getEditoriales } from '../../services/api/editoriales.api';
import { getAll as getCategorias } from '../../services/api/categorias.api';
import { getPrestamos } from '../../services/api/prestamos.api';
import { getUsuarios } from '../../services/api/usuarios.api';
import { getResumenEstadisticas } from '../../services/api/estadisticas.api';

const total = (respuesta) => respuesta.pagination.total;
const diasVencido = (fechaISO) => Math.floor((new Date() - new Date(fechaISO)) / 86400000);

// Tarjeta de estadística, no de navegación: a propósito no lleva a ningún
// lado (ya está todo en el menú lateral) — solo da un vistazo rápido de qué
// necesita atención al entrar al panel.
const Stat = ({ icon, label, value, variant }) => (
  <div className="col-6 col-md-4 col-lg-3">
    <div className={`card h-100 ${variant ? `border-${variant}` : ''}`}>
      <div className="card-body d-flex align-items-center gap-3">
        <i className={`fas ${icon} fa-2x ${variant ? `text-${variant}` : 'text-muted'}`}></i>
        <div>
          <div className={`fs-4 fw-bold ${variant ? `text-${variant}` : ''}`}>{value ?? '—'}</div>
          <div className="small text-muted">{label}</div>
        </div>
      </div>
    </div>
  </div>
);

const ListaLibros = ({ titulo, items }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">{titulo}</div>
    <div className="card-body">
      {!items ? (
        <div className="text-center py-3"><div className="spinner-border spinner-border-sm" role="status"></div></div>
      ) : items.length === 0 ? (
        <p className="text-muted small mb-0">Todavía no hay préstamos registrados.</p>
      ) : (
        <ol className="list-group list-group-numbered list-group-flush">
          {items.map((libro) => (
            <li key={libro.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
              <span className="text-truncate me-2">{libro.titulo}</span>
              <span className="badge bg-secondary rounded-pill">{libro.total}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  </div>
);

const Destacado = ({ titulo, dato }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">{titulo}</div>
    <div className="card-body d-flex align-items-center gap-3">
      {!dato ? (
        <p className="text-muted small mb-0">Todavía no hay préstamos registrados.</p>
      ) : (
        <div>
          <div className="fw-bold">{dato.nombre}</div>
          <div className="small text-muted">{dato.total} préstamo{dato.total === 1 ? '' : 's'}</div>
        </div>
      )}
    </div>
  </div>
);

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [vencidos, setVencidos] = useState(null);

  useEffect(() => {
    const peticiones = [
      getLibros({ limit: 1 }),
      getAutores({ limit: 1 }),
      getEditoriales({ limit: 1 }),
      getCategorias({ limit: 1 }),
      getPrestamos({ limit: 1, estado: 'APROBADO' }),
      getPrestamos({ limit: 1, estado: 'PENDIENTE' }),
      getLibros({ limit: 1, agotados: true }),
    ];
    if (isAdmin) peticiones.push(getUsuarios({ limit: 1 }));

    Promise.all(peticiones).then(([libros, autores, editoriales, categorias, activos, pendientes, agotados, usuarios]) => {
      setStats({
        libros: total(libros),
        autores: total(autores),
        editoriales: total(editoriales),
        categorias: total(categorias),
        activos: total(activos),
        pendientes: total(pendientes),
        agotados: total(agotados),
        usuarios: usuarios ? total(usuarios) : null,
      });
    });

    getResumenEstadisticas().then(setResumen);
    getPrestamos({ vencidos: true, limit: 20 }).then(({ items }) => setVencidos(items));
  }, [isAdmin]);

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

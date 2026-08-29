import { useUsuariosAdmin, ROLES } from './hooks/useUsuariosAdmin';
import UsuarioRow from './components/UsuarioRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';

const UsuariosAdmin = () => {
  const {
    usuarios,
    loading,
    usuarioActual,
    search,
    setSearch,
    rolFiltro,
    setRolFiltro,
    estadoFiltro,
    setEstadoFiltro,
    cambiarRol,
    toggleEstado,
    handleEliminar,
  } = useUsuariosAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(usuarios, 5, [search, rolFiltro, estadoFiltro]);

  return (
    <div>
      <h2 className="mb-4">Usuarios</h2>

      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, documento o correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={rolFiltro} onChange={(e) => setRolFiltro(e.target.value)}>
            <option value="">Todos los roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : (
        <>
          <table className="table table-hover bg-white align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Contacto</th>
                <th>Rol</th>
                <th>Estado</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {itemsPagina.map((u) => (
                <UsuarioRow
                  key={u.id}
                  usuario={u}
                  usuarioActual={usuarioActual}
                  cambiarRol={cambiarRol}
                  toggleEstado={toggleEstado}
                  handleEliminar={handleEliminar}
                />
              ))}
            </tbody>
          </table>
          <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
        </>
      )}
    </div>
  );
};

export default UsuariosAdmin;

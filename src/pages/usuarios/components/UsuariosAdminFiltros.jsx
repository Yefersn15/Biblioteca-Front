const UsuariosAdminFiltros = ({
  search, setSearch,
  rolFiltro, setRolFiltro,
  estadoFiltro, setEstadoFiltro,
  roles,
}) => (
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
        {roles.map((r) => <option key={r} value={r}>{r}</option>)}
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
);

export default UsuariosAdminFiltros;

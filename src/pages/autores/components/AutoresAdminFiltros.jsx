const AutoresAdminFiltros = ({
  search, setSearch,
  nacionalidadFiltro, setNacionalidadFiltro,
  generoFiltro, setGeneroFiltro,
  estadoFiltro, setEstadoFiltro,
  nacionalidades, categorias,
}) => (
  <div className="row g-2 mb-3 align-items-center">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={nacionalidadFiltro} onChange={(e) => setNacionalidadFiltro(e.target.value)}>
        <option value="">Todas las nacionalidades</option>
        {nacionalidades.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
    <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
        <option value="">Todos los géneros</option>
        {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
    </div>
    <div className="col-6 col-md-2" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
        <option value="">Todos</option>
        <option value="true">Habilitados</option>
        <option value="false">Inhabilitados</option>
      </select>
    </div>
  </div>
);

export default AutoresAdminFiltros;

const LibrosAdminFiltros = ({
  search, setSearch,
  editorialId, setEditorialId,
  tipo, setTipo,
  estadoFiltro, setEstadoFiltro,
  editoriales, hayFiltros, limpiarFiltros,
}) => (
  <div className="row g-2 mb-3 align-items-center">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={editorialId} onChange={(e) => setEditorialId(e.target.value)}>
        <option value="">Todas las editoriales</option>
        {editoriales.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
      </select>
    </div>
    <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="">Todos los tipos</option>
        <option value="LIBRO">Libro</option>
        <option value="REVISTA">Revista</option>
        <option value="PERIODICO">Periódico</option>
        <option value="GUIA">Guía de aprendizaje</option>
      </select>
    </div>
    <div className="col-6 col-md-2" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
        <option value="">Todos</option>
        <option value="habilitados">Habilitados</option>
        <option value="inhabilitados">Inhabilitados</option>
        <option value="agotados">Agotados</option>
      </select>
    </div>
    {hayFiltros && (
      <div className="col-auto">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={limpiarFiltros}>
          <i className="fas fa-eraser me-1"></i>Limpiar filtros
        </button>
      </div>
    )}
  </div>
);

export default LibrosAdminFiltros;

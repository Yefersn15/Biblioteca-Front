const EditorialesAdminFiltros = ({ search, setSearch, estadoFiltro, setEstadoFiltro }) => (
  <div className="row g-2 mb-3">
    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-auto">
      <select
        className="form-select"
        value={estadoFiltro}
        onChange={(e) => setEstadoFiltro(e.target.value)}
      >
        <option value="">Todas</option>
        <option value="true">Habilitadas</option>
        <option value="false">Inhabilitadas</option>
      </select>
    </div>
  </div>
);

export default EditorialesAdminFiltros;

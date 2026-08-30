const PrestamosAdminFiltros = ({ search, setSearch, filtro, setFiltro }) => (
  <div className="row g-2 mb-3">
    <div className="col">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por libro o solicitante..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-auto">
      <select className="form-select" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="">Todos los estados</option>
        <option value="PENDIENTE">Pendientes</option>
        <option value="APROBADO">Aprobados</option>
        <option value="RECHAZADO">Rechazados</option>
        <option value="DEVUELTO">Devueltos</option>
      </select>
    </div>
  </div>
);

export default PrestamosAdminFiltros;

const PrestamosAdminFiltros = ({ search, setSearch, filtro, setFiltro }) => (
  <div className="d-flex gap-2">
    <input
      type="text"
      className="form-control"
      style={{ width: 260 }}
      placeholder="Buscar por libro o solicitante..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <select className="form-select" style={{ width: 200 }} value={filtro} onChange={(e) => setFiltro(e.target.value)}>
      <option value="">Todos los estados</option>
      <option value="PENDIENTE">Pendientes</option>
      <option value="APROBADO">Aprobados</option>
      <option value="RECHAZADO">Rechazados</option>
      <option value="DEVUELTO">Devueltos</option>
    </select>
  </div>
);

export default PrestamosAdminFiltros;

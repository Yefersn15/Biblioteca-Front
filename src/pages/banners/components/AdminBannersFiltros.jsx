import { BANNER_TEMPLATES } from '../hooks/bannerTemplates';

const AdminBannersFiltros = ({ search, setSearch, estadoFiltro, setEstadoFiltro, layoutFiltro, setLayoutFiltro }) => (
  <div className="row g-2 mb-3">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por título o texto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-md-4">
      <select
        className="form-select"
        value={estadoFiltro}
        onChange={(e) => setEstadoFiltro(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="true">Habilitados</option>
        <option value="false">Inhabilitados</option>
      </select>
    </div>
    <div className="col-md-4">
      <select
        className="form-select"
        value={layoutFiltro}
        onChange={(e) => setLayoutFiltro(e.target.value)}
      >
        <option value="">Todos los diseños</option>
        {BANNER_TEMPLATES.map((template) => (
          <option key={template.key} value={template.key}>
            {template.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default AdminBannersFiltros;

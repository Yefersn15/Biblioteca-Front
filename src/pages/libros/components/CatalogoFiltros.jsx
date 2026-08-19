import { ORDENES } from '../hooks/useCatalogoLibros';

const CatalogoFiltros = ({ search, setSearch, categorias, autores, categoriaId, autorId, sort, actualizarFiltro }) => (
  <div className="row g-2 mb-4">
    <div className="col-md-4">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    <div className="col-6 col-md" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={categoriaId} onChange={(e) => actualizarFiltro('categoriaId', e.target.value)}>
        <option value="">Todas las categorías</option>
        {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
    </div>
    <div className="col-6" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={autorId} onChange={(e) => actualizarFiltro('autorId', e.target.value)}>
        <option value="">Todos los autores</option>
        {autores.map((a) => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
      </select>
    </div>
    <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
      <select className="form-select" value={sort} onChange={(e) => actualizarFiltro('sort', e.target.value)}>
        {ORDENES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  </div>
);

export default CatalogoFiltros;

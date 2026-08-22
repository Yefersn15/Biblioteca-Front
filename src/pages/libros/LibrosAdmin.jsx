import { Link } from 'react-router-dom';
import { useLibrosAdmin } from './hooks/useLibrosAdmin';
import LibroRow from './components/LibroRow';

const LibrosAdmin = () => {
  const {
    libros,
    loading,
    search,
    setSearch,
    editorialId,
    setEditorialId,
    tipo,
    setTipo,
    agotados,
    setAgotados,
    editoriales,
    hayFiltros,
    limpiarFiltros,
    handleEliminar,
  } = useLibrosAdmin();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Libros</h2>
        <Link to="/admin/libros/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo libro
        </Link>
      </div>

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
        <div className="col-auto form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="soloAgotados"
            checked={agotados}
            onChange={(e) => setAgotados(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="soloAgotados">Solo agotados</label>
        </div>
        {hayFiltros && (
          <div className="col-auto">
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={limpiarFiltros}>
              <i className="fas fa-eraser me-1"></i>Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : libros.length === 0 ? (
        <div className="alert alert-info">No hay libros todavía.</div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Título</th>
              <th>Autor</th>
              <th>Tipo</th>
              <th>Copias</th>
              <th>Estado</th>
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <LibroRow key={libro.id} libro={libro} onEliminar={handleEliminar} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibrosAdmin;

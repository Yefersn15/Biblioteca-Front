import { Link } from 'react-router-dom';
import { useLibrosAdmin } from './hooks/useLibrosAdmin';
import LibroRow from './components/LibroRow';

const LibrosAdmin = () => {
  const { libros, loading, search, setSearch, handleEliminar } = useLibrosAdmin();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Libros</h2>
        <Link to="/admin/libros/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo libro
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por título..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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

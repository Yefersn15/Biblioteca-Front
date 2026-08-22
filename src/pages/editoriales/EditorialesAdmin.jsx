import { Link } from 'react-router-dom';
import { useEditorialesAdmin } from './hooks/useEditorialesAdmin';
import EditorialRow from './components/EditorialRow';

const EditorialesAdmin = () => {
  const { editoriales, loading, search, setSearch, handleEliminar } = useEditorialesAdmin();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Editoriales</h2>
        <Link to="/admin/editoriales/nueva" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nueva editorial
        </Link>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : editoriales.length === 0 ? (
        <div className="alert alert-info">No hay editoriales todavía.</div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Sitio web</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {editoriales.map((e) => (
              <EditorialRow key={e.id} editorial={e} onEliminar={handleEliminar} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditorialesAdmin;

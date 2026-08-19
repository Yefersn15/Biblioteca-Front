import { Link } from 'react-router-dom';
import { useAutoresAdmin } from './hooks/useAutoresAdmin';
import AutorRow from './components/AutorRow';

const AutoresAdmin = () => {
  const { autores, loading, handleEliminar } = useAutoresAdmin();

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Autores</h2>
        <Link to="/admin/autores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo autor
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : autores.length === 0 ? (
        <div className="alert alert-info">No hay autores todavía.</div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Género literario</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {autores.map((a) => (
              <AutorRow key={a.id} autor={a} onEliminar={handleEliminar} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AutoresAdmin;

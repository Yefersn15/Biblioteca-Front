import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLibros, eliminarLibro } from '../../services/api/libros.api';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { formatAutores } from '../../utils/formatAutores';

const LibrosAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const cargar = async () => {
    setLoading(true);
    const { items } = await getLibros({ limit: 100, search: search || undefined });
    setLibros(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [search]);

  const handleEliminar = async (libro) => {
    if (!(await confirm(`¿Eliminar "${libro.titulo}"? Se ocultará del catálogo público.`))) return;
    try {
      await eliminarLibro(libro.id);
      toast.success('Libro eliminado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
              <tr key={libro.id}>
                <td>
                  {libro.portadaUrl && (
                    <img src={libro.portadaUrl} alt="" style={{ width: 36, height: 48, objectFit: 'cover' }} />
                  )}
                </td>
                <td>{libro.titulo}</td>
                <td>{formatAutores(libro)}</td>
                <td>{libro.tipo}</td>
                <td>{libro.copiasDisponibles} / {libro.copiasTotales}</td>
                <td>
                  <span className={`badge ${libro.estado ? 'bg-success' : 'bg-secondary'}`}>
                    {libro.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <Link to={`/admin/libros/editar/${libro.id}`} className="btn btn-sm btn-outline-primary me-1">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(libro)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibrosAdmin;

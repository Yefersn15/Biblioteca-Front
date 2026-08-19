import { Link } from 'react-router-dom';
import { formatAutores } from '../../../utils/formatAutores';

const LibroRow = ({ libro, onEliminar }) => (
  <tr>
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
      <Link to={`/admin/libros/editar/${libro.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
        <i className="fas fa-edit"></i>
      </Link>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(libro)} title="Eliminar">
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

export default LibroRow;

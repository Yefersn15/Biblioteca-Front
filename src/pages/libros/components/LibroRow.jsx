import { Link } from 'react-router-dom';
import { formatAutores } from '../../../utils/formatAutores';

const LibroRow = ({ libro, toggleEstado, onEliminar }) => (
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
      <button
        className={`btn btn-sm ${libro.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
        onClick={() => toggleEstado(libro)}
        title={libro.estado ? 'Desactivar' : 'Activar'}
      >
        <i className={`fas fa-toggle-${libro.estado ? 'off' : 'on'}`}></i>
      </button>
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

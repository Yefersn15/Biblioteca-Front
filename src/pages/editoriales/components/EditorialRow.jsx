import { Link } from 'react-router-dom';

const EditorialRow = ({ editorial, onEliminar, onToggleEstado }) => (
  <tr>
    <td>
      {editorial.logoUrl && (
        <img src={editorial.logoUrl} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
      )}
    </td>
    <td>{editorial.nombre}</td>
    <td>
      {editorial.sitioWeb && (
        <a href={editorial.sitioWeb} target="_blank" rel="noopener noreferrer">{editorial.sitioWeb}</a>
      )}
    </td>
    <td>
      <Link to={`/admin/editoriales/editar/${editorial.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
        <i className="fas fa-edit"></i>
      </Link>
      <button
        className={`btn btn-sm ${editorial.estado ? 'btn-outline-warning' : 'btn-outline-success'} me-1`}
        onClick={() => onToggleEstado(editorial)}
        title={editorial.estado ? 'Desactivar' : 'Activar'}
      >
        <i className={`fas fa-toggle-${editorial.estado ? 'off' : 'on'}`}></i>
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(editorial)} title="Eliminar">
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

export default EditorialRow;

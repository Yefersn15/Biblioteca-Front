import { Link } from 'react-router-dom';

const AutorRow = ({ autor, onEliminar, toggleEstado }) => (
  <tr>
    <td>
      {autor.fotografiaUrl && (
        <img src={autor.fotografiaUrl} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%' }} />
      )}
    </td>
    <td>{autor.nombre} {autor.apellido}</td>
    <td>{autor.nacionalidad}</td>
    <td>{autor.generoLiterario}</td>
    <td>
      <button
        className={`btn btn-sm ${autor.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
        onClick={() => toggleEstado(autor)}
        title={autor.estado ? 'Desactivar' : 'Activar'}
      >
        <i className={`fas fa-toggle-${autor.estado ? 'off' : 'on'}`}></i>
      </button>
    </td>
    <td>
      <Link to={`/admin/autores/editar/${autor.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
        <i className="fas fa-edit"></i>
      </Link>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(autor)} title="Eliminar">
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

export default AutorRow;

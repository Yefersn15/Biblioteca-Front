import { Link } from 'react-router-dom';

const CategoriaRow = ({ categoria, onEliminar, onToggleEstado }) => (
  <tr>
    <td>{categoria.nombre}</td>
    <td className="text-muted small">{categoria.descripcion}</td>
    <td>
      <button
        className={`btn btn-sm ${categoria.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
        onClick={() => onToggleEstado(categoria)}
        title={categoria.estado ? 'Desactivar' : 'Activar'}
      >
        <i className={`fas fa-toggle-${categoria.estado ? 'off' : 'on'}`}></i>
      </button>
    </td>
    <td>
      <Link to={`/admin/categorias/editar/${categoria.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
        <i className="fas fa-edit"></i>
      </Link>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onEliminar(categoria)} title="Eliminar">
        <i className="fas fa-trash"></i>
      </button>
    </td>
  </tr>
);

export default CategoriaRow;

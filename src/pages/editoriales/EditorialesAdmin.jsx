import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/api/editoriales.api';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const EditorialesAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [editoriales, setEditoriales] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({ limit: 200 });
    setEditoriales(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

  const handleEliminar = async (editorial) => {
    if (!(await confirm(`¿Eliminar "${editorial.nombre}"?`))) return;
    try {
      await remove(editorial.id);
      toast.success('Editorial eliminada');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Editoriales</h2>
        <Link to="/admin/editoriales/nueva" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nueva editorial
        </Link>
      </div>

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
              <tr key={e.id}>
                <td>
                  {e.logoUrl && (
                    <img src={e.logoUrl} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                  )}
                </td>
                <td>{e.nombre}</td>
                <td>
                  {e.sitioWeb && (
                    <a href={e.sitioWeb} target="_blank" rel="noopener noreferrer">{e.sitioWeb}</a>
                  )}
                </td>
                <td>
                  <Link to={`/admin/editoriales/editar/${e.id}`} className="btn btn-sm btn-outline-primary me-1">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(e)}>
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

export default EditorialesAdmin;

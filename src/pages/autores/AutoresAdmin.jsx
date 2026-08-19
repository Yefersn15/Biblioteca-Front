import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll, remove } from '../../services/api/autores.api';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const AutoresAdmin = () => {
  const toast = useToast();
  const confirm = useConfirm();
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getAll({ limit: 200 });
    setAutores(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

  const handleEliminar = async (autor) => {
    if (!(await confirm(`¿Eliminar a "${autor.nombre} ${autor.apellido || ''}"?`))) return;
    try {
      await remove(autor.id);
      toast.success('Autor eliminado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
              <tr key={a.id}>
                <td>
                  {a.fotografiaUrl && (
                    <img src={a.fotografiaUrl} alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%' }} />
                  )}
                </td>
                <td>{a.nombre} {a.apellido}</td>
                <td>{a.nacionalidad}</td>
                <td>{a.generoLiterario}</td>
                <td>
                  <Link to={`/admin/autores/editar/${a.id}`} className="btn btn-sm btn-outline-primary me-1">
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(a)}>
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

export default AutoresAdmin;

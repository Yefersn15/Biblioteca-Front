import { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

// CRUD genérico para catálogos simples (autores, editoriales, categorías):
// listas casi idénticas donde solo cambian los campos del formulario. Evita
// triplicar la misma página con distinto nombre de recurso.
const CatalogoCRUD = ({ titulo, api, fields }) => {
  const toast = useToast();
  const confirm = useConfirm();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null); // null = cerrado, {} = nuevo, {...} = editar
  const [form, setForm] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [search, setSearch] = useState('');

  const cargar = async () => {
    setLoading(true);
    const { items } = await api.getAll({ search: search || undefined, limit: 100 });
    setItems(items);
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => { cargar(); }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const abrirNuevo = () => {
    setForm(Object.fromEntries(fields.map((f) => [f.name, ''])));
    setEditando({});
  };

  const abrirEditar = (item) => {
    setForm(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? ''])));
    setEditando(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (editando?.id) {
        await api.update(editando.id, form);
        toast.success(`${titulo} actualizado`);
      } else {
        await api.create(form);
        toast.success(`${titulo} creado`);
      }
      setEditando(null);
      await cargar();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (item) => {
    if (!(await confirm(`¿Eliminar "${item.nombre}"?`))) return;
    try {
      await api.remove(item.id);
      toast.success(`${titulo} eliminado`);
      await cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{titulo}</h2>
        <button className="btn btn-primary" onClick={abrirNuevo}>
          <i className="fas fa-plus me-1"></i>Nuevo
        </button>
      </div>

      {editando && (
        <div className="card mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {fields.map((f) => (
                  <div className={f.type === 'textarea' ? 'col-12' : 'col-md-6'} key={f.name}>
                    <label className="form-label">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        className="form-control"
                        rows={3}
                        value={form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        required={f.required}
                        value={form[f.name]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={guardando}>
                  <i className="fas fa-save me-1"></i>{guardando ? 'Guardando...' : 'Guardar'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditando(null)}>
                  <i className="fas fa-times me-1"></i>Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Buscar ${titulo.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No hay registros todavía.</div>
      ) : (
        <table className="table table-hover bg-white">
          <thead>
            <tr>
              {fields.map((f) => <th key={f.name}>{f.label}</th>)}
              <th style={{ width: 120 }}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {fields.map((f) => <td key={f.name}>{item[f.name]}</td>)}
                <td>
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => abrirEditar(item)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(item)}>
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

export default CatalogoCRUD;

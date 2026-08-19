import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../../services/api/editoriales.api';
import ImageUploadField from '../../components/upload/ImageUploadField';
import { useToast } from '../../context/ToastContext';

const FORM_INICIAL = { nombre: '', descripcion: '', logoUrl: '', sitioWeb: '' };

const EditorialForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!editando) return;
    getById(id).then((e) => {
      setForm({
        nombre: e.nombre,
        descripcion: e.descripcion || '',
        logoUrl: e.logoUrl || '',
        sitioWeb: e.sitioWeb || '',
      });
      setCargando(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (editando) {
        await update(id, form);
        toast.success('Editorial actualizada');
      } else {
        await create(form);
        toast.success('Editorial creada');
      }
      navigate('/admin/editoriales');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2 className="mb-4">{editando ? 'Editar editorial' : 'Nueva editorial'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre *</label>
                <input type="text" className="form-control" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sitio web</label>
                <input type="url" className="form-control" placeholder="https://..." value={form.sitioWeb} onChange={(e) => setForm({ ...form, sitioWeb: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
              </div>

              <div className="col-12">
                <ImageUploadField
                  label="Logo"
                  folder="editoriales"
                  value={form.logoUrl}
                  onValueChange={(url) => setForm({ ...form, logoUrl: url })}
                />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/editoriales')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditorialForm;

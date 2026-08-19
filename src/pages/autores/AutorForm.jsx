import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../../services/api/autores.api';
import ImageUploadField from '../../components/upload/ImageUploadField';
import { useToast } from '../../context/ToastContext';

const FORM_INICIAL = {
  nombre: '',
  apellido: '',
  nacionalidad: '',
  generoLiterario: '',
  biografia: '',
  fotografiaUrl: '',
  idiomaPrincipal: '',
  obrasDestacadas: '',
  premios: '',
  redesSociales: { facebook: '', twitter: '', instagram: '', portafolio: '' },
};

const AutorForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!editando) return;
    getById(id).then((a) => {
      setForm({
        nombre: a.nombre,
        apellido: a.apellido || '',
        nacionalidad: a.nacionalidad || '',
        generoLiterario: a.generoLiterario || '',
        biografia: a.biografia || '',
        fotografiaUrl: a.fotografiaUrl || '',
        idiomaPrincipal: a.idiomaPrincipal || '',
        obrasDestacadas: (a.obrasDestacadas || []).join(', '),
        premios: (a.premios || []).join(', '),
        redesSociales: { facebook: '', twitter: '', instagram: '', portafolio: '', ...(a.redesSociales || {}) },
      });
      setCargando(false);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const payload = {
        ...form,
        obrasDestacadas: form.obrasDestacadas.split(',').map((s) => s.trim()).filter(Boolean),
        premios: form.premios.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (editando) {
        await update(id, payload);
        toast.success('Autor actualizado');
      } else {
        await create(payload);
        toast.success('Autor creado');
      }
      navigate('/admin/autores');
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
      <h2 className="mb-4">{editando ? 'Editar autor' : 'Nuevo autor'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre *</label>
                <input type="text" className="form-control" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input type="text" className="form-control" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
              </div>

              <div className="col-md-4">
                <label className="form-label">Nacionalidad</label>
                <input type="text" className="form-control" value={form.nacionalidad} onChange={(e) => setForm({ ...form, nacionalidad: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Género literario</label>
                <input type="text" className="form-control" value={form.generoLiterario} onChange={(e) => setForm({ ...form, generoLiterario: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Idioma principal</label>
                <input type="text" className="form-control" value={form.idiomaPrincipal} onChange={(e) => setForm({ ...form, idiomaPrincipal: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label">Biografía</label>
                <textarea className="form-control" rows={4} value={form.biografia} onChange={(e) => setForm({ ...form, biografia: e.target.value })} />
              </div>

              <div className="col-12">
                <ImageUploadField
                  label="Fotografía"
                  folder="autores"
                  value={form.fotografiaUrl}
                  onValueChange={(url) => setForm({ ...form, fotografiaUrl: url })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Obras destacadas (separadas por comas)</label>
                <input type="text" className="form-control" placeholder="Cien años de soledad, El otoño del patriarca" value={form.obrasDestacadas} onChange={(e) => setForm({ ...form, obrasDestacadas: e.target.value })} />
              </div>
              <div className="col-md-6">
                <label className="form-label">Premios (separados por comas)</label>
                <input type="text" className="form-control" placeholder="Premio Nobel, Premio Cervantes" value={form.premios} onChange={(e) => setForm({ ...form, premios: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label fw-bold">Redes sociales</label>
              </div>
              <div className="col-md-3">
                <input type="url" className="form-control" placeholder="Facebook" value={form.redesSociales.facebook} onChange={(e) => setForm({ ...form, redesSociales: { ...form.redesSociales, facebook: e.target.value } })} />
              </div>
              <div className="col-md-3">
                <input type="url" className="form-control" placeholder="Twitter/X" value={form.redesSociales.twitter} onChange={(e) => setForm({ ...form, redesSociales: { ...form.redesSociales, twitter: e.target.value } })} />
              </div>
              <div className="col-md-3">
                <input type="url" className="form-control" placeholder="Instagram" value={form.redesSociales.instagram} onChange={(e) => setForm({ ...form, redesSociales: { ...form.redesSociales, instagram: e.target.value } })} />
              </div>
              <div className="col-md-3">
                <input type="url" className="form-control" placeholder="Portafolio" value={form.redesSociales.portafolio} onChange={(e) => setForm({ ...form, redesSociales: { ...form.redesSociales, portafolio: e.target.value } })} />
              </div>
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/autores')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AutorForm;

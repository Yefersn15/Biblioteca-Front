import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLibro, crearLibro, actualizarLibro } from '../../services/api/libros.api';
import * as autoresApi from '../../services/api/autores.api';
import * as editorialesApi from '../../services/api/editoriales.api';
import * as categoriasApi from '../../services/api/categorias.api';
import ImageUploadField from '../../components/upload/ImageUploadField';
import { useToast } from '../../context/ToastContext';

const FORM_INICIAL = {
  titulo: '',
  autorIds: [],
  editorialId: '',
  tipo: 'LIBRO',
  descripcion: '',
  portadaUrl: '',
  isbn: '',
  anioPublicacion: '',
  idioma: '',
  archivoUrl: '',
  etiquetas: '',
  paginas: '',
  copiasTotales: 1,
  categoriaIds: [],
  estado: true,
};

const LibroForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    (async () => {
      const [{ items: a }, { items: e }, { items: c }] = await Promise.all([
        autoresApi.getAll({ limit: 200 }),
        editorialesApi.getAll({ limit: 200 }),
        categoriasApi.getAll({ limit: 200 }),
      ]);
      setAutores(a);
      setEditoriales(e);
      setCategorias(c);

      if (editando) {
        const libro = await getLibro(id);
        setForm({
          titulo: libro.titulo,
          autorIds: libro.autores?.map((a) => a.id) || [],
          editorialId: libro.editorialId || '',
          tipo: libro.tipo,
          descripcion: libro.descripcion || '',
          portadaUrl: libro.portadaUrl || '',
          isbn: libro.isbn || '',
          anioPublicacion: libro.anioPublicacion || '',
          idioma: libro.idioma || '',
          archivoUrl: libro.archivoUrl || '',
          etiquetas: (libro.etiquetas || []).join(', '),
          paginas: libro.paginas || '',
          copiasTotales: libro.copiasTotales,
          categoriaIds: libro.categorias?.map((c) => c.id) || [],
          estado: libro.estado,
        });
        setCargando(false);
      }
    })();
  }, [id]);

  const toggleEnLista = (campo, valorId) => {
    setForm((prev) => ({
      ...prev,
      [campo]: prev[campo].includes(valorId)
        ? prev[campo].filter((i) => i !== valorId)
        : [...prev[campo], valorId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.autorIds.length === 0) {
      toast.error('Selecciona al menos un autor');
      return;
    }
    setGuardando(true);
    try {
      const payload = {
        ...form,
        editorialId: form.editorialId || undefined,
        anioPublicacion: form.anioPublicacion || undefined,
        isbn: form.isbn || undefined,
        idioma: form.idioma || undefined,
        archivoUrl: form.archivoUrl || undefined,
        paginas: form.paginas || undefined,
        etiquetas: form.etiquetas ? form.etiquetas.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };
      if (editando) {
        await actualizarLibro(id, payload);
        toast.success('Libro actualizado');
      } else {
        await crearLibro(payload);
        toast.success('Libro creado');
      }
      navigate('/admin/libros');
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
      <h2 className="mb-4">{editando ? 'Editar libro' : 'Nuevo libro'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={form.titulo}
                  onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                >
                  <option value="LIBRO">Libro</option>
                  <option value="REVISTA">Revista</option>
                  <option value="PERIODICO">Periódico</option>
                  <option value="GUIA">Guía de aprendizaje</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label d-block">Autor(es) *</label>
                {autores.length === 0 && <p className="text-muted small">No hay autores creados todavía.</p>}
                {autores.map((a) => (
                  <div className="form-check form-check-inline" key={a.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`autor-${a.id}`}
                      checked={form.autorIds.includes(a.id)}
                      onChange={() => toggleEnLista('autorIds', a.id)}
                    />
                    <label className="form-check-label" htmlFor={`autor-${a.id}`}>
                      {a.nombre} {a.apellido}
                    </label>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <label className="form-label">Editorial (opcional)</label>
                <select
                  className="form-select"
                  value={form.editorialId}
                  onChange={(e) => setForm({ ...form, editorialId: e.target.value })}
                >
                  <option value="">Sin editorial</option>
                  {editoriales.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Idioma</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Español, inglés..."
                  value={form.idioma}
                  onChange={(e) => setForm({ ...form, idioma: e.target.value })}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
              </div>

              <div className="col-12">
                <ImageUploadField
                  label="Portada"
                  folder="libros"
                  value={form.portadaUrl}
                  onValueChange={(url) => setForm({ ...form, portadaUrl: url })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Archivo digital (URL, opcional)</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://.../libro.pdf"
                  value={form.archivoUrl}
                  onChange={(e) => setForm({ ...form, archivoUrl: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Etiquetas (separadas por comas)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ficción, clásico, bestseller"
                  value={form.etiquetas}
                  onChange={(e) => setForm({ ...form, etiquetas: e.target.value })}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">ISBN</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.isbn}
                  onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Año de publicación</label>
                <input
                  type="number"
                  className="form-control"
                  value={form.anioPublicacion}
                  onChange={(e) => setForm({ ...form, anioPublicacion: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Páginas</label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  value={form.paginas}
                  onChange={(e) => setForm({ ...form, paginas: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Copias totales</label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  required
                  value={form.copiasTotales}
                  onChange={(e) => setForm({ ...form, copiasTotales: Number(e.target.value) })}
                />
              </div>

              <div className="col-12">
                <label className="form-label d-block">Categorías</label>
                {categorias.map((c) => (
                  <div className="form-check form-check-inline" key={c.id}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`cat-${c.id}`}
                      checked={form.categoriaIds.includes(c.id)}
                      onChange={() => toggleEnLista('categoriaIds', c.id)}
                    />
                    <label className="form-check-label" htmlFor={`cat-${c.id}`}>{c.nombre}</label>
                  </div>
                ))}
              </div>

              {editando && (
                <div className="col-12 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="libroEstado"
                    checked={form.estado}
                    onChange={(e) => setForm({ ...form, estado: e.target.checked })}
                  />
                  <label className="form-check-label" htmlFor="libroEstado">Visible en el catálogo</label>
                </div>
              )}
            </div>

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/libros')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LibroForm;

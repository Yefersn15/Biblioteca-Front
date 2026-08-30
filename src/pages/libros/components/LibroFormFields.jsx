import ImageUploadField from '../../../components/upload/ImageUploadField';
import { isbnEsValido } from '../../../validations/isbn';

const ANIO_MIN = 1000;
const ANIO_MAX = 3000;

const LibroFormFields = ({ form, setForm, autores, editoriales, categorias, editando, toggleEnLista, intentoEnviar }) => {
  const sinAutores = intentoEnviar && form.autorIds.length === 0;
  const isbnInvalido = form.isbn?.trim() && !isbnEsValido(form.isbn);

  return (
  <div className="row g-3">
    <div className="col-md-8">
      <label className="form-label">Título</label>
      <input
        type="text"
        className="form-control"
        required
        maxLength={200}
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
      <label className={`form-label d-block ${sinAutores ? 'text-danger' : ''}`}>Autor(es) *</label>
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
      {sinAutores && <div className="small text-danger mt-1">Selecciona al menos un autor</div>}
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
        maxLength={60}
        value={form.idioma}
        onChange={(e) => setForm({ ...form, idioma: e.target.value })}
      />
    </div>

    <div className="col-12">
      <label className="form-label">Descripción</label>
      <textarea
        className="form-control"
        rows={3}
        maxLength={5000}
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

    <div className="col-md-3">
      <label className="form-label">ISBN</label>
      <input
        type="text"
        className={`form-control ${isbnInvalido ? 'is-invalid' : ''}`}
        placeholder="ISBN-10 o ISBN-13"
        value={form.isbn}
        onChange={(e) => setForm({ ...form, isbn: e.target.value })}
      />
      {isbnInvalido && <div className="invalid-feedback">Debe tener 10 o 13 dígitos</div>}
    </div>
    <div className="col-md-3">
      <label className="form-label">Año de publicación</label>
      <input
        type="number"
        className="form-control"
        min={ANIO_MIN}
        max={ANIO_MAX}
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
  );
};

export default LibroFormFields;

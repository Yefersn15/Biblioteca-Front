import { useState, useEffect } from 'react';
import BannerTemplatePicker from './BannerTemplatePicker';
import BannerCollage from './BannerCollage';
import EntityMultiPicker from './EntityMultiPicker';
import ImageUploadField from '../../../components/upload/ImageUploadField';
import { getTemplate } from '../hooks/bannerTemplates';
import { getLibros, getLibrosPopulares } from '../../../services/api/libros.api';
import { getAll as getAutores } from '../../../services/api/autores.api';
import { getAll as getEditoriales } from '../../../services/api/editoriales.api';
import { getAll as getCategorias } from '../../../services/api/categorias.api';

const TEXT_POSITIONS = [
  { value: 'none', label: 'Sin texto' },
  { value: 'left', label: 'Texto a la izquierda' },
  { value: 'right', label: 'Texto a la derecha' },
  { value: 'center', label: 'Texto centrado' },
];

const CONTENT_TYPES = [
  { value: 'IMAGENES', label: 'Imágenes personalizadas' },
  { value: 'LIBROS', label: 'Libros destacados (a mano)' },
  { value: 'AUTORES', label: 'Autores destacados (a mano)' },
  { value: 'EDITORIALES', label: 'Editoriales destacadas (a mano)' },
  { value: 'CATEGORIAS', label: 'Categorías destacadas (a mano)' },
  { value: 'POPULARES', label: 'Autor / Editorial / Categoría con sus libros más populares' },
];

const ORIGENES_POPULARES = [
  { value: 'CATEGORIA', label: 'Categoría' },
  { value: 'AUTOR', label: 'Autor' },
  { value: 'EDITORIAL', label: 'Editorial' },
];

// `shape` le dice a BannerCollage qué proporción real respetar: 'book'
// (portada vertical 2:3) o 'square' (foto/logo cuadrado 1:1) — así la
// casilla nunca recorta ni estira, sea cual sea la plantilla elegida.
const libroAItem = (l) => ({ id: l.id, imageUrl: l.portadaUrl, label: l.titulo, linkTo: `/catalogo/${l.id}`, shape: 'book' });
const autorAItem = (a) => ({ id: a.id, imageUrl: a.fotografiaUrl, label: `${a.nombre} ${a.apellido}`, linkTo: `/catalogo/autores/${a.id}`, shape: 'square' });
const editorialAItem = (e) => ({ id: e.id, imageUrl: e.logoUrl, label: e.nombre, linkTo: `/catalogo/editoriales/${e.id}`, shape: 'square' });
const categoriaAItem = (c) => ({ id: c.id, imageUrl: null, label: c.nombre, linkTo: `/catalogo?categoriaId=${c.id}`, shape: 'square' });

const BannerFormFields = ({ form, errors, setLayout, setImageUrl, setField, setContentType, setOrigen }) => {
  const template = getTemplate(form.layout);
  const slots = template.slots;

  const [libros, setLibros] = useState([]);
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [populares, setPopulares] = useState([]);

  useEffect(() => {
    getLibros({ limit: 200 }).then(({ items }) => setLibros(items));
    getAutores({ limit: 200 }).then(({ items }) => setAutores(items));
    getEditoriales({ limit: 200 }).then(({ items }) => setEditoriales(items));
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
  }, []);

  // Vista previa en vivo de "Populares": consulta al backend con el mismo
  // criterio que usará el banner ya guardado (ver banners.service en el
  // backend) para los libros — la casilla destacada solo necesita al
  // autor/editorial/categoría elegido, que ya está en las listas cargadas.
  useEffect(() => {
    if (form.contentType !== 'POPULARES' || !form.origen || !form.origenId) {
      setPopulares([]);
      return;
    }
    const clave = { CATEGORIA: 'categoriaId', AUTOR: 'autorId', EDITORIAL: 'editorialId' }[form.origen];
    getLibrosPopulares({ limit: Math.max(slots - 1, 0), [clave]: form.origenId }).then(setPopulares);
  }, [form.contentType, form.origen, form.origenId, slots]);

  let previewItems = null;
  if (form.contentType === 'LIBROS') {
    previewItems = form.refIds.map((id) => libros.find((l) => l.id === id)).filter(Boolean).map(libroAItem);
  } else if (form.contentType === 'AUTORES') {
    previewItems = form.refIds.map((id) => autores.find((a) => a.id === id)).filter(Boolean).map(autorAItem);
  } else if (form.contentType === 'EDITORIALES') {
    previewItems = form.refIds.map((id) => editoriales.find((e) => e.id === id)).filter(Boolean).map(editorialAItem);
  } else if (form.contentType === 'CATEGORIAS') {
    previewItems = form.refIds.map((id) => categorias.find((c) => c.id === id)).filter(Boolean).map(categoriaAItem);
  } else if (form.contentType === 'POPULARES') {
    const featuredSlot = template.featuredSlot ?? 0;
    const entidad = form.origen === 'CATEGORIA' ? categorias.find((c) => c.id === form.origenId)
      : form.origen === 'AUTOR' ? autores.find((a) => a.id === form.origenId)
      : form.origen === 'EDITORIAL' ? editoriales.find((e) => e.id === form.origenId)
      : null;
    const entidadItem = entidad && {
      CATEGORIA: categoriaAItem,
      AUTOR: autorAItem,
      EDITORIAL: editorialAItem,
    }[form.origen](entidad);

    previewItems = new Array(slots).fill(null);
    previewItems[featuredSlot] = entidadItem || null;
    let li = 0;
    for (let i = 0; i < slots; i++) {
      if (i === featuredSlot) continue;
      previewItems[i] = populares[li] ? libroAItem(populares[li]) : null;
      li++;
    }
  }

  return (
  <>
    <div className="mb-4">
      <label className="form-label fw-bold">Plantilla de collage</label>
      <BannerTemplatePicker value={form.layout} onChange={setLayout} />
    </div>

    <div className="mb-4">
      <label className="form-label fw-bold">Contenido del banner</label>
      <select className="form-select" value={form.contentType} onChange={(e) => setContentType(e.target.value)}>
        {CONTENT_TYPES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>

    {form.contentType === 'IMAGENES' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Imágenes</label>
        {errors.images && <div className="alert alert-danger py-2">{errors.images}</div>}
        <div className="row g-3">
          {form.images.map((img, i) => (
            <div className="col-md-6" key={i}>
              <ImageUploadField
                label={`Imagen ${i + 1}`}
                value={img.url}
                onValueChange={(url) => setImageUrl(i, url)}
                folder="banners"
                maxWidth={template.maxWidth}
                size={64}
              />
            </div>
          ))}
        </div>
      </div>
    )}

    {form.contentType === 'LIBROS' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Libros a destacar</label>
        {errors.refIds && <div className="alert alert-danger py-2">{errors.refIds}</div>}
        <EntityMultiPicker
          items={libros}
          getLabel={(l) => l.titulo}
          getImage={(l) => l.portadaUrl}
          value={form.refIds}
          onChange={(refIds) => setField('refIds', refIds)}
          max={slots}
        />
      </div>
    )}

    {form.contentType === 'AUTORES' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Autores a destacar</label>
        {errors.refIds && <div className="alert alert-danger py-2">{errors.refIds}</div>}
        <EntityMultiPicker
          items={autores}
          getLabel={(a) => `${a.nombre} ${a.apellido}`}
          getImage={(a) => a.fotografiaUrl}
          value={form.refIds}
          onChange={(refIds) => setField('refIds', refIds)}
          max={slots}
        />
      </div>
    )}

    {form.contentType === 'EDITORIALES' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Editoriales a destacar</label>
        {errors.refIds && <div className="alert alert-danger py-2">{errors.refIds}</div>}
        <EntityMultiPicker
          items={editoriales}
          getLabel={(e) => e.nombre}
          getImage={(e) => e.logoUrl}
          value={form.refIds}
          onChange={(refIds) => setField('refIds', refIds)}
          max={slots}
        />
      </div>
    )}

    {form.contentType === 'CATEGORIAS' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Categorías a destacar</label>
        {errors.refIds && <div className="alert alert-danger py-2">{errors.refIds}</div>}
        <EntityMultiPicker
          items={categorias}
          getLabel={(c) => c.nombre}
          getImage={() => null}
          value={form.refIds}
          onChange={(refIds) => setField('refIds', refIds)}
          max={slots}
        />
      </div>
    )}

    {form.contentType === 'POPULARES' && (
      <div className="mb-4">
        <label className="form-label fw-bold">Autor / Editorial / Categoría destacado</label>
        {errors.origen && <div className="alert alert-danger py-2">{errors.origen}</div>}
        <select className="form-select mb-3" value={form.origen || ''} onChange={(e) => setOrigen(e.target.value || null)}>
          <option value="">Selecciona un tipo...</option>
          {ORIGENES_POPULARES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        {errors.origenId && <div className="alert alert-danger py-2">{errors.origenId}</div>}
        {form.origen && (
          <select
            className="form-select"
            value={form.origenId || ''}
            onChange={(e) => setField('origenId', Number(e.target.value) || null)}
          >
            <option value="">Selecciona...</option>
            {form.origen === 'CATEGORIA' && categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            {form.origen === 'AUTOR' && autores.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
            {form.origen === 'EDITORIAL' && editoriales.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        )}
        <small className="text-muted d-block mt-2">
          La casilla destacada muestra lo que elijas arriba (clic → su página); las {Math.max(slots - 1, 0)} casillas restantes se llenan solas con sus libros más prestados, y se actualizan automáticamente.
        </small>
      </div>
    )}

    <div className="row mb-4">
      <div className="col-md-6">
        <label className="form-label">Título (opcional)</label>
        <input
          type="text"
          className="form-control"
          value={form.titulo}
          onChange={(e) => setField('titulo', e.target.value)}
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">Posición del texto</label>
        <select
          className="form-select"
          value={form.textPosition}
          onChange={(e) => setField('textPosition', e.target.value)}
        >
          {TEXT_POSITIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {form.textPosition !== 'none' && (
        <div className="col-12 mt-3">
          <label className="form-label">Texto</label>
          <textarea
            className={`form-control ${errors.texto ? 'is-invalid' : ''}`}
            rows={2}
            value={form.texto}
            onChange={(e) => setField('texto', e.target.value)}
          />
          {errors.texto && <div className="invalid-feedback">{errors.texto}</div>}
        </div>
      )}
    </div>

    <div className="mb-4">
      <label className="form-label fw-bold">Vista previa</label>
      <BannerCollage
        layout={form.layout}
        images={form.images}
        items={previewItems}
        titulo={form.titulo}
        texto={form.texto}
        textPosition={form.textPosition}
        height={260}
      />
    </div>

    <div className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id="bannerEstado"
        checked={form.estado}
        onChange={(e) => setField('estado', e.target.checked)}
      />
      <label className="form-check-label" htmlFor="bannerEstado">Banner activo (visible en la tienda)</label>
    </div>
  </>
  );
};

export default BannerFormFields;

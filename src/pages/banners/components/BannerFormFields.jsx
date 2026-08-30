import { useState, useEffect } from 'react';
import BannerTemplatePicker from './BannerTemplatePicker';
import BannerCollage from './BannerCollage';
import EntityMultiPicker from './EntityMultiPicker';
import ImageUploadField from '../../../components/upload/ImageUploadField';
import { getTemplate } from '../hooks/bannerTemplates';
import { getAll as getAutores } from '../../../services/api/autores.api';

const TEXT_POSITIONS = [
  { value: 'none', label: 'Sin texto' },
  { value: 'left', label: 'Texto a la izquierda' },
  { value: 'right', label: 'Texto a la derecha' },
  { value: 'center', label: 'Texto centrado' },
];

const CONTENT_TYPES = [
  { value: 'IMAGENES', label: 'Imágenes personalizadas' },
  { value: 'AUTORES', label: 'Autores destacados (a mano)' },
];

// `shape` le dice a BannerCollage qué proporción real respetar: 'square'
// (foto cuadrada 1:1) — así la casilla nunca recorta ni estira, sea cual sea
// la plantilla elegida.
const autorAItem = (a) => ({ id: a.id, imageUrl: a.fotografiaUrl, label: `${a.nombre} ${a.apellido}`, linkTo: `/catalogo/autores/${a.id}`, shape: 'square' });

const BannerFormFields = ({ form, errors, setLayout, setImageUrl, setField, setContentType }) => {
  const template = getTemplate(form.layout);
  const slots = template.slots;

  const [autores, setAutores] = useState([]);

  useEffect(() => {
    getAutores({ limit: 200 }).then(({ items }) => setAutores(items));
  }, []);

  let previewItems = null;
  if (form.contentType === 'AUTORES') {
    previewItems = form.refIds.map((id) => autores.find((a) => a.id === id)).filter(Boolean).map(autorAItem);
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
                invalid={Boolean(errors.images) && !img.url?.trim()}
                invalidMessage="Falta la URL de esta imagen"
              />
            </div>
          ))}
        </div>
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

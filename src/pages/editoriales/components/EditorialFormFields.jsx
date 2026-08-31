import ImageUploadField from '../../../components/upload/ImageUploadField';

const EditorialFormFields = ({ form, setField, logoRef }) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombre *</label>
      <input
        type="text"
        className="form-control"
        required
        minLength={2}
        maxLength={150}
        value={form.nombre}
        onChange={(e) => setField('nombre', e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Sitio web</label>
      <input
        type="url"
        className="form-control"
        placeholder="https://..."
        value={form.sitioWeb}
        onChange={(e) => setField('sitioWeb', e.target.value)}
      />
    </div>

    <div className="col-12">
      <label className="form-label">Descripción</label>
      <textarea
        className="form-control"
        rows={3}
        maxLength={2000}
        value={form.descripcion}
        onChange={(e) => setField('descripcion', e.target.value)}
      />
    </div>

    <div className="col-12">
      <ImageUploadField
        ref={logoRef}
        label="Logo"
        folder="editoriales"
        value={form.logoUrl}
        onValueChange={(url, publicId) => {
          setField('logoUrl', url);
          setField('logoPublicId', publicId);
        }}
      />
    </div>
  </div>
);

export default EditorialFormFields;

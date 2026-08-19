import ImageUploadField from '../../../components/upload/ImageUploadField';

const AutorFormFields = ({ form, setField, setRedSocial }) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombre *</label>
      <input type="text" className="form-control" required value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Apellido</label>
      <input type="text" className="form-control" value={form.apellido} onChange={(e) => setField('apellido', e.target.value)} />
    </div>

    <div className="col-md-4">
      <label className="form-label">Nacionalidad</label>
      <input type="text" className="form-control" value={form.nacionalidad} onChange={(e) => setField('nacionalidad', e.target.value)} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Género literario</label>
      <input type="text" className="form-control" value={form.generoLiterario} onChange={(e) => setField('generoLiterario', e.target.value)} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Idioma principal</label>
      <input type="text" className="form-control" value={form.idiomaPrincipal} onChange={(e) => setField('idiomaPrincipal', e.target.value)} />
    </div>

    <div className="col-12">
      <label className="form-label">Biografía</label>
      <textarea className="form-control" rows={4} value={form.biografia} onChange={(e) => setField('biografia', e.target.value)} />
    </div>

    <div className="col-12">
      <ImageUploadField
        label="Fotografía"
        folder="autores"
        value={form.fotografiaUrl}
        onValueChange={(url) => setField('fotografiaUrl', url)}
      />
    </div>

    <div className="col-md-6">
      <label className="form-label">Obras destacadas (separadas por comas)</label>
      <input
        type="text"
        className="form-control"
        placeholder="Cien años de soledad, El otoño del patriarca"
        value={form.obrasDestacadas}
        onChange={(e) => setField('obrasDestacadas', e.target.value)}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Premios (separados por comas)</label>
      <input
        type="text"
        className="form-control"
        placeholder="Premio Nobel, Premio Cervantes"
        value={form.premios}
        onChange={(e) => setField('premios', e.target.value)}
      />
    </div>

    <div className="col-12">
      <label className="form-label fw-bold">Redes sociales</label>
    </div>
    <div className="col-md-3">
      <input type="url" className="form-control" placeholder="Facebook" value={form.redesSociales.facebook} onChange={(e) => setRedSocial('facebook', e.target.value)} />
    </div>
    <div className="col-md-3">
      <input type="url" className="form-control" placeholder="Twitter/X" value={form.redesSociales.twitter} onChange={(e) => setRedSocial('twitter', e.target.value)} />
    </div>
    <div className="col-md-3">
      <input type="url" className="form-control" placeholder="Instagram" value={form.redesSociales.instagram} onChange={(e) => setRedSocial('instagram', e.target.value)} />
    </div>
    <div className="col-md-3">
      <input type="url" className="form-control" placeholder="Portafolio" value={form.redesSociales.portafolio} onChange={(e) => setRedSocial('portafolio', e.target.value)} />
    </div>
  </div>
);

export default AutorFormFields;

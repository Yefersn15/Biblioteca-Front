import ImageUploadField from '../../../components/upload/ImageUploadField';

const AutorFormFields = ({ form, setField, setRedSocial, toggleEnLista, categorias, librosPropios, editando }) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombre *</label>
      <input type="text" className="form-control" required value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Apellido</label>
      <input type="text" className="form-control" value={form.apellido} onChange={(e) => setField('apellido', e.target.value)} />
    </div>

    <div className="col-md-6">
      <label className="form-label">Nacionalidad</label>
      <input type="text" className="form-control" value={form.nacionalidad} onChange={(e) => setField('nacionalidad', e.target.value)} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Idioma principal</label>
      <input type="text" className="form-control" value={form.idiomaPrincipal} onChange={(e) => setField('idiomaPrincipal', e.target.value)} />
    </div>

    <div className="col-12">
      <label className="form-label d-block">Género literario</label>
      {categorias.length === 0 && <p className="text-muted small">No hay categorías creadas todavía.</p>}
      {categorias.map((c) => (
        <div className="form-check form-check-inline" key={c.id}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`genero-${c.id}`}
            checked={form.generoLiterario.includes(c.id)}
            onChange={() => toggleEnLista('generoLiterario', c.id)}
          />
          <label className="form-check-label" htmlFor={`genero-${c.id}`}>{c.nombre}</label>
        </div>
      ))}
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

    <div className="col-12">
      <label className="form-label d-block">Obras destacadas</label>
      {!editando ? (
        <p className="text-muted small">Podrás marcar obras destacadas después de crear libros con este autor.</p>
      ) : librosPropios.length === 0 ? (
        <p className="text-muted small">Este autor todavía no tiene libros en el catálogo.</p>
      ) : (
        librosPropios.map((l) => (
          <div className="form-check form-check-inline" key={l.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`obra-${l.id}`}
              checked={form.obrasDestacadas.includes(l.id)}
              onChange={() => toggleEnLista('obrasDestacadas', l.id)}
            />
            <label className="form-check-label" htmlFor={`obra-${l.id}`}>{l.titulo}</label>
          </div>
        ))
      )}
    </div>
    <div className="col-12">
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
      <input type="url" className="form-control" placeholder="Biografía (enlace externo)" value={form.redesSociales.biografiaUrl} onChange={(e) => setRedSocial('biografiaUrl', e.target.value)} />
    </div>
  </div>
);

export default AutorFormFields;

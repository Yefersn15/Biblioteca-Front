// minLength/maxLength iguales a categorias.validator.js en el backend.
const CategoriaFormFields = ({ form, setField }) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombre *</label>
      <input
        type="text"
        className="form-control"
        required
        minLength={2}
        maxLength={100}
        value={form.nombre}
        onChange={(e) => setField('nombre', e.target.value)}
      />
    </div>
    <div className="col-12">
      <label className="form-label">Descripción</label>
      <textarea
        className="form-control"
        rows={3}
        maxLength={1000}
        value={form.descripcion}
        onChange={(e) => setField('descripcion', e.target.value)}
      />
    </div>
  </div>
);

export default CategoriaFormFields;

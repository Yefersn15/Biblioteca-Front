const DOCUMENTO_LABEL = { CC: 'CC', TI: 'TI', PASAPORTE: 'Pasaporte', CEDULA_EXTRANJERA: 'CE' };

const DocumentoUbicacionForm = ({ form, setField, esAdmin }) => {
  return (
    <div className="card">
      <div className="card-header bg-white border-bottom">
        <i className="fas fa-address-card me-2 text-muted"></i>Documento y ubicación
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-7">
            <label className="form-label">
              Tipo de documento {!esAdmin && DOCUMENTO_LABEL[form.tipoDocumento] && <span className="text-muted">({DOCUMENTO_LABEL[form.tipoDocumento]})</span>}
            </label>
            <select className="form-select" value={form.tipoDocumento} disabled={!esAdmin} onChange={(e) => setField('tipoDocumento', e.target.value)}>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="PASAPORTE">Pasaporte</option>
              <option value="CEDULA_EXTRANJERA">Cédula de extranjería</option>
            </select>
          </div>
          <div className="col-5">
            <label className="form-label">Número</label>
            <input type="text" className="form-control" minLength={esAdmin ? 6 : undefined} maxLength={30} readOnly={!esAdmin} value={form.documento} onChange={(e) => setField('documento', e.target.value)} />
          </div>
          <div className="col-6">
            <label className="form-label">Dirección</label>
            <input type="text" className="form-control" maxLength={200} readOnly={!esAdmin} value={form.direccion} onChange={(e) => setField('direccion', e.target.value)} />
          </div>
          <div className="col-6">
            <label className="form-label">Barrio</label>
            <input type="text" className="form-control" maxLength={100} readOnly={!esAdmin} value={form.barrio} onChange={(e) => setField('barrio', e.target.value)} />
          </div>
          {!esAdmin && (
            <div className="col-12">
              <small className="text-muted">
                <i className="fas fa-circle-info me-1"></i>Estos datos solo puede modificarlos un administrador.
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentoUbicacionForm;

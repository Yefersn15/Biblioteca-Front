// src/pages/perfil/components/DatosPersonalesForm.jsx
import ImageUploadField from '../../../components/upload/ImageUploadField';

const DatosPersonalesForm = ({ form, setField }) => {
  return (
    <div className="card h-100">
      <div className="card-header bg-white border-bottom">
        <i className="fas fa-id-card me-2 text-muted"></i>Datos personales
      </div>
      <div className="card-body">
        <div className="row g-3">
          <div className="col-6">
            <label className="form-label">Nombres</label>
            <input type="text" className="form-control" required value={form.nombres} onChange={(e) => setField('nombres', e.target.value)} />
          </div>
          <div className="col-6">
            <label className="form-label">Apellidos</label>
            <input type="text" className="form-control" required value={form.apellidos} onChange={(e) => setField('apellidos', e.target.value)} />
          </div>
          <div className="col-6">
            <label className="form-label">Género</label>
            <select className="form-select" value={form.genero} onChange={(e) => setField('genero', e.target.value)}>
              <option value="HOMBRE">Hombre</option>
              <option value="MUJER">Mujer</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Celular</label>
            <input type="tel" className="form-control" value={form.celular} onChange={(e) => setField('celular', e.target.value)} />
          </div>
          <div className="col-12">
            <ImageUploadField
              label="Foto de perfil"
              folder="avatares"
              value={form.avatar}
              onValueChange={(url) => setField('avatar', url)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonalesForm;

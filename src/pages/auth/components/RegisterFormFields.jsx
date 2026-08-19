// src/pages/auth/components/RegisterFormFields.jsx
const GENEROS = [
  ['HOMBRE', 'Hombre'],
  ['MUJER', 'Mujer'],
  ['OTRO', 'Otro'],
];

const RegisterFormFields = ({ form, handleChange }) => (
  <div className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombres *</label>
      <input type="text" className="form-control" name="nombres" required value={form.nombres} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Apellidos *</label>
      <input type="text" className="form-control" name="apellidos" required value={form.apellidos} onChange={handleChange} />
    </div>

    <div className="col-md-6">
      <label className="form-label">Tipo de documento *</label>
      <select className="form-select" name="tipoDocumento" required value={form.tipoDocumento} onChange={handleChange}>
        <option value="">Seleccionar...</option>
        <option value="CC">Cédula de ciudadanía</option>
        <option value="TI">Tarjeta de identidad</option>
        <option value="PASAPORTE">Pasaporte</option>
        <option value="CEDULA_EXTRANJERA">Cédula de extranjería</option>
      </select>
    </div>
    <div className="col-md-6">
      <label className="form-label">Número de documento *</label>
      <input type="text" className="form-control" name="documento" required value={form.documento} onChange={handleChange} />
    </div>

    <div className="col-12">
      <label className="form-label d-block">Género *</label>
      <div className="d-flex gap-4">
        {GENEROS.map(([value, label]) => (
          <div className="form-check" key={value}>
            <input
              className="form-check-input"
              type="radio"
              name="genero"
              id={`genero-${value}`}
              value={value}
              checked={form.genero === value}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor={`genero-${value}`}>{label}</label>
          </div>
        ))}
      </div>
    </div>

    <div className="col-md-6">
      <label className="form-label">Correo *</label>
      <input type="email" className="form-control" name="email" required value={form.email} onChange={handleChange} />
      <small className="text-muted">Lo usarás para iniciar sesión y para recuperar tu contraseña.</small>
    </div>
    <div className="col-md-6">
      <label className="form-label">Celular *</label>
      <input type="tel" className="form-control" name="celular" required value={form.celular} onChange={handleChange} />
    </div>

    <div className="col-md-6">
      <label className="form-label">Dirección *</label>
      <input type="text" className="form-control" name="direccion" required value={form.direccion} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Barrio *</label>
      <input type="text" className="form-control" name="barrio" required value={form.barrio} onChange={handleChange} />
    </div>

    <div className="col-12">
      <label className="form-label">Foto de perfil (URL, opcional)</label>
      <input type="url" className="form-control" name="avatar" placeholder="https://ejemplo.com/foto.jpg" value={form.avatar} onChange={handleChange} />
    </div>

    <div className="col-md-6">
      <label className="form-label">Contraseña *</label>
      <input type="password" className="form-control" name="password" required minLength={8} value={form.password} onChange={handleChange} />
      <small className="text-muted">Mínimo 8 caracteres</small>
    </div>
    <div className="col-md-6">
      <label className="form-label">Confirmar contraseña *</label>
      <input type="password" className="form-control" name="confirmPassword" required minLength={8} value={form.confirmPassword} onChange={handleChange} />
    </div>
  </div>
);

export default RegisterFormFields;

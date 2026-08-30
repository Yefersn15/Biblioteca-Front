// src/pages/auth/components/RegisterFormFields.jsx
import PasswordInput from '../../../components/PasswordInput';
import ImageUploadField from '../../../components/upload/ImageUploadField';

const GENEROS = [
  ['HOMBRE', 'Hombre'],
  ['MUJER', 'Mujer'],
  ['OTRO', 'Otro'],
];

// Filtra cualquier caracter que no sea dígito antes de guardarlo: en un
// input controlado de React, la única forma confiable de "no dejar
// escribir letras" es descartarlas apenas llegan al estado, no validar
// después. Envuelve el handleChange genérico del formulario.
const soloNumeros = (handleChange) => (e) => {
  handleChange({ target: { name: e.target.name, value: e.target.value.replace(/\D/g, '') } });
};

const RegisterFormFields = ({ form, handleChange, passwordsNoCoinciden }) => (
  <div className="row g-2">
    <div className="col-md-4">
      <label className="form-label">Nombres *</label>
      <input type="text" className="form-control" name="nombres" required minLength={2} maxLength={100} value={form.nombres} onChange={handleChange} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Apellidos *</label>
      <input type="text" className="form-control" name="apellidos" required minLength={2} maxLength={100} value={form.apellidos} onChange={handleChange} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Tipo de documento *</label>
      <select className="form-select" name="tipoDocumento" required value={form.tipoDocumento} onChange={handleChange}>
        <option value="">Seleccionar...</option>
        <option value="CC">Cédula de ciudadanía</option>
        <option value="TI">Tarjeta de identidad</option>
        <option value="PASAPORTE">Pasaporte</option>
        <option value="CEDULA_EXTRANJERA">Cédula de extranjería</option>
      </select>
    </div>

    <div className="col-md-4">
      <label className="form-label">Número de documento *</label>
      <input type="text" inputMode="numeric" className="form-control" name="documento" required minLength={6} maxLength={30} placeholder="Mínimo 6 caracteres" value={form.documento} onChange={soloNumeros(handleChange)} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Correo *</label>
      <input type="email" className="form-control" name="email" required maxLength={150} value={form.email} onChange={handleChange} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Celular *</label>
      <input type="tel" inputMode="numeric" className="form-control" name="celular" required minLength={7} maxLength={20} value={form.celular} onChange={soloNumeros(handleChange)} />
    </div>
    <div className="col-12">
      <small className="text-muted">El correo se usa para iniciar sesión y para recuperar tu contraseña.</small>
    </div>

    <div className="col-md-6">
      <label className="form-label">Dirección *</label>
      <input type="text" className="form-control" name="direccion" required minLength={3} maxLength={200} value={form.direccion} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Barrio *</label>
      <input type="text" className="form-control" name="barrio" required minLength={2} maxLength={100} value={form.barrio} onChange={handleChange} />
    </div>

    <div className="col-12">
      <label className="form-label d-block mb-1">Género *</label>
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
      <label className="form-label">Contraseña *</label>
      <PasswordInput name="password" required minLength={8} placeholder="Mínimo 8 caracteres" value={form.password} onChange={handleChange} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Confirmar contraseña *</label>
      <PasswordInput
        name="confirmPassword"
        required
        minLength={8}
        invalid={passwordsNoCoinciden}
        value={form.confirmPassword}
        onChange={handleChange}
      />
      {passwordsNoCoinciden && <div className="invalid-feedback d-block">Las contraseñas no coinciden</div>}
    </div>

    <div className="col-12">
      <ImageUploadField label="Foto de perfil (opcional)" folder="avatares" publico name="avatar" value={form.avatar} onChange={handleChange} />
    </div>
  </div>
);

export default RegisterFormFields;

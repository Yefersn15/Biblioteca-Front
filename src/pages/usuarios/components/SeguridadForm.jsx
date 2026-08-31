import PasswordRequisitos from '../../../components/PasswordRequisitos';
import PasswordInput from '../../../components/PasswordInput';

const ROLES = [
  ['USUARIO', 'Usuario'],
  ['BIBLIOTECARIO', 'Bibliotecario'],
  ['ADMIN', 'Administrador'],
];

// Al editar, la contraseña es opcional: dejarla vacía significa "no
// cambiarla". Al crear (`editando` false) es obligatoria, el correo pasa a
// ser editable y aparece el selector de rol (el registro público, en
// cambio, siempre crea cuentas con rol USUARIO).
// `bloqueada`: la cuenta del administrador principal (npm run seed:db) no
// puede cambiar su contraseña desde la app, así que aquí se oculta el campo
// en vez de mostrarlo y dejar que el backend lo rechace.
const SeguridadForm = ({ editando = true, email, setEmail, rol, setRol, password, setPassword, confirmPassword, setConfirmPassword, noCoinciden, bloqueada }) => {
  const escribiendoPassword = password.length > 0;

  return (
    <div className="card">
      <div className="card-header bg-white border-bottom">
        <i className="fas fa-shield-halved me-2 text-muted"></i>Seguridad
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Correo {!editando && '*'}</label>
          <input
            type="email"
            className="form-control"
            required={!editando}
            maxLength={150}
            readOnly={editando}
            value={email}
            onChange={editando ? undefined : (e) => setEmail(e.target.value)}
          />
        </div>
        {!editando && (
          <div className="mb-3">
            <label className="form-label">Rol *</label>
            <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
              {ROLES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        )}
        {bloqueada ? (
          <small className="text-muted">
            <i className="fas fa-circle-info me-1"></i>
            Esta contraseña solo se puede cambiar desde el servidor (<code>npm run seed:db</code>).
          </small>
        ) : (
          <>
            <div className="mb-2">
              <label className="form-label">{editando ? 'Nueva contraseña' : 'Contraseña *'}</label>
              <PasswordInput
                required={!editando}
                placeholder={editando ? 'Dejar vacío para no cambiarla' : 'Mínimo 8 caracteres'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {escribiendoPassword && <PasswordRequisitos password={password} />}
            </div>
            <div>
              <label className="form-label">{editando ? 'Verificar nueva contraseña' : 'Verificar contraseña *'}</label>
              <PasswordInput
                required={!editando}
                invalid={noCoinciden}
                placeholder="Repite la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {noCoinciden && <div className="invalid-feedback d-block">Las contraseñas no coinciden</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeguridadForm;

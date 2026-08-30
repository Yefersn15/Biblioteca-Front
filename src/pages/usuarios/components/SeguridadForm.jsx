import PasswordRequisitos from '../../../components/PasswordRequisitos';
import PasswordInput from '../../../components/PasswordInput';

// La contraseña es opcional: dejarla vacía significa "no cambiarla". Solo se
// valida en tiempo real (checklist + confirmación) cuando sí se escribe algo.
// `bloqueada`: la cuenta del administrador principal (npm run seed:db) no
// puede cambiar su contraseña desde la app, así que aquí se oculta el campo
// en vez de mostrarlo y dejar que el backend lo rechace.
const SeguridadForm = ({ email, password, setPassword, confirmPassword, setConfirmPassword, bloqueada }) => {
  const escribiendoPassword = password.length > 0;
  const noCoinciden = escribiendoPassword && confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div className="card">
      <div className="card-header bg-white border-bottom">
        <i className="fas fa-shield-halved me-2 text-muted"></i>Seguridad
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>
        {bloqueada ? (
          <small className="text-muted">
            <i className="fas fa-circle-info me-1"></i>
            Esta contraseña solo se puede cambiar desde el servidor (<code>npm run seed:db</code>).
          </small>
        ) : (
          <>
            <div className="mb-2">
              <label className="form-label">Nueva contraseña</label>
              <PasswordInput placeholder="Dejar vacío para no cambiarla" value={password} onChange={(e) => setPassword(e.target.value)} />
              {escribiendoPassword && <PasswordRequisitos password={password} />}
            </div>
            <div>
              <label className="form-label">Verificar nueva contraseña</label>
              <PasswordInput
                invalid={noCoinciden}
                placeholder="Repite la nueva contraseña"
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

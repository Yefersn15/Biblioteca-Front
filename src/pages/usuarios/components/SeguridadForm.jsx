import PasswordRequisitos from '../../../components/PasswordRequisitos';

// La contraseña es opcional: dejarla vacía significa "no cambiarla". Solo se
// valida en tiempo real (checklist + confirmación) cuando sí se escribe algo.
const SeguridadForm = ({ email, password, setPassword, confirmPassword, setConfirmPassword }) => {
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
        <div className="mb-2">
          <label className="form-label">Nueva contraseña</label>
          <input type="password" className="form-control" placeholder="Dejar vacío para no cambiarla" value={password} onChange={(e) => setPassword(e.target.value)} />
          {escribiendoPassword && <PasswordRequisitos password={password} />}
        </div>
        <div>
          <label className="form-label">Verificar nueva contraseña</label>
          <input
            type="password"
            className={`form-control ${noCoinciden ? 'is-invalid' : ''}`}
            placeholder="Repite la nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {noCoinciden && <div className="invalid-feedback">Las contraseñas no coinciden</div>}
        </div>
      </div>
    </div>
  );
};

export default SeguridadForm;

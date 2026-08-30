import PasswordRequisitos from '../../../components/PasswordRequisitos';
import PasswordInput from '../../../components/PasswordInput';
import { passwordEsValida } from '../../../validations/password';

const ResetPasswordStep = ({ password, setPassword, confirmPassword, setConfirmPassword, loading, onSubmit }) => {
  const passwordValida = passwordEsValida(password);
  const noCoinciden = confirmPassword.length > 0 && password !== confirmPassword;
  const puedeEnviar = passwordValida && confirmPassword.length > 0 && !noCoinciden;

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label className="form-label">Nueva contraseña</label>
        <PasswordInput required value={password} onChange={(e) => setPassword(e.target.value)} />
        <PasswordRequisitos password={password} />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirmar contraseña</label>
        <PasswordInput
          required
          invalid={noCoinciden}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {noCoinciden && <div className="invalid-feedback d-block">Las contraseñas no coinciden</div>}
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading || !puedeEnviar}>
        {loading ? 'Actualizando...' : 'Actualizar contraseña'}
      </button>
    </form>
  );
};

export default ResetPasswordStep;

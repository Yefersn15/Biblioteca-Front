// src/pages/auth/components/ResetPasswordStep.jsx
const ResetPasswordStep = ({ password, setPassword, confirmPassword, setConfirmPassword, loading, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="mb-3">
      <label className="form-label">Nueva contraseña</label>
      <input type="password" className="form-control" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div className="mb-3">
      <label className="form-label">Confirmar contraseña</label>
      <input type="password" className="form-control" minLength={8} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
      {loading ? 'Actualizando...' : 'Actualizar contraseña'}
    </button>
  </form>
);

export default ResetPasswordStep;

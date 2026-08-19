// src/pages/auth/components/VerifyCodeStep.jsx
const VerifyCodeStep = ({ email, codigo, setCodigo, loading, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="alert alert-info">
      Revisa la bandeja de entrada de <strong>{email}</strong> (y la carpeta de spam) para ver el código de 6 dígitos.
    </div>
    <div className="mb-3">
      <label className="form-label">Código de verificación</label>
      <input
        type="text"
        className="form-control"
        maxLength={6}
        required
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
    </div>
    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
      {loading ? 'Verificando...' : 'Verificar código'}
    </button>
  </form>
);

export default VerifyCodeStep;

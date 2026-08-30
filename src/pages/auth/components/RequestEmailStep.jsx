// src/pages/auth/components/RequestEmailStep.jsx
const RequestEmailStep = ({ email, setEmail, loading, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="mb-3">
      <label className="form-label">Correo</label>
      <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <small className="form-text text-muted">Si el correo existe, te enviaremos un enlace de recuperación.</small>
    </div>
    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
      {loading ? 'Enviando...' : 'Enviar enlace'}
    </button>
  </form>
);

export default RequestEmailStep;

// src/pages/perfil/components/SeguridadForm.jsx
const SeguridadForm = ({ email, password, setPassword }) => {
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
        <div>
          <label className="form-label">Nueva contraseña</label>
          <input type="password" className="form-control" minLength={8} placeholder="Dejar vacío para no cambiarla" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default SeguridadForm;

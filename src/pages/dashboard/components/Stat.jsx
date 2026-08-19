// Tarjeta de estadística, no de navegación: a propósito no lleva a ningún
// lado (ya está todo en el menú lateral) — solo da un vistazo rápido de qué
// necesita atención al entrar al panel.
const Stat = ({ icon, label, value, variant }) => (
  <div className="col-6 col-md-4 col-lg-3">
    <div className={`card h-100 ${variant ? `border-${variant}` : ''}`}>
      <div className="card-body d-flex align-items-center gap-3">
        <i className={`fas ${icon} fa-2x ${variant ? `text-${variant}` : 'text-muted'}`}></i>
        <div>
          <div className={`fs-4 fw-bold ${variant ? `text-${variant}` : ''}`}>{value ?? '—'}</div>
          <div className="small text-muted">{label}</div>
        </div>
      </div>
    </div>
  </div>
);

export default Stat;

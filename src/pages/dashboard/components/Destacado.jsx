const Destacado = ({ titulo, dato }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">{titulo}</div>
    <div className="card-body d-flex align-items-center gap-3">
      {!dato ? (
        <p className="text-muted small mb-0">Todavía no hay préstamos registrados.</p>
      ) : (
        <div>
          <div className="fw-bold">{dato.nombre}</div>
          <div className="small text-muted">{dato.total} préstamo{dato.total === 1 ? '' : 's'}</div>
        </div>
      )}
    </div>
  </div>
);

export default Destacado;

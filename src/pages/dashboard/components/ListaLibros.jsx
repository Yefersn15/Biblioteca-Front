const ListaLibros = ({ titulo, items }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">{titulo}</div>
    <div className="card-body">
      {!items ? (
        <div className="text-center py-3"><div className="spinner-border spinner-border-sm" role="status"></div></div>
      ) : items.length === 0 ? (
        <p className="text-muted small mb-0">Todavía no hay préstamos registrados.</p>
      ) : (
        <ol className="list-group list-group-numbered list-group-flush">
          {items.map((libro) => (
            <li key={libro.id} className="list-group-item d-flex justify-content-between align-items-center px-0">
              <span className="text-truncate me-2">{libro.titulo}</span>
              <span className="badge bg-secondary rounded-pill">{libro.total}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  </div>
);

export default ListaLibros;

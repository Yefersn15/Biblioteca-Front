// Paginador reutilizable para los listados del panel de administración.
const Pagination = ({ pagina, totalPaginas, onCambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación" className="d-flex justify-content-center mt-4">
      <ul className="pagination mb-0">
        <li className={`page-item ${pagina === 1 ? 'disabled' : ''}`}>
          <button type="button" className="page-link" onClick={() => onCambiarPagina(pagina - 1)} disabled={pagina === 1}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>
        {paginas.map((p) => (
          <li key={p} className={`page-item ${p === pagina ? 'active' : ''}`}>
            <button type="button" className="page-link" onClick={() => onCambiarPagina(p)}>{p}</button>
          </li>
        ))}
        <li className={`page-item ${pagina === totalPaginas ? 'disabled' : ''}`}>
          <button type="button" className="page-link" onClick={() => onCambiarPagina(pagina + 1)} disabled={pagina === totalPaginas}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

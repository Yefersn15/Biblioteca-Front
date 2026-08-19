import { Link } from 'react-router-dom';
import { useLibroDetalle } from './hooks/useLibroDetalle';

const LibroDetalle = () => {
  const {
    user,
    libro,
    fechaDevolucion,
    setFechaDevolucion,
    fechaMinima,
    solicitando,
    solicitado,
    handleSolicitar,
  } = useLibroDetalle();

  if (!libro) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }

  return (
    <div className="container py-4">
      <Link to="/catalogo" className="btn btn-link ps-0 mb-3"><i className="fas fa-arrow-left me-1"></i>Volver al catálogo</Link>
      <div className="row g-4">
        <div className="col-md-4">
          <div style={{ aspectRatio: '2 / 3', background: '#e9ecef', overflow: 'hidden', borderRadius: 8 }}>
            {libro.portadaUrl ? (
              <img src={libro.portadaUrl} alt={libro.titulo} className="w-100 h-100" style={{ objectFit: 'cover' }} />
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                <i className="fas fa-book fa-3x"></i>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <h2>{libro.titulo}</h2>
          <p className="text-muted mb-1">
            {libro.tipo} ·{' '}
            {libro.autores?.map((a, i) => (
              <span key={a.id}>
                {i > 0 && ', '}
                <Link to={`/autores/${a.id}`}>{a.nombre} {a.apellido}</Link>
              </span>
            ))}
            {libro.editorial && <> · <Link to={`/catalogo?editorialId=${libro.editorial.id}`}>{libro.editorial.nombre}</Link></>}
            {libro.anioPublicacion ? ` · ${libro.anioPublicacion}` : ''}
          </p>
          {(libro.idioma || libro.paginas) && (
            <p className="text-muted mb-1 small">
              {libro.idioma && `Idioma: ${libro.idioma}`}{libro.idioma && libro.paginas ? ' · ' : ''}{libro.paginas && `${libro.paginas} páginas`}
            </p>
          )}
          <div className="mb-3">
            {libro.categorias?.map((c) => (
              <Link to={`/catalogo?categoriaId=${c.id}`} className="badge bg-light text-dark border me-1 text-decoration-none" key={c.id}>{c.nombre}</Link>
            ))}
            {libro.etiquetas?.map((tag) => (
              <span className="badge bg-secondary-subtle text-dark me-1" key={tag}>#{tag}</span>
            ))}
          </div>
          <p>{libro.descripcion || 'Sin descripción disponible.'}</p>
          <p>
            <span className={`badge ${libro.copiasDisponibles > 0 ? 'bg-success' : 'bg-secondary'}`}>
              {libro.copiasDisponibles} de {libro.copiasTotales} copias disponibles
            </span>
          </p>
          {libro.archivoUrl && (
            <p>
              <a href={libro.archivoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-download me-1"></i>Descargar archivo digital
              </a>
            </p>
          )}

          {libro.copiasDisponibles < 1 ? (
            <div className="alert alert-secondary">No hay copias disponibles en este momento.</div>
          ) : !user ? (
            <div className="alert alert-info">
              <Link to="/login">Ingresa</Link> o <Link to="/registro">crea una cuenta</Link> para solicitar este préstamo.
            </div>
          ) : solicitado ? (
            <div className="alert alert-success">Solicitud enviada. Revisa el estado en <Link to="/mis-prestamos">Mis préstamos</Link>.</div>
          ) : (
            <div className="card d-inline-block">
              <div className="card-body">
                <label className="form-label">Fecha de devolución estimada</label>
                <div className="d-flex gap-2">
                  <input
                    type="date"
                    className="form-control"
                    min={fechaMinima}
                    value={fechaDevolucion}
                    onChange={(e) => setFechaDevolucion(e.target.value)}
                  />
                  <button className="btn btn-primary text-nowrap" disabled={solicitando} onClick={handleSolicitar}>
                    {solicitando ? 'Solicitando...' : 'Solicitar préstamo'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibroDetalle;

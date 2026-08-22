import { Link } from 'react-router-dom';
import { useLibroDetalle } from './hooks/useLibroDetalle';
import { useLibrosRelacionados } from './hooks/useLibrosRelacionados';
import LibroCard from './components/LibroCard';

const LibroDetalle = () => {
  const { user, libro, solicitando, solicitado, handleSolicitar } = useLibroDetalle();
  const relacionados = useLibrosRelacionados(libro);

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
                <Link to={`/catalogo/autores/${a.id}`}>{a.nombre} {a.apellido}</Link>
              </span>
            ))}
            {libro.editorial && <> · <Link to={`/catalogo/editoriales/${libro.editorial.id}`}>{libro.editorial.nombre}</Link></>}
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
            <button className="btn btn-primary" disabled={solicitando} onClick={handleSolicitar}>
              {solicitando ? 'Solicitando...' : 'Solicitar préstamo'}
            </button>
          )}
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-3">Libros relacionados</h4>
          <div className="row g-4">
            {relacionados.map((r) => (
              <div className="col-6 col-md-3 col-lg-2" key={r.id}>
                <LibroCard libro={r} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibroDetalle;

import { Link } from 'react-router-dom';
import { useAutorPublico } from './hooks/useAutorPublico';
import AutorLibroCard from './components/AutorLibroCard';

const RED_ICONS = { facebook: 'fa-facebook', twitter: 'fa-x-twitter', instagram: 'fa-instagram', biografiaUrl: 'fa-book-open' };

const AutorPublico = () => {
  const { autor, libros, generos, obrasDestacadas, loading } = useAutorPublico();

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }
  if (!autor) {
    return <div className="container py-4"><div className="alert alert-warning">Autor no encontrado.</div></div>;
  }

  const redes = Object.entries(autor.redesSociales || {}).filter(([, url]) => url);

  return (
    <div className="container py-4">
      <Link to="/catalogo/autores" className="btn btn-link ps-0 mb-3"><i className="fas fa-arrow-left me-1"></i>Volver a autores</Link>

      <div className="row g-4 mb-4">
        <div className="col-md-3 text-center">
          <img
            src={autor.fotografiaUrl || undefined}
            alt=""
            className="rounded-circle"
            style={{ width: 160, height: 160, objectFit: 'cover', background: '#e9ecef', display: autor.fotografiaUrl ? 'inline-block' : 'none' }}
          />
          {!autor.fotografiaUrl && (
            <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center text-muted" style={{ width: 160, height: 160, background: '#e9ecef' }}>
              <i className="fas fa-user fa-3x"></i>
            </div>
          )}
        </div>
        <div className="col-md-9">
          <h2>{autor.nombre} {autor.apellido}</h2>
          <p className="text-muted mb-2">
            {[autor.nacionalidad, generos.map((g) => g.nombre).join(', '), autor.idiomaPrincipal].filter(Boolean).join(' · ')}
          </p>
          {redes.length > 0 && (
            <div className="mb-2">
              {redes.map(([red, url]) => (
                <a key={red} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary me-2">
                  <i className={`${red === 'biografiaUrl' ? 'fas' : 'fab'} ${RED_ICONS[red] || 'fa-link'}`}></i>
                </a>
              ))}
            </div>
          )}
          <p>{autor.biografia}</p>

          {obrasDestacadas.length > 0 && (
            <p>
              <strong>Obras destacadas:</strong>{' '}
              {obrasDestacadas.map((l, i) => (
                <span key={l.id}>
                  {i > 0 && ', '}
                  <Link to={`/catalogo/${l.id}`}>{l.titulo}</Link>
                </span>
              ))}
            </p>
          )}
          {autor.premios?.length > 0 && (
            <p><strong>Premios:</strong> {autor.premios.join(', ')}</p>
          )}
        </div>
      </div>

      <h4 className="mb-3">Libros de {autor.nombre} {autor.apellido} en el catálogo</h4>
      {libros.length === 0 ? (
        <div className="alert alert-info">No hay libros de este autor en el catálogo.</div>
      ) : (
        <div className="row g-4">
          {libros.map((libro) => (
            <div className="col-6 col-md-3 col-lg-2" key={libro.id}>
              <AutorLibroCard libro={libro} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutorPublico;

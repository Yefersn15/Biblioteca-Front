import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getById } from '../../services/api/autores.api';
import { getLibros } from '../../services/api/libros.api';

const RED_ICONS = { facebook: 'fa-facebook', twitter: 'fa-x-twitter', instagram: 'fa-instagram', portafolio: 'fa-globe' };

const AutorPublico = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getById(id), getLibros({ autorId: id, limit: 50 })]).then(([a, { items }]) => {
      setAutor(a);
      setLibros(items);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }
  if (!autor) {
    return <div className="container py-4"><div className="alert alert-warning">Autor no encontrado.</div></div>;
  }

  const redes = Object.entries(autor.redesSociales || {}).filter(([, url]) => url);

  return (
    <div className="container py-4">
      <Link to="/autores" className="btn btn-link ps-0 mb-3"><i className="fas fa-arrow-left me-1"></i>Volver a autores</Link>

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
            {[autor.nacionalidad, autor.generoLiterario, autor.idiomaPrincipal].filter(Boolean).join(' · ')}
          </p>
          {redes.length > 0 && (
            <div className="mb-2">
              {redes.map(([red, url]) => (
                <a key={red} href={url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary me-2">
                  <i className={`fab ${RED_ICONS[red] || 'fa-link'}`}></i>
                </a>
              ))}
            </div>
          )}
          <p>{autor.biografia}</p>

          {autor.obrasDestacadas?.length > 0 && (
            <p><strong>Obras destacadas:</strong> {autor.obrasDestacadas.join(', ')}</p>
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
              <Link to={`/catalogo/${libro.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm">
                  <div style={{ aspectRatio: '2 / 3', background: '#e9ecef', overflow: 'hidden' }}>
                    {libro.portadaUrl ? (
                      <img src={libro.portadaUrl} alt={libro.titulo} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                        <i className="fas fa-book fa-2x"></i>
                      </div>
                    )}
                  </div>
                  <div className="card-body p-2">
                    <div className="small fw-bold text-truncate">{libro.titulo}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutorPublico;

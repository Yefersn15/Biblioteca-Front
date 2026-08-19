import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../../services/api/autores.api';

const AutoresPublicos = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll({ limit: 200 }).then(({ items }) => {
      setAutores(items);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-feather me-2"></i>Autores</h2>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : autores.length === 0 ? (
        <div className="alert alert-info">No hay autores en el catálogo todavía.</div>
      ) : (
        <div className="row g-4">
          {autores.map((a) => (
            <div className="col-6 col-md-4 col-lg-3" key={a.id}>
              <Link to={`/autores/${a.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm text-center">
                  <div className="card-body">
                    <img
                      src={a.fotografiaUrl || undefined}
                      alt=""
                      className="rounded-circle mb-2"
                      style={{ width: 80, height: 80, objectFit: 'cover', background: '#e9ecef', display: a.fotografiaUrl ? 'block' : 'none', margin: '0 auto' }}
                    />
                    {!a.fotografiaUrl && (
                      <div className="rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center text-muted" style={{ width: 80, height: 80, background: '#e9ecef' }}>
                        <i className="fas fa-user fa-2x"></i>
                      </div>
                    )}
                    <div className="fw-bold">{a.nombre} {a.apellido}</div>
                    {a.nacionalidad && <div className="small text-muted">{a.nacionalidad}</div>}
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

export default AutoresPublicos;

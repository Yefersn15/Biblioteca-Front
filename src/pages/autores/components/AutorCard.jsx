import { Link } from 'react-router-dom';

const AutorCard = ({ autor }) => (
  <Link to={`/autores/${autor.id}`} className="text-decoration-none text-dark">
    <div className="card h-100 shadow-sm text-center">
      <div className="card-body">
        <img
          src={autor.fotografiaUrl || undefined}
          alt=""
          className="rounded-circle mb-2"
          style={{ width: 80, height: 80, objectFit: 'cover', background: '#e9ecef', display: autor.fotografiaUrl ? 'block' : 'none', margin: '0 auto' }}
        />
        {!autor.fotografiaUrl && (
          <div className="rounded-circle mb-2 mx-auto d-flex align-items-center justify-content-center text-muted" style={{ width: 80, height: 80, background: '#e9ecef' }}>
            <i className="fas fa-user fa-2x"></i>
          </div>
        )}
        <div className="fw-bold">{autor.nombre} {autor.apellido}</div>
        {autor.nacionalidad && <div className="small text-muted">{autor.nacionalidad}</div>}
      </div>
    </div>
  </Link>
);

export default AutorCard;

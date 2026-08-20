import { Link } from 'react-router-dom';

const EditorialCard = ({ editorial }) => (
  <Link to={`/catalogo/editoriales/${editorial.id}`} className="text-decoration-none text-dark">
    <div className="card h-100 shadow-sm text-center">
      <div className="card-body">
        <img
          src={editorial.logoUrl || undefined}
          alt=""
          className="rounded mb-2"
          style={{ width: 80, height: 80, objectFit: 'contain', background: '#e9ecef', display: editorial.logoUrl ? 'block' : 'none', margin: '0 auto' }}
        />
        {!editorial.logoUrl && (
          <div className="rounded mb-2 mx-auto d-flex align-items-center justify-content-center text-muted" style={{ width: 80, height: 80, background: '#e9ecef' }}>
            <i className="fas fa-building fa-2x"></i>
          </div>
        )}
        <div className="fw-bold">{editorial.nombre}</div>
      </div>
    </div>
  </Link>
);

export default EditorialCard;

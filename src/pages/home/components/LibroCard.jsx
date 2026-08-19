// src/pages/home/components/LibroCard.jsx
import { Link } from 'react-router-dom';
import { formatAutores } from '../../../utils/formatAutores';

const LibroCard = ({ libro }) => (
  <div className="col-6 col-md-4 col-lg-2">
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
          <div className="small text-muted text-truncate">{formatAutores(libro)}</div>
        </div>
      </div>
    </Link>
  </div>
);

export default LibroCard;

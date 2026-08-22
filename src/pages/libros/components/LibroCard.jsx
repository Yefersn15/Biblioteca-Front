import { Link } from 'react-router-dom';
import { formatAutores } from '../../../utils/formatAutores';

const LibroCard = ({ libro }) => (
  <Link
    to={`/catalogo/${libro.id}`}
    className="text-decoration-none text-dark"
    title={`${libro.titulo} — ${formatAutores(libro)}`}
  >
    <div className="card h-100 shadow-sm position-relative" style={{ aspectRatio: '2 / 3', overflow: 'hidden', background: '#e9ecef' }}>
      {libro.portadaUrl ? (
        <img src={libro.portadaUrl} alt={libro.titulo} className="w-100 h-100" style={{ objectFit: 'cover' }} />
      ) : (
        <div className="d-flex align-items-center justify-content-center h-100 text-muted">
          <i className="fas fa-book fa-2x"></i>
        </div>
      )}
      <span
        className={`badge position-absolute top-0 end-0 m-2 ${libro.copiasDisponibles > 0 ? 'bg-success' : 'bg-secondary'}`}
        title={libro.copiasDisponibles > 0 ? `${libro.copiasDisponibles} disponibles` : 'Agotado'}
      >
        <i className={`fas ${libro.copiasDisponibles > 0 ? 'fa-check' : 'fa-ban'}`}></i> {libro.copiasDisponibles}
      </span>
    </div>
  </Link>
);

export default LibroCard;

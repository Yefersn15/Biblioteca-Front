import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConfiguracion } from '../context/ConfiguracionContext';

const Header = () => {
  const { user, isStaff, logout } = useAuth();
  const { nombreInstitucion, logoUrl, colorPrimario } = useConfiguracion();
  const navigate = useNavigate();
  const acento = colorPrimario || '#0d6efd';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bold text-dark">
          {logoUrl ? (
            <img src={logoUrl} alt="" height={32} className="me-2" style={{ objectFit: 'contain' }} />
          ) : (
            <i className="fas fa-book-open me-2" style={{ color: acento }}></i>
          )}
          {nombreInstitucion}
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link text-dark" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/catalogo">Catálogo</Link></li>
            <li className="nav-item"><Link className="nav-link text-dark" to="/autores">Autores</Link></li>
          </ul>

          <ul className="navbar-nav align-items-lg-center">
            {user ? (
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link text-dark" data-bs-toggle="dropdown">
                  <i className="fas fa-user-circle me-1"></i>{user.nombres}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/perfil"><i className="fas fa-user me-2"></i>Mi perfil</Link></li>
                  <li><Link className="dropdown-item" to="/mis-prestamos"><i className="fas fa-right-left me-2"></i>Mis préstamos</Link></li>
                  {isStaff && (
                    <li><Link className="dropdown-item" to="/admin"><i className="fas fa-gauge me-2"></i>Administración</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fas fa-right-from-bracket me-2"></i>Cerrar sesión</button></li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link text-dark" to="/login">Ingresar</Link></li>
                <li className="nav-item ms-lg-2">
                  <Link to="/registro" className="btn btn-sm text-white" style={{ backgroundColor: acento }}>Crear cuenta</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

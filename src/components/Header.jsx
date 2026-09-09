import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConfiguracion } from '../context/ConfiguracionContext';
import MenuPreferenciasPublico from './header/MenuPreferenciasPublico';
import UserMenu from './header/UserMenu';
import BrandIcon from './BrandIcon';
import { ENLACES_ADMIN_BASE, ENLACES_SOLO_ADMIN } from './header/adminNavConfig';

const Header = ({ vistaLlamativa, setVistaLlamativa }) => {
  const { user, isStaff, isAdmin, logout } = useAuth();
  const { nombreInstitucion, logoUrl, temaResuelto, modoOscuro, toggleModoOscuro } = useConfiguracion();
  const navigate = useNavigate();
  const esOscuro = temaResuelto.encabezadoTexto === '#ffffff';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${esOscuro ? 'navbar-dark' : 'navbar-light'} tema-encabezado border-bottom sticky-top shadow-sm`}>
      <div className="container">
        <Link to="/" className="navbar-brand tema-encabezado-link d-flex align-items-center fw-bold">
          {logoUrl ? (
            <img src={logoUrl} alt="" height={32} className="me-2" style={{ objectFit: 'contain' }} />
          ) : (
            <BrandIcon size={26} className="me-2" />
          )}
          {nombreInstitucion}
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo">Catálogo</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo/autores">Autores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo/editoriales">Editoriales</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/catalogo/categorias">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>

            {isStaff && (
              <li className="nav-item dropdown">
                <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                  <i className="fas fa-gauge me-1"></i>Administración
                </button>
                <ul className="dropdown-menu">
                  {ENLACES_ADMIN_BASE.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="dropdown-item d-flex align-items-center">
                        <i className={`fas ${item.icon} me-2`}></i>{item.label}
                      </Link>
                    </li>
                  ))}
                  {isAdmin && ENLACES_SOLO_ADMIN.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to} className="dropdown-item d-flex align-items-center">
                        <i className={`fas ${item.icon} me-2`}></i>{item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>

          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <MenuPreferenciasPublico
                modoOscuro={modoOscuro}
                toggleModoOscuro={toggleModoOscuro}
                vistaLlamativa={vistaLlamativa}
                setVistaLlamativa={setVistaLlamativa}
              />
            </li>
            {user ? (
              <li className="nav-item">
                <UserMenu label={user.nombres} botonClassName="nav-link dropdown-toggle btn btn-link" onLogout={handleLogout}>
                  <li><Link className="dropdown-item d-flex align-items-center" to="/mis-prestamos"><i className="fas fa-right-left me-2"></i>Mis préstamos</Link></li>
                </UserMenu>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Ingresar</Link></li>
                <li className="nav-item ms-lg-2">
                  <Link to="/registro" className="btn btn-sm tema-acento-bg">Crear cuenta</Link>
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

import { Link } from 'react-router-dom';

// Menú desplegable de usuario. "Mi perfil" y "Cerrar sesión" son fijos en
// los dos lugares que lo usan (sitio público y panel admin); lo que cambia
// entre uno y otro son los enlaces intermedios (p. ej. "Mis préstamos" y
// "Administración" en el público, "Ver sitio público" en el admin), que
// cada quien pasa como children.
const UserMenu = ({ label, botonClassName, onLogout, children }) => (
  <div className="dropdown">
    <button className={botonClassName} data-bs-toggle="dropdown">
      <i className="fas fa-user-circle me-1"></i>{label}
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li><Link className="dropdown-item" to="/perfil"><i className="fas fa-user me-2"></i>Mi perfil</Link></li>
      {children}
      <li><hr className="dropdown-divider" /></li>
      <li><button className="dropdown-item text-danger" onClick={onLogout}><i className="fas fa-right-from-bracket me-2"></i>Cerrar sesión</button></li>
    </ul>
  </div>
);

export default UserMenu;
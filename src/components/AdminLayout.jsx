import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConfiguracion } from '../context/ConfiguracionContext';
import { useAdminLayoutPrefs } from '../hooks/useAdminLayoutPrefs';

const ENLACES_BASE = [
  { to: '/admin', label: 'Inicio', icon: 'fa-gauge', end: true },
  { to: '/admin/libros', label: 'Libros', icon: 'fa-book' },
  { to: '/admin/autores', label: 'Autores', icon: 'fa-feather' },
  { to: '/admin/editoriales', label: 'Editoriales', icon: 'fa-building' },
  { to: '/admin/categorias', label: 'Categorías', icon: 'fa-tags' },
  { to: '/admin/prestamos', label: 'Préstamos', icon: 'fa-right-left' },
  { to: '/admin/banners', label: 'Banners', icon: 'fa-images' },
];
const ENLACES_ADMIN = [
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'fa-users' },
  { to: '/admin/configuracion', label: 'Configuración', icon: 'fa-gear' },
];

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const { nombreInstitucion, logoUrl, colorPrimario } = useConfiguracion();
  const { posicion, compacto, setPosicion, toggleCompacto } = useAdminLayoutPrefs();
  const navigate = useNavigate();
  const acento = colorPrimario || '#0d6efd';
  const enlaces = isAdmin ? [...ENLACES_BASE, ...ENLACES_ADMIN] : ENLACES_BASE;
  const esLateral = posicion === 'lateral';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const marca = (
    <Link to="/" className="d-flex align-items-center text-dark text-decoration-none fw-bold">
      {logoUrl ? (
        <img src={logoUrl} alt="" height={28} style={{ objectFit: 'contain' }} />
      ) : (
        <i className="fas fa-book-open" style={{ color: acento }}></i>
      )}
      {!compacto && <span className="ms-2 text-truncate">{nombreInstitucion}</span>}
    </Link>
  );

  const enlaceClase = ({ isActive }) =>
    `nav-link text-dark d-flex align-items-center ${isActive ? 'fw-bold' : ''} ${esLateral ? '' : 'px-3'}`;
  const enlaceEstilo = ({ isActive }) =>
    esLateral
      ? { borderLeft: `3px solid ${isActive ? acento : 'transparent'}`, backgroundColor: isActive ? '#f8f9fa' : undefined }
      : { borderBottom: `3px solid ${isActive ? acento : 'transparent'}` };

  const menu = (vertical) => (
    <nav className={vertical ? 'nav flex-column' : 'nav'}>
      {enlaces.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={enlaceClase} style={enlaceEstilo} title={compacto ? link.label : undefined}>
          <i className={`fas ${link.icon} ${compacto ? '' : 'me-2'}`}></i>
          {!compacto && link.label}
        </NavLink>
      ))}
    </nav>
  );

  // Menú para elegir posición (lateral/superior) y modo compacto (solo
  // iconos). Se guarda en localStorage vía useAdminLayoutPrefs, así que cada
  // quien lo deja como prefiera.
  const controlesLayout = (
    <div className="dropdown">
      <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown" title="Personalizar menú">
        <i className="fas fa-sliders"></i>
      </button>
      <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 220 }}>
        <div className="small text-muted mb-1">Posición del menú</div>
        <div className="btn-group btn-group-sm w-100 mb-3">
          <button type="button" className={`btn ${esLateral ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPosicion('lateral')}>
            <i className="fas fa-table-columns me-1"></i>Lateral
          </button>
          <button type="button" className={`btn ${!esLateral ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPosicion('superior')}>
            <i className="fas fa-bars me-1"></i>Superior
          </button>
        </div>
        <div className="form-check form-switch mb-0">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCompacto" checked={compacto} onChange={toggleCompacto} />
          <label className="form-check-label small" htmlFor="switchCompacto">Solo iconos</label>
        </div>
      </div>
    </div>
  );

  const menuUsuario = (
    <div className="dropdown">
      <button className="btn btn-link text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
        <i className="fas fa-user-circle me-1"></i>{user?.nombres} · {user?.rol}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/perfil"><i className="fas fa-user me-2"></i>Mi perfil</Link></li>
        <li><Link className="dropdown-item" to="/"><i className="fas fa-globe me-2"></i>Ver sitio público</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fas fa-right-from-bracket me-2"></i>Cerrar sesión</button></li>
      </ul>
    </div>
  );

  if (!esLateral) {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-white border-bottom px-3">
          <div className="d-flex align-items-center gap-4 flex-grow-1 overflow-hidden">
            {marca}
            {menu(false)}
          </div>
          <div className="d-flex align-items-center gap-2">
            {controlesLayout}
            {menuUsuario}
          </div>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <aside className="bg-white border-end p-3" style={{ width: compacto ? 70 : 230, flexShrink: 0, transition: 'width .15s' }}>
        <div className="mb-4">{marca}</div>
        {menu(true)}
      </aside>

      <div className="flex-grow-1">
        <nav className="navbar navbar-light bg-white border-bottom px-4 d-flex justify-content-between">
          <span className="text-muted">Panel de administración</span>
          <div className="d-flex align-items-center gap-2">
            {controlesLayout}
            {menuUsuario}
          </div>
        </nav>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

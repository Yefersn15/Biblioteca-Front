import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConfiguracion } from '../context/ConfiguracionContext';
import { useAdminLayoutPrefs } from '../hooks/useAdminLayoutPrefs';

const ENLACES_BASE = [
  { to: '/admin/dashboard', label: 'Inicio', icon: 'fa-gauge', end: true },
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
  const { nombreInstitucion, logoUrl, temaResuelto, modoOscuro, toggleModoOscuro } = useConfiguracion();
  const { posicion, compacto, setPosicion, toggleCompacto } = useAdminLayoutPrefs();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const navigate = useNavigate();
  const enlaces = isAdmin ? [...ENLACES_BASE, ...ENLACES_ADMIN] : ENLACES_BASE;
  const esLateral = posicion === 'lateral';
  const esOscuro = temaResuelto.encabezadoTexto === '#ffffff';
  const resaltadoActivo = esOscuro ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.06)';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const marca = (
    <Link to="/" className="tema-encabezado-link d-flex align-items-center text-decoration-none fw-bold">
      {logoUrl ? (
        <img src={logoUrl} alt="" height={28} style={{ objectFit: 'contain' }} />
      ) : (
        <i className="fas fa-book-open"></i>
      )}
      {!compacto && <span className="ms-2 text-truncate">{nombreInstitucion}</span>}
    </Link>
  );

  const enlaceClase = ({ isActive }) =>
    `nav-link d-flex align-items-center ${isActive ? 'fw-bold' : ''} ${esLateral ? '' : 'px-3'}`;
  const enlaceEstilo = ({ isActive }) =>
    esLateral
      ? { borderLeft: `3px solid ${isActive ? temaResuelto.acento : 'transparent'}`, backgroundColor: isActive ? resaltadoActivo : undefined }
      : { borderBottom: `3px solid ${isActive ? temaResuelto.acento : 'transparent'}` };

  // `vertical`: apilado en columna (barra lateral en escritorio, o el propio
  // menú colapsable en móvil). Al elegir un enlace en móvil, el menú se
  // cierra solo — si no, taparía el contenido hasta que alguien lo cierre a mano.
  const menu = (vertical) => (
    <nav className={vertical ? 'nav flex-column' : 'nav'}>
      {enlaces.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={enlaceClase}
          style={enlaceEstilo}
          title={compacto && !vertical ? link.label : undefined}
          onClick={() => setMenuMovilAbierto(false)}
        >
          <i className={`fas ${link.icon} ${compacto && !vertical ? '' : 'me-2'}`}></i>
          {(!compacto || vertical) && link.label}
        </NavLink>
      ))}
    </nav>
  );

  // Menú para elegir posición (lateral/superior) y modo compacto (solo
  // iconos). Se guarda en localStorage vía useAdminLayoutPrefs, así que cada
  // quien lo deja como prefiera. Ambas preferencias solo aplican en
  // escritorio (md en adelante) — en móvil siempre se usa el menú colapsable.
  const controlesLayout = (
    <div className="dropdown d-none d-md-block">
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

  const botonModoOscuro = (
    <button
      type="button"
      className="btn btn-sm tema-encabezado-link border-0"
      onClick={toggleModoOscuro}
      title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <i className={`fas ${modoOscuro ? 'fa-sun' : 'fa-moon'}`}></i>
    </button>
  );

  const menuUsuario = (
    <div className="dropdown">
      <button className="btn btn-link tema-encabezado-link text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
        <i className="fas fa-user-circle me-1"></i><span className="d-none d-sm-inline">{user?.nombres} · {user?.rol}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><Link className="dropdown-item" to="/perfil"><i className="fas fa-user me-2"></i>Mi perfil</Link></li>
        <li><Link className="dropdown-item" to="/"><i className="fas fa-globe me-2"></i>Ver sitio público</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="fas fa-right-from-bracket me-2"></i>Cerrar sesión</button></li>
      </ul>
    </div>
  );

  const botonMenuMovil = (
    <button
      type="button"
      className="btn btn-sm tema-encabezado-link border-0 d-md-none"
      onClick={() => setMenuMovilAbierto((abierto) => !abierto)}
      aria-label={menuMovilAbierto ? 'Cerrar menú' : 'Abrir menú'}
    >
      <i className={`fas ${menuMovilAbierto ? 'fa-xmark' : 'fa-bars'}`}></i>
    </button>
  );

  // El menú colapsable de móvil es el mismo sin importar la preferencia de
  // escritorio (lateral/superior): en pantallas angostas ninguna de las dos
  // formas de escritorio cabe bien, así que ambas caen a este único patrón.
  const menuMovilColapsable = (
    <div className={`d-md-none border-top ${menuMovilAbierto ? '' : 'd-none'}`}>
      {menu(true)}
    </div>
  );

  if (!esLateral) {
    return (
      <div>
        <nav className="tema-encabezado border-bottom px-3">
          <div className="d-flex align-items-center justify-content-between py-2 gap-2">
            <div className="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
              {botonMenuMovil}
              {marca}
              <div className="d-none d-md-block">{menu(false)}</div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              {botonModoOscuro}
              {controlesLayout}
              {menuUsuario}
            </div>
          </div>
          {menuMovilColapsable}
        </nav>
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div className="d-md-flex" style={{ minHeight: '100vh' }}>
      <aside className="tema-encabezado border-end p-3 d-none d-md-block" style={{ width: compacto ? 70 : 230, flexShrink: 0, transition: 'width .15s' }}>
        <div className="mb-4">{marca}</div>
        {menu(true)}
      </aside>

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <nav className="tema-encabezado border-bottom px-3 px-md-4">
          <div className="d-flex align-items-center justify-content-between py-2 gap-2">
            <div className="d-flex align-items-center gap-3 overflow-hidden">
              {botonMenuMovil}
              <span className="tema-encabezado-link d-none d-md-inline">Panel de administración</span>
              <div className="d-md-none">{marca}</div>
            </div>
            <div className="d-flex align-items-center gap-2 flex-shrink-0">
              {botonModoOscuro}
              {controlesLayout}
              {menuUsuario}
            </div>
          </div>
          {menuMovilColapsable}
        </nav>
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

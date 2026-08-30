import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useConfiguracion } from '../context/ConfiguracionContext';
import { useAdminLayoutPrefs } from '../hooks/useAdminLayoutPrefs';
import Navbar from './header/Navbar';
import TopBar from './header/TopBar';
import ThemeToggleButton from './header/ThemeToggleButton';
import UserMenu from './header/UserMenu';
import MenuPersonalizarLayout from './header/MenuPersonalizarLayout';

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

  const cerrarMenuMovil = () => setMenuMovilAbierto(false);

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

  const controlesLayout = (
    <MenuPersonalizarLayout esLateral={esLateral} compacto={compacto} setPosicion={setPosicion} toggleCompacto={toggleCompacto} />
  );

  const botonModoOscuro = (
    <ThemeToggleButton modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} className="btn btn-sm tema-encabezado-link border-0" />
  );

  const menuUsuario = (
    <UserMenu
      label={<span className="d-none d-sm-inline">{user?.nombres} · {user?.rol}</span>}
      botonClassName="btn btn-link tema-encabezado-link text-decoration-none dropdown-toggle"
      onLogout={handleLogout}
    >
      <li><Link className="dropdown-item" to="/"><i className="fas fa-globe me-2"></i>Ver sitio público</Link></li>
    </UserMenu>
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

  const controles = (
    <>
      {botonModoOscuro}
      {controlesLayout}
      {menuUsuario}
    </>
  );

  // El menú colapsable de móvil es el mismo sin importar la preferencia de
  // escritorio (lateral/superior): en pantallas angostas ninguna de las dos
  // formas de escritorio cabe bien, así que ambas caen a este único patrón.
  const menuMovil = (
    <div className={`d-md-none border-top ${menuMovilAbierto ? '' : 'd-none'}`}>
      <Navbar
        enlaces={enlaces}
        vertical
        siempreConEtiqueta
        compacto={compacto}
        esLateral={esLateral}
        acento={temaResuelto.acento}
        resaltadoActivo={resaltadoActivo}
        onNavigate={cerrarMenuMovil}
      />
    </div>
  );

  if (!esLateral) {
    return (
      <div>
        <TopBar
          left={(
            <>
              {botonMenuMovil}
              {marca}
              <div className="d-none d-md-block">
                <Navbar enlaces={enlaces} vertical={false} compacto={compacto} esLateral={false} acento={temaResuelto.acento} resaltadoActivo={resaltadoActivo} />
              </div>
            </>
          )}
          right={controles}
          menuMovil={menuMovil}
        />
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
        <Navbar enlaces={enlaces} vertical compacto={compacto} esLateral acento={temaResuelto.acento} resaltadoActivo={resaltadoActivo} />
      </aside>

      <div className="flex-grow-1" style={{ minWidth: 0 }}>
        <TopBar
          left={(
            <>
              {botonMenuMovil}
              <span className="tema-encabezado-link d-none d-md-inline">Panel de administración</span>
              <div className="d-md-none">{marca}</div>
            </>
          )}
          right={controles}
          menuMovil={menuMovil}
        />
        <div className="p-3 p-md-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

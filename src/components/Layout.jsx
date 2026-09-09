import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useVistaHomeLlamativa } from '../hooks/useVistaHomeLlamativa';

// La preferencia de vista del inicio vive acá (no en Home) porque su control
// está en el encabezado, visible en todas las páginas — Home la recibe por
// el contexto del Outlet en vez de tener su propio estado.
const Layout = () => {
  const { vistaLlamativa, setVistaLlamativa } = useVistaHomeLlamativa();
  const location = useLocation();
  // Los carruseles de borde de la vista llamativa son `position: fixed` de
  // borde a borde de la ventana (ver .home-borde-carrusel en
  // styles/home-banners.css), así que quedan por encima de CUALQUIER
  // contenido que no tenga el mismo margen de compensación que Home.jsx se
  // aplica a sí mismo (.home-borde-margen) — incluido el footer, que vive
  // acá afuera de Home y no lo hereda. Solo aplica en "/" porque es la única
  // ruta donde Home.jsx realmente renderiza esos carruseles.
  const llamativaActivaEnInicio = vistaLlamativa && location.pathname === '/';

  return (
    <div>
      <Header vistaLlamativa={vistaLlamativa} setVistaLlamativa={setVistaLlamativa} />
      <main className="min-vh-content">
        <Outlet context={{ vistaLlamativa }} />
      </main>
      <div className={llamativaActivaEnInicio ? 'home-borde-margen' : ''}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

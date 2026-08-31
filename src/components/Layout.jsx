import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useVistaHomeLlamativa } from '../hooks/useVistaHomeLlamativa';

// La preferencia de vista del inicio vive acá (no en Home) porque su control
// está en el encabezado, visible en todas las páginas — Home la recibe por
// el contexto del Outlet en vez de tener su propio estado.
const Layout = () => {
  const { vistaLlamativa, setVistaLlamativa } = useVistaHomeLlamativa();

  return (
    <div>
      <Header vistaLlamativa={vistaLlamativa} setVistaLlamativa={setVistaLlamativa} />
      <main className="min-vh-content">
        <Outlet context={{ vistaLlamativa }} />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

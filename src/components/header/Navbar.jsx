import { NavLink } from 'react-router-dom';

// Lista de enlaces del panel admin. La usa AdminLayout en tres lugares:
// inline en la barra superior (modo "superior"), en la barra lateral (modo
// "lateral") y dentro del menú colapsable de móvil — cada uno le pasa
// `vertical`/`siempreConEtiqueta` según le convenga, pero el marcado de cada
// enlace es el mismo en los tres casos.
//
// `siempreConEtiqueta` ignora la preferencia "Solo iconos" (`compacto`): el
// menú colapsable de móvil la usa porque ahí un menú de solo iconos no tiene
// sentido, sin afectar a la barra lateral de escritorio, que sí debe
// respetar esa preferencia aunque también sea vertical.
const Navbar = ({ enlaces, vertical, compacto, siempreConEtiqueta = false, esLateral, acento, resaltadoActivo, onNavigate }) => {
  const ocultarEtiqueta = compacto && !siempreConEtiqueta;

  const enlaceClase = ({ isActive }) =>
    `nav-link d-flex align-items-center ${isActive ? 'fw-bold' : ''} ${esLateral ? '' : 'px-3'}`;
  const enlaceEstilo = ({ isActive }) =>
    esLateral
      ? { borderLeft: `3px solid ${isActive ? acento : 'transparent'}`, backgroundColor: isActive ? resaltadoActivo : undefined }
      : { borderBottom: `3px solid ${isActive ? acento : 'transparent'}` };

  return (
    <nav className={vertical ? 'nav flex-column' : 'nav'}>
      {enlaces.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={enlaceClase}
          style={enlaceEstilo}
          title={ocultarEtiqueta ? link.label : undefined}
          onClick={onNavigate}
        >
          <i className={`fas ${link.icon} ${ocultarEtiqueta ? '' : 'me-2'}`}></i>
          {!ocultarEtiqueta && link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;

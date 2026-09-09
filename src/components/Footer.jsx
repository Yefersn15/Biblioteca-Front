import { Link } from 'react-router-dom';
import { useConfiguracion } from '../context/ConfiguracionContext';
import { formatearHorario } from '../utils/horario';

const Footer = () => {
  const { nombreInstitucion, descripcion, direccion, telefono, email, horario } = useConfiguracion();
  const horarioFormateado = formatearHorario(horario);
  const tieneContacto = direccion || telefono || email || horarioFormateado.length > 0;

  return (
    <footer className="tema-encabezado border-top py-4 mt-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h6 className="fw-bold mb-2">{nombreInstitucion}</h6>
            <p className="small mb-0" style={{ opacity: 0.85 }}>
              {descripcion || 'Tu biblioteca de confianza.'}
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Contacto</h6>
            {tieneContacto ? (
              <ul className="list-unstyled small mb-0">
                {direccion && <li className="mb-1"><i className="fas fa-location-dot me-2"></i>{direccion}</li>}
                {telefono && <li className="mb-1"><i className="fas fa-phone me-2"></i>{telefono}</li>}
                {email && <li className="mb-1"><i className="fas fa-envelope me-2"></i>{email}</li>}
                {horarioFormateado.length > 0 && (
                  <li className="mb-1 d-flex">
                    <i className="fas fa-clock me-2 mt-1"></i>
                    <span>{horarioFormateado.map((linea, i) => <div key={i}>{linea}</div>)}</span>
                  </li>
                )}
              </ul>
            ) : (
              <ul className="list-unstyled small mb-0">
                <li className="mb-1"><a href="mailto:yefersonandres225@gmail.com" className="text-reset text-decoration-none"><i className="fas fa-envelope me-2"></i>yefersonandres225@gmail.com</a></li>
                <li className="mb-1"><a href="https://github.com/Yefersn15" target="_blank" rel="noopener noreferrer" className="text-reset text-decoration-none"><i className="fab fa-github me-2"></i>github.com/Yefersn15</a></li>
              </ul>
            )}
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold mb-2">Enlaces</h6>
            <ul className="list-unstyled small mb-0">
              <li className="mb-1"><Link to="/" className="text-reset text-decoration-none">Inicio</Link></li>
              <li className="mb-1"><Link to="/catalogo" className="text-reset text-decoration-none">Catálogo</Link></li>
              <li className="mb-1"><Link to="/nosotros" className="text-reset text-decoration-none">Nosotros</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-3" style={{ opacity: 0.2 }} />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} {nombreInstitucion} — Todos los derechos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useConfiguracion } from '../context/ConfiguracionContext';
import { formatearHorario } from '../utils/horario';

const Footer = () => {
  const { nombreInstitucion, direccion, telefono, email, horario } = useConfiguracion();
  const horarioFormateado = formatearHorario(horario);
  const tieneContacto = direccion || telefono || email || horarioFormateado.length > 0;

  return (
    <footer className="bg-light border-top py-4 mt-5 text-secondary">
      <div className="container">
        {tieneContacto && (
          <div className="row text-center text-md-start mb-3 gy-2 small">
            {direccion && <div className="col-md-3"><i className="fas fa-location-dot me-1"></i>{direccion}</div>}
            {telefono && <div className="col-md-3"><i className="fas fa-phone me-1"></i>{telefono}</div>}
            {email && <div className="col-md-3"><i className="fas fa-envelope me-1"></i>{email}</div>}
            {horarioFormateado.length > 0 && (
              <div className="col-md-3">
                <i className="fas fa-clock me-1"></i>
                {horarioFormateado.map((linea, i) => <div key={i}>{linea}</div>)}
              </div>
            )}
          </div>
        )}
        <div className="text-center">
          <small>© {new Date().getFullYear()} {nombreInstitucion} — Todos los derechos reservados</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from 'react-router-dom';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const VALORES = [
  {
    icon: 'fa-door-open',
    titulo: 'Acceso sin fricción',
    texto: 'Buscar y pedir un libro debería tomar segundos, no una visita en horario limitado. Por eso el catálogo está abierto a cualquiera, tenga o no cuenta.',
  },
  {
    icon: 'fa-people-group',
    titulo: 'Hecho con la comunidad',
    texto: 'Cada mejora sale de lo que pide quien presta y quien atiende el mostrador, no de lo que "debería" tener una biblioteca.',
  },
  {
    icon: 'fa-book-bookmark',
    titulo: 'El acervo primero',
    texto: 'Autores, editoriales y categorías son el corazón del catálogo: se cuidan con las mismas reglas con que se cuidaría un libro físico.',
  },
  {
    icon: 'fa-feather-pointed',
    titulo: 'Simple por diseño',
    texto: 'Sin pasos de más ni jerga técnica. Si algo necesita un manual para usarse, todavía no está terminado.',
  },
];

const Nosotros = () => {
  const { nombreInstitucion, descripcion } = useConfiguracion();

  useAyudaPagina({
    titulo: 'Nosotros',
    contenido: <p>Quiénes están detrás de {nombreInstitucion}: la idea que le dio origen, lo que valoramos y cómo pensamos el catálogo.</p>,
  });

  return (
    <div>
      <div className="tema-acento-bg py-5">
        <div className="container text-center" style={{ maxWidth: 720 }}>
          <div className="small text-uppercase fw-semibold mb-2" style={{ letterSpacing: '0.08em' }}>Nosotros</div>
          <h1 className="mb-3">Detrás de {nombreInstitucion}</h1>
          <p className="mb-0 fs-5">
            {descripcion || 'Un catálogo pensado para que encontrar y pedir un libro sea tan fácil como debería haber sido siempre.'}
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5 align-items-start mb-5">
          <div className="col-md-6">
            <h2 className="mb-3"><i className="fas fa-lightbulb me-2 text-tema-acento"></i>Cómo empezamos</h2>
            <p>
              {nombreInstitucion} nació de una pregunta simple, hecha en el mostrador de una biblioteca de barrio:
              ¿por qué el catálogo completo cabe en una sala, pero nadie fuera de esa sala puede consultarlo?
            </p>
            <p>
              Un grupo pequeño de bibliotecarios y desarrolladores decidió resolverlo: digitalizar el acervo,
              ponerlo en línea con buscador y filtros de verdad, y dejar que las solicitudes de préstamo se
              gestionaran sin planillas de papel. Lo que empezó como una hoja de cálculo terminó siendo esta plataforma.
            </p>
          </div>
          <div className="col-md-6">
            <h2 className="mb-3"><i className="fas fa-bullseye me-2 text-tema-acento"></i>Lo que buscamos</h2>
            <p>
              No competir con las bibliotecas físicas, sino quitarles el trabajo repetitivo: catalogar, controlar
              copias disponibles, avisar vencimientos. Que el tiempo del personal se vaya en recomendar libros,
              no en llevar la cuenta de quién tiene cuál.
            </p>
            <p>
              Para quien lee, la idea es todavía más simple: un catálogo que se pueda mirar desde el celular a
              medianoche, sin depender del horario de atención.
            </p>
          </div>
        </div>

        <h2 className="text-center mb-4">Lo que no negociamos</h2>
        <div className="row g-4 mb-5">
          {VALORES.map((v) => (
            <div className="col-sm-6 col-lg-3" key={v.titulo}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <i className={`fas ${v.icon} fa-lg mb-3 text-tema-acento`}></i>
                  <h5 className="card-title">{v.titulo}</h5>
                  <p className="card-text text-muted small mb-0">{v.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted mb-3">¿Ya tienes una cuenta o quieres ver qué hay para leer?</p>
          <Link to="/catalogo" className="btn btn-primary btn-lg">
            <i className="fas fa-book me-2"></i>Explorar el catálogo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;

import { Link } from 'react-router-dom';
import BannerCollage from '../banners/components/BannerCollage';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import HomeLoginCard from './HomeLoginCard';
import { formatearHorario } from '../../utils/horario';
import { useHome } from './hooks/useHome';
import LibroCard from '../libros/components/LibroCard';
import AutorCard from '../autores/components/AutorCard';
import EditorialCard from '../editoriales/components/EditorialCard';
import InfiniteCarousel from '../../components/InfiniteCarousel';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const Home = () => {
  useAyudaPagina({
    titulo: 'Inicio',
    contenido: (
      <>
        <p>Página de bienvenida del sitio: muestra el banner principal, autores y editoriales destacados, y una selección de libros recomendados (los más recientes del catálogo).</p>
        <p>Los datos de contacto, horario y ubicación que ves aquí abajo se configuran desde <strong>Configuración</strong> en el panel de administración.</p>
      </>
    ),
  });
  const { nombreInstitucion, direccion, telefono, email, horario, mapaEmbedUrl } = useConfiguracion();
  const horarioFormateado = formatearHorario(horario);
  const { banners, libros, autores, editoriales } = useHome();

  return (
    <div>
      {banners.length > 0 && (
        <div className="container py-4">
          {banners.slice(0, 1).map((banner) => (
            <BannerCollage
              key={banner.id}
              layout={banner.layout}
              images={banner.images}
              items={banner.items}
              titulo={banner.titulo}
              texto={banner.texto}
              textPosition={banner.textPosition}
              height={360}
            />
          ))}
        </div>
      )}

      {autores.length > 0 && (
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Autores</h2>
            <Link to="/catalogo/autores" className="btn btn-outline-primary btn-sm">Ver todos</Link>
          </div>
          <InfiniteCarousel
            items={autores}
            itemWidth={150}
            renderItem={(autor) => <AutorCard autor={autor} />}
          />
        </div>
      )}

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Libros recomendados</h2>
          <Link to="/catalogo" className="btn btn-outline-primary btn-sm">Ver catálogo completo</Link>
        </div>

        {libros.length === 0 ? (
          <p className="text-muted">Todavía no hay libros cargados en el catálogo.</p>
        ) : (
          <InfiniteCarousel
            items={libros}
            itemWidth={150}
            renderItem={(libro) => <LibroCard libro={libro} />}
          />
        )}
      </div>

      {editoriales.length > 0 && (
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Editoriales</h2>
            <Link to="/catalogo/editoriales" className="btn btn-outline-primary btn-sm">Ver todas</Link>
          </div>
          <InfiniteCarousel
            items={editoriales}
            itemWidth={150}
            renderItem={(editorial) => <EditorialCard editorial={editorial} />}
          />
        </div>
      )}

      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-md-4">
            <HomeLoginCard />
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-header bg-white border-bottom text-tema-acento">
                <i className="fas fa-circle-info me-2"></i>{nombreInstitucion}
              </div>
              <div className="card-body">
                {direccion && <p><i className="fas fa-location-dot me-2 text-muted"></i>{direccion}</p>}
                {horarioFormateado.length > 0 && (
                  <p className="mb-2">
                    <i className="fas fa-clock me-2 text-muted"></i>
                    {horarioFormateado.map((linea, i) => (
                      <span key={i} className="d-block ps-4">{linea}</span>
                    ))}
                  </p>
                )}
                {telefono && <p><i className="fas fa-phone me-2 text-muted"></i>{telefono}</p>}
                {email && <p><i className="fas fa-envelope me-2 text-muted"></i>{email}</p>}
                {!direccion && horarioFormateado.length === 0 && !telefono && !email && (
                  <p className="text-muted small mb-0">
                    Todavía no se han configurado los datos de la institución. Un administrador puede hacerlo desde el panel de administración.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-header bg-white border-bottom">
                <i className="fas fa-map-location-dot me-2"></i>Ubicación
              </div>
              <div className="card-body p-0">
                {mapaEmbedUrl || direccion ? (
                  <iframe
                    title="Ubicación"
                    src={mapaEmbedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(direccion)}&output=embed`}
                    width="100%"
                    height="230"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center text-muted" style={{ height: 230 }}>
                    <i className="fas fa-map-location-dot fa-2x"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

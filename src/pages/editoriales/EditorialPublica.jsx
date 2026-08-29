import { Link } from 'react-router-dom';
import { useEditorialPublica } from './hooks/useEditorialPublica';
import LibroCard from '../libros/components/LibroCard';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';

const EditorialPublica = () => {
  const { editorial, libros, loading } = useEditorialPublica();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(libros, 10, [editorial?.id]);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
  }
  if (!editorial) {
    return <div className="container py-4"><div className="alert alert-warning">Editorial no encontrada.</div></div>;
  }

  return (
    <div className="container py-4">
      <Link to="/catalogo/editoriales" className="btn btn-link ps-0 mb-3"><i className="fas fa-arrow-left me-1"></i>Volver a editoriales</Link>

      <div className="row g-4 mb-4">
        <div className="col-md-3 text-center">
          <img
            src={editorial.logoUrl || undefined}
            alt=""
            className="rounded"
            style={{ width: 160, height: 160, objectFit: 'contain', background: '#e9ecef', display: editorial.logoUrl ? 'inline-block' : 'none' }}
          />
          {!editorial.logoUrl && (
            <div className="rounded mx-auto d-flex align-items-center justify-content-center text-muted" style={{ width: 160, height: 160, background: '#e9ecef' }}>
              <i className="fas fa-building fa-3x"></i>
            </div>
          )}
        </div>
        <div className="col-md-9">
          <h2>{editorial.nombre}</h2>
          {editorial.sitioWeb && (
            <p className="mb-2">
              <a href={editorial.sitioWeb} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-globe me-1"></i>{editorial.sitioWeb}
              </a>
            </p>
          )}
          <p>{editorial.descripcion}</p>
        </div>
      </div>

      <h4 className="mb-3">Libros de {editorial.nombre} en el catálogo</h4>
      {libros.length === 0 ? (
        <div className="alert alert-info">No hay libros de esta editorial en el catálogo.</div>
      ) : (
        <>
          <div className="row g-4">
            {itemsPagina.map((libro) => (
              <div className="col-6 col-md-3 col-lg-2" key={libro.id}>
                <LibroCard libro={libro} />
              </div>
            ))}
          </div>
          <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
        </>
      )}
    </div>
  );
};

export default EditorialPublica;

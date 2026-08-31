import { Link } from 'react-router-dom';
import { useCategoriasPublicas } from './hooks/useCategoriasPublicas';
import { useBusquedaOrden, ORDEN_OPCIONES } from '../../hooks/useBusquedaOrden';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const getTexto = (c) => c.nombre;
const getPopularidad = (c) => c.cantidadLibros || 0;

// A diferencia de Autores/Editoriales, una categoría no tiene contenido
// propio (sin logo/bio) — así que no tiene página individual, cada tarjeta
// lleva directo al catálogo ya filtrado por esa categoría.
const CategoriasPublicas = () => {
  useAyudaPagina({
    titulo: 'Categorías',
    contenido: <p>Lista de categorías (géneros/temas) activas. A diferencia de autores y editoriales, una categoría no tiene página propia: al hacer clic en una vas directo al catálogo ya filtrado por ella.</p>,
  });
  const { categorias, loading } = useCategoriasPublicas();
  const { busqueda, setBusqueda, orden, setOrden, resultado } = useBusquedaOrden(categorias, getTexto, getPopularidad);
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(resultado, 8, [busqueda, orden]);

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-tags me-2 text-tema-acento"></i>Categorías</h2>

      <div className="row g-2 mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={orden} onChange={(e) => setOrden(e.target.value)}>
            {ORDEN_OPCIONES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : resultado.length === 0 ? (
        <div className="alert alert-info">No hay categorías que coincidan con la búsqueda.</div>
      ) : (
        <>
          <div className="row g-4">
            {itemsPagina.map((c) => (
              <div className="col-6 col-md-4 col-lg-3" key={c.id}>
                <Link to={`/catalogo?categoriaId=${c.id}`} className="text-decoration-none text-dark">
                  <div className="card h-100 shadow-sm text-center">
                    <div className="card-body">
                      <i className="fas fa-tag fa-2x mb-2 text-tema-acento"></i>
                      <div className="fw-bold">{c.nombre}</div>
                      {c.descripcion && <div className="small text-muted text-truncate">{c.descripcion}</div>}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
        </>
      )}
    </div>
  );
};

export default CategoriasPublicas;

import { useAutoresPublicos } from './hooks/useAutoresPublicos';
import AutorCard from './components/AutorCard';
import { useBusquedaOrden, ORDEN_OPCIONES } from '../../hooks/useBusquedaOrden';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const getTexto = (a) => `${a.nombre} ${a.apellido}`;
const getPopularidad = (a) => a.cantidadLibros || 0;

const AutoresPublicos = () => {
  useAyudaPagina({
    titulo: 'Autores',
    contenido: (
      <p>Lista de autores activos en la biblioteca. Busca por nombre u ordénalos por popularidad (cantidad de libros suyos en el catálogo); haz clic en uno para ver su biografía y sus obras.</p>
    ),
  });
  const { autores, loading } = useAutoresPublicos();
  const { busqueda, setBusqueda, orden, setOrden, resultado } = useBusquedaOrden(autores, getTexto, getPopularidad);
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(resultado, 8, [busqueda, orden]);

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-feather me-2"></i>Autores</h2>

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
        <div className="alert alert-info">No hay autores que coincidan con la búsqueda.</div>
      ) : (
        <>
          <div className="row g-4">
            {itemsPagina.map((a) => (
              <div className="col-6 col-md-4 col-lg-3" key={a.id}>
                <AutorCard autor={a} />
              </div>
            ))}
          </div>
          <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
        </>
      )}
    </div>
  );
};

export default AutoresPublicos;

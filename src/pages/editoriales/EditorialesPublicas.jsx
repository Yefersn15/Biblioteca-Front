import { useEditorialesPublicas } from './hooks/useEditorialesPublicas';
import EditorialCard from './components/EditorialCard';
import { useBusquedaOrden, ORDEN_OPCIONES } from '../../hooks/useBusquedaOrden';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const getTexto = (e) => e.nombre;
const getPopularidad = (e) => e.cantidadLibros || 0;

const EditorialesPublicas = () => {
  useAyudaPagina({
    titulo: 'Editoriales',
    contenido: <p>Lista de editoriales activas. Busca por nombre u ordénalas por popularidad (cantidad de libros suyos en el catálogo); haz clic en una para ver su información y sus libros.</p>,
  });
  const { editoriales, loading } = useEditorialesPublicas();
  const { busqueda, setBusqueda, orden, setOrden, resultado } = useBusquedaOrden(editoriales, getTexto, getPopularidad);
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(resultado, 10, [busqueda, orden]);

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-building me-2 text-tema-acento"></i>Editoriales</h2>

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
        <div className="alert alert-info">No hay editoriales que coincidan con la búsqueda.</div>
      ) : (
        <>
          <div className="row g-4">
            {itemsPagina.map((e) => (
              <div className="col-6 col-md-4 col-lg-3" key={e.id}>
                <EditorialCard editorial={e} />
              </div>
            ))}
          </div>
          <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={setPagina} />
        </>
      )}
    </div>
  );
};

export default EditorialesPublicas;

import { useCatalogoLibros } from './hooks/useCatalogoLibros';
import CatalogoFiltros from './components/CatalogoFiltros';
import LibroCard from './components/LibroCard';
import { usePaginacion } from '../../hooks/usePaginacion';
import Pagination from '../../components/Pagination';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const CatalogoLibros = () => {
  useAyudaPagina({
    titulo: 'Catálogo',
    contenido: (
      <>
        <p>Aquí aparecen todos los libros activos de la biblioteca. Puedes buscar por título, filtrar por autor o categoría, y ordenar los resultados.</p>
        <p>Un libro con "0 de X copias disponibles" sigue visible pero no se puede solicitar en préstamo hasta que se devuelva alguna copia.</p>
      </>
    ),
  });
  const {
    libros,
    loading,
    search,
    setSearch,
    categorias,
    autores,
    nombreFiltroEditorial,
    autorId,
    categoriaId,
    sort,
    actualizarFiltro,
    limpiarFiltros,
    hayFiltros,
  } = useCatalogoLibros();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(libros, 10, [search, autorId, categoriaId, sort]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-book me-2 text-tema-acento"></i>{nombreFiltroEditorial ? `Editorial: ${nombreFiltroEditorial}` : 'Catálogo'}
        </h2>
        {hayFiltros && <button className="btn btn-sm btn-outline-secondary" onClick={limpiarFiltros}>Quitar filtros</button>}
      </div>

      <CatalogoFiltros
        search={search}
        setSearch={setSearch}
        categorias={categorias}
        autores={autores}
        categoriaId={categoriaId}
        autorId={autorId}
        sort={sort}
        actualizarFiltro={actualizarFiltro}
      />

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : libros.length === 0 ? (
        <div className="alert alert-info">No se encontraron libros con esos filtros.</div>
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

export default CatalogoLibros;

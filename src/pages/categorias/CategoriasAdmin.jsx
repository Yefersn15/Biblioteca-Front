import { Link } from 'react-router-dom';
import { useCategoriasAdmin } from './hooks/useCategoriasAdmin';
import CategoriasAdminFiltros from './components/CategoriasAdminFiltros';
import CategoriaRow from './components/CategoriaRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const CategoriasAdmin = () => {
  useAyudaPagina({
    titulo: 'Categorías (admin)',
    contenido: (
      <>
        <p>Gestiona las categorías (géneros/temas) del catálogo. Una categoría con libros asociados <strong>no se puede eliminar</strong>; solo se puede desactivar.</p>
        <p>Al desactivar una categoría, solo se desactivan los libros marcados con <strong>esa</strong> categoría — no afecta a otros libros del mismo autor ni a otras categorías de esos libros.</p>
      </>
    ),
  });
  const {
    categorias,
    loading,
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    toggleEstado,
    handleEliminar,
  } = useCategoriasAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(categorias, 5, [search, estadoFiltro]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Categorías</h2>
        <Link to="/admin/categorias/nueva" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nueva categoría
        </Link>
      </div>

      <CategoriasAdminFiltros search={search} setSearch={setSearch} estadoFiltro={estadoFiltro} setEstadoFiltro={setEstadoFiltro} />

      <AdminTable
        loading={loading}
        isEmpty={categorias.length === 0}
        emptyMessage="No hay categorías todavía."
        headers={<><th>Nombre</th><th>Descripción</th><th>Estado</th><th style={{ width: 100 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((c) => (
          <CategoriaRow key={c.id} categoria={c} onEliminar={handleEliminar} onToggleEstado={toggleEstado} />
        ))}
      </AdminTable>
    </div>
  );
};

export default CategoriasAdmin;

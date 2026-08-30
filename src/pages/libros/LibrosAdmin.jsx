import { Link } from 'react-router-dom';
import { useLibrosAdmin } from './hooks/useLibrosAdmin';
import LibrosAdminFiltros from './components/LibrosAdminFiltros';
import LibroRow from './components/LibroRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const LibrosAdmin = () => {
  useAyudaPagina({
    titulo: 'Libros (admin)',
    contenido: (
      <>
        <p>Gestiona el catálogo: crea, edita o elimina libros. "Eliminar" es una baja lógica: el libro se oculta del catálogo público y de las solicitudes de préstamo, pero no se borra su historial. Para reactivarlo, edítalo y marca "Visible en el catálogo".</p>
        <p>Filtra por editorial, tipo o estado, y busca por título o autor.</p>
      </>
    ),
  });
  const {
    libros,
    loading,
    search,
    setSearch,
    editorialId,
    setEditorialId,
    tipo,
    setTipo,
    estadoFiltro,
    setEstadoFiltro,
    editoriales,
    hayFiltros,
    limpiarFiltros,
    handleEliminar,
  } = useLibrosAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(libros, 5, [search, editorialId, tipo, estadoFiltro]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Libros</h2>
        <Link to="/admin/libros/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo libro
        </Link>
      </div>

      <LibrosAdminFiltros
        search={search}
        setSearch={setSearch}
        editorialId={editorialId}
        setEditorialId={setEditorialId}
        tipo={tipo}
        setTipo={setTipo}
        estadoFiltro={estadoFiltro}
        setEstadoFiltro={setEstadoFiltro}
        editoriales={editoriales}
        hayFiltros={hayFiltros}
        limpiarFiltros={limpiarFiltros}
      />

      <AdminTable
        loading={loading}
        isEmpty={libros.length === 0}
        emptyMessage="No hay libros todavía."
        headers={<><th></th><th>Título</th><th>Autor</th><th>Tipo</th><th>Copias</th><th>Estado</th><th style={{ width: 120 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((libro) => (
          <LibroRow key={libro.id} libro={libro} onEliminar={handleEliminar} />
        ))}
      </AdminTable>
    </div>
  );
};

export default LibrosAdmin;

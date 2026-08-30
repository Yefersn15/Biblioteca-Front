import { Link } from 'react-router-dom';
import { useEditorialesAdmin } from './hooks/useEditorialesAdmin';
import EditorialesAdminFiltros from './components/EditorialesAdminFiltros';
import EditorialRow from './components/EditorialRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';

const EditorialesAdmin = () => {
  const {
    editoriales,
    loading,
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    toggleEstado,
    handleEliminar,
  } = useEditorialesAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(editoriales, 5, [search, estadoFiltro]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Editoriales</h2>
        <Link to="/admin/editoriales/nueva" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nueva editorial
        </Link>
      </div>

      <EditorialesAdminFiltros search={search} setSearch={setSearch} estadoFiltro={estadoFiltro} setEstadoFiltro={setEstadoFiltro} />

      <AdminTable
        loading={loading}
        isEmpty={editoriales.length === 0}
        emptyMessage="No hay editoriales todavía."
        headers={<><th></th><th>Nombre</th><th>Sitio web</th><th>Estado</th><th style={{ width: 100 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((e) => (
          <EditorialRow key={e.id} editorial={e} onEliminar={handleEliminar} onToggleEstado={toggleEstado} />
        ))}
      </AdminTable>
    </div>
  );
};

export default EditorialesAdmin;

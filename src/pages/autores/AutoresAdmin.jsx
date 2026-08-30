import { Link } from 'react-router-dom';
import { useAutoresAdmin } from './hooks/useAutoresAdmin';
import AutoresAdminFiltros from './components/AutoresAdminFiltros';
import AutorRow from './components/AutorRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const AutoresAdmin = () => {
  useAyudaPagina({
    titulo: 'Autores (admin)',
    contenido: (
      <>
        <p>Gestiona los autores del catálogo. Un autor con libros asociados <strong>no se puede eliminar</strong> (para no perder esa relación); solo se puede desactivar.</p>
        <p>Al desactivar un autor, sus libros también quedan desactivados automáticamente (ocultos del catálogo público). Reactivar al autor no reactiva sus libros — cada libro se reactiva por separado desde su propio formulario.</p>
      </>
    ),
  });
  const {
    autores,
    categorias,
    nacionalidades,
    loading,
    search,
    setSearch,
    nacionalidadFiltro,
    setNacionalidadFiltro,
    generoFiltro,
    setGeneroFiltro,
    estadoFiltro,
    setEstadoFiltro,
    toggleEstado,
    handleEliminar,
  } = useAutoresAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(autores, 5, [search, nacionalidadFiltro, generoFiltro, estadoFiltro]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Autores</h2>
        <Link to="/admin/autores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo autor
        </Link>
      </div>

      <AutoresAdminFiltros
        search={search}
        setSearch={setSearch}
        nacionalidadFiltro={nacionalidadFiltro}
        setNacionalidadFiltro={setNacionalidadFiltro}
        generoFiltro={generoFiltro}
        setGeneroFiltro={setGeneroFiltro}
        estadoFiltro={estadoFiltro}
        setEstadoFiltro={setEstadoFiltro}
        nacionalidades={nacionalidades}
        categorias={categorias}
      />

      <AdminTable
        loading={loading}
        isEmpty={autores.length === 0}
        emptyMessage="No hay autores todavía."
        headers={<><th></th><th>Nombre</th><th>Nacionalidad</th><th>Género literario</th><th>Estado</th><th style={{ width: 100 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((a) => (
          <AutorRow key={a.id} autor={a} onEliminar={handleEliminar} toggleEstado={toggleEstado} />
        ))}
      </AdminTable>
    </div>
  );
};

export default AutoresAdmin;

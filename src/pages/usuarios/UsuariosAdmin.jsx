import { useUsuariosAdmin, ROLES } from './hooks/useUsuariosAdmin';
import UsuariosAdminFiltros from './components/UsuariosAdminFiltros';
import UsuarioRow from './components/UsuarioRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';

const UsuariosAdmin = () => {
  const {
    usuarios,
    loading,
    usuarioActual,
    search,
    setSearch,
    rolFiltro,
    setRolFiltro,
    estadoFiltro,
    setEstadoFiltro,
    cambiarRol,
    toggleEstado,
    handleEliminar,
  } = useUsuariosAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(usuarios, 5, [search, rolFiltro, estadoFiltro]);

  return (
    <div>
      <h2 className="mb-4">Usuarios</h2>

      <UsuariosAdminFiltros
        search={search}
        setSearch={setSearch}
        rolFiltro={rolFiltro}
        setRolFiltro={setRolFiltro}
        estadoFiltro={estadoFiltro}
        setEstadoFiltro={setEstadoFiltro}
        roles={ROLES}
      />

      <AdminTable
        loading={loading}
        isEmpty={usuarios.length === 0}
        emptyMessage="No hay usuarios todavía."
        headers={<><th>Nombre</th><th>Documento</th><th>Contacto</th><th>Rol</th><th>Estado</th><th style={{ width: 110 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((u) => (
          <UsuarioRow
            key={u.id}
            usuario={u}
            usuarioActual={usuarioActual}
            cambiarRol={cambiarRol}
            toggleEstado={toggleEstado}
            handleEliminar={handleEliminar}
          />
        ))}
      </AdminTable>
    </div>
  );
};

export default UsuariosAdmin;

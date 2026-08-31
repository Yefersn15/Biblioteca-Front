import { Link } from 'react-router-dom';
import { useUsuariosAdmin, ROLES } from './hooks/useUsuariosAdmin';
import UsuariosAdminFiltros from './components/UsuariosAdminFiltros';
import UsuarioRow from './components/UsuarioRow';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const UsuariosAdmin = () => {
  useAyudaPagina({
    titulo: 'Usuarios (admin)',
    contenido: (
      <>
        <p>Cambia el rol (USUARIO, BIBLIOTECARIO, ADMIN) o el estado de cualquier cuenta, o entra a "Editar" para corregir sus datos personales. No puedes tocar tu propia fila (rol/estado/eliminar) para evitar que te quites permisos por error.</p>
        <p>La cuenta creada por <code>npm run seed:db</code> (el administrador principal) está protegida: nadie, ni siquiera otro administrador, puede cambiarle el rol, desactivarla, eliminarla o cambiarle la contraseña desde aquí — solo desde el servidor.</p>
      </>
    ),
  });
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Usuarios</h2>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo usuario
        </Link>
      </div>

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

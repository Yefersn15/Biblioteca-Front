import { useUsuariosAdmin } from './hooks/useUsuariosAdmin';
import UsuarioRow from './components/UsuarioRow';

const UsuariosAdmin = () => {
  const { usuarios, loading, usuarioActual, cambiarRol, toggleEstado, handleEliminar } = useUsuariosAdmin();

  return (
    <div>
      <h2 className="mb-4">Usuarios</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Contacto</th>
              <th>Rol</th>
              <th>Estado</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <UsuarioRow
                key={u.id}
                usuario={u}
                usuarioActual={usuarioActual}
                cambiarRol={cambiarRol}
                toggleEstado={toggleEstado}
                handleEliminar={handleEliminar}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsuariosAdmin;

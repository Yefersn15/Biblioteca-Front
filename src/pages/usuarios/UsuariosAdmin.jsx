import { useState, useEffect } from 'react';
import { getUsuarios, actualizarUsuario, eliminarUsuario } from '../../services/api/usuarios.api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

const ROLES = ['USUARIO', 'BIBLIOTECARIO', 'ADMIN'];

const UsuariosAdmin = () => {
  const { user: usuarioActual } = useAuth();
  const toast = useToast();
  const confirm = useConfirm();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargar = async () => {
    setLoading(true);
    const { items } = await getUsuarios({ limit: 100 });
    setUsuarios(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, []);

  const cambiarRol = async (usuario, rol) => {
    try {
      await actualizarUsuario(usuario.id, { rol });
      toast.success('Rol actualizado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleEstado = async (usuario) => {
    try {
      await actualizarUsuario(usuario.id, { estado: !usuario.estado });
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEliminar = async (usuario) => {
    if (!(await confirm(`¿Deshabilitar a "${usuario.nombres} ${usuario.apellidos}"?`))) return;
    try {
      await eliminarUsuario(usuario.id);
      toast.success('Usuario deshabilitado');
      cargar();
    } catch (err) {
      toast.error(err.message);
    }
  };

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
              <tr key={u.id}>
                <td>
                  {u.nombres} {u.apellidos}
                  <br /><small className="text-muted">{u.email}</small>
                </td>
                <td>{u.tipoDocumento ? `${u.tipoDocumento} ${u.documento}` : '—'}</td>
                <td>
                  {u.celular || '—'}
                  {u.direccion && <><br /><small className="text-muted">{u.direccion}{u.barrio ? `, ${u.barrio}` : ''}</small></>}
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: 160 }}
                    value={u.rol}
                    disabled={u.id === usuarioActual.id}
                    onChange={(e) => cambiarRol(u, e.target.value)}
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td>
                  <button
                    className={`badge border-0 ${u.estado ? 'bg-success' : 'bg-secondary'}`}
                    disabled={u.id === usuarioActual.id}
                    onClick={() => toggleEstado(u)}
                  >
                    {u.estado ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td>
                  {u.id !== usuarioActual.id && (
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(u)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsuariosAdmin;

import { ROLES } from '../hooks/useUsuariosAdmin';

const UsuarioRow = ({ usuario: u, usuarioActual, cambiarRol, toggleEstado, handleEliminar }) => {
  const esUsuarioActual = u.id === usuarioActual.id;

  return (
    <tr>
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
          disabled={esUsuarioActual}
          onChange={(e) => cambiarRol(u, e.target.value)}
        >
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </td>
      <td>
        <button
          className={`btn btn-sm ${u.estado ? 'btn-outline-warning' : 'btn-outline-success'}`}
          disabled={esUsuarioActual}
          onClick={() => toggleEstado(u)}
          title={u.estado ? 'Desactivar' : 'Activar'}
        >
          <i className={`fas fa-toggle-${u.estado ? 'off' : 'on'}`}></i>
        </button>
      </td>
      <td>
        {!esUsuarioActual && (
          <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(u)} title="Eliminar">
            <i className="fas fa-trash"></i>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UsuarioRow;

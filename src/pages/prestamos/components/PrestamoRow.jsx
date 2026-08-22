// src/pages/prestamos/components/PrestamoRow.jsx
const ESTADO_BADGE = {
  PENDIENTE: 'bg-warning text-dark',
  APROBADO: 'bg-primary',
  RECHAZADO: 'bg-danger',
  DEVUELTO: 'bg-success',
};

const PrestamoRow = ({ prestamo, onAbrirModal, onVerObservacion }) => {
  const p = prestamo;

  return (
    <tr>
      <td>{p.libro?.titulo}</td>
      <td>
        {p.usuario?.nombres} {p.usuario?.apellidos}
        {p.usuario?.tipoDocumento && <><br /><small className="text-muted">{p.usuario.tipoDocumento} {p.usuario.documento}</small></>}
      </td>
      <td>
        {p.usuario?.celular || '—'}
        {p.usuario?.direccion && <><br /><small className="text-muted">{p.usuario.direccion}{p.usuario.barrio ? `, ${p.usuario.barrio}` : ''}</small></>}
      </td>
      <td>{p.fechaPrestamo}</td>
      <td>{p.fechaDevolucionEstimada || <span className="text-muted">Por definir</span>}</td>
      <td><span className={`badge ${ESTADO_BADGE[p.estado]}`}>{p.estado}</span></td>
      <td>
        {p.estado === 'PENDIENTE' && (
          <>
            <button className="btn btn-sm btn-success me-1" onClick={() => onAbrirModal('aprobar', p)}>
              <i className="fas fa-check me-1"></i>Aprobar
            </button>
            <button className="btn btn-sm btn-outline-danger me-1" onClick={() => onAbrirModal('rechazar', p)}>
              <i className="fas fa-times me-1"></i>Rechazar
            </button>
          </>
        )}
        {p.estado === 'APROBADO' && (
          <button className="btn btn-sm btn-primary me-1" onClick={() => onAbrirModal('devolver', p)}>
            <i className="fas fa-check me-1"></i>Registrar devolución
          </button>
        )}
        {p.observaciones && (
          <button className="btn btn-sm btn-outline-info" onClick={() => onVerObservacion(p)}>
            <i className="fas fa-sticky-note"></i>
          </button>
        )}
      </td>
    </tr>
  );
};

export default PrestamoRow;

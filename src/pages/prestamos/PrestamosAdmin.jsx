import { useState, useEffect } from 'react';
import { getPrestamos, aprobarPrestamo, rechazarPrestamo, devolverPrestamo } from '../../services/api/prestamos.api';
import { useToast } from '../../context/ToastContext';

const ESTADO_BADGE = {
  PENDIENTE: 'bg-warning text-dark',
  APROBADO: 'bg-primary',
  RECHAZADO: 'bg-danger',
  DEVUELTO: 'bg-success',
};

const PrestamosAdmin = () => {
  const toast = useToast();
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [modal, setModal] = useState(null); // { tipo: 'aprobar'|'rechazar'|'devolver'|'observacion', prestamo, observaciones }

  const cargar = async () => {
    setLoading(true);
    const { items } = await getPrestamos({ limit: 100, estado: filtro || undefined });
    setPrestamos(items);
    setLoading(false);
  };

  useEffect(() => { cargar(); }, [filtro]);

  const abrirModal = (tipo, prestamo) => setModal({ tipo, prestamo, observaciones: '' });
  const cerrarModal = () => setModal(null);

  const confirmarModal = async () => {
    setProcesando(true);
    try {
      const { tipo, prestamo, observaciones } = modal;
      if (tipo === 'aprobar') await aprobarPrestamo(prestamo.id);
      if (tipo === 'rechazar') await rechazarPrestamo(prestamo.id, observaciones || undefined);
      if (tipo === 'devolver') await devolverPrestamo(prestamo.id, observaciones || undefined);
      await cargar();
      cerrarModal();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setProcesando(false);
    }
  };

  const TITULOS = { aprobar: 'Aprobar préstamo', rechazar: 'Rechazar préstamo', devolver: 'Registrar devolución' };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Préstamos</h2>
        <select className="form-select" style={{ width: 200 }} value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">Pendientes</option>
          <option value="APROBADO">Aprobados</option>
          <option value="RECHAZADO">Rechazados</option>
          <option value="DEVUELTO">Devueltos</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : prestamos.length === 0 ? (
        <div className="alert alert-info">No hay préstamos con ese filtro.</div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Solicitante</th>
              <th>Contacto</th>
              <th>Solicitado</th>
              <th>Devolución estimada</th>
              <th>Estado</th>
              <th style={{ width: 260 }}></th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p.id}>
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
                <td>{p.fechaDevolucionEstimada}</td>
                <td><span className={`badge ${ESTADO_BADGE[p.estado]}`}>{p.estado}</span></td>
                <td>
                  {p.estado === 'PENDIENTE' && (
                    <>
                      <button className="btn btn-sm btn-success me-1" onClick={() => abrirModal('aprobar', p)}>
                        Aprobar
                      </button>
                      <button className="btn btn-sm btn-outline-danger me-1" onClick={() => abrirModal('rechazar', p)}>
                        Rechazar
                      </button>
                    </>
                  )}
                  {p.estado === 'APROBADO' && (
                    <button className="btn btn-sm btn-primary me-1" onClick={() => abrirModal('devolver', p)}>
                      Registrar devolución
                    </button>
                  )}
                  {p.observaciones && (
                    <button className="btn btn-sm btn-outline-info" onClick={() => setModal({ tipo: 'observacion', prestamo: p })}>
                      <i className="fas fa-comment"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modal && modal.tipo !== 'observacion' && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{TITULOS[modal.tipo]}</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>{modal.prestamo.libro?.titulo}</strong> — {modal.prestamo.usuario?.nombres} {modal.prestamo.usuario?.apellidos}
                </p>
                {(modal.tipo === 'rechazar' || modal.tipo === 'devolver') && (
                  <div>
                    <label className="form-label">Observaciones (opcional)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder={modal.tipo === 'rechazar' ? 'Ej: no cumple los requisitos de préstamo' : 'Ej: libro devuelto con daños en la portada'}
                      value={modal.observaciones}
                      onChange={(e) => setModal({ ...modal, observaciones: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-primary" disabled={procesando} onClick={confirmarModal}>
                  {procesando ? 'Guardando...' : 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal && modal.tipo === 'observacion' && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Observación</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>{modal.prestamo.observaciones}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrestamosAdmin;

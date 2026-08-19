// src/pages/prestamos/components/PrestamoActionModal.jsx
const TITULOS = { aprobar: 'Aprobar préstamo', rechazar: 'Rechazar préstamo', devolver: 'Registrar devolución' };

const PrestamoActionModal = ({ modal, procesando, onClose, onChangeObservaciones, onConfirm }) => {
  if (!modal) return null;

  if (modal.tipo === 'observacion') {
    return (
      <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Observación</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p>{modal.prestamo.observaciones}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{TITULOS[modal.tipo]}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
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
                  onChange={(e) => onChangeObservaciones(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={procesando} onClick={onConfirm}>
              {procesando ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestamoActionModal;

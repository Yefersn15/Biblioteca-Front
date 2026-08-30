// src/pages/prestamos/components/PrestamoActionModal.jsx
import BuscadorSelect from './BuscadorSelect';

const TITULOS = {
  aprobar: 'Aprobar préstamo',
  rechazar: 'Rechazar préstamo',
  devolver: 'Registrar devolución',
  presencial: 'Registrar préstamo presencial',
};

const CAMPOS_USUARIO_NUEVO = [
  { campo: 'nombres', label: 'Nombres', tipo: 'text', requerido: true },
  { campo: 'apellidos', label: 'Apellidos', tipo: 'text', requerido: true },
  { campo: 'email', label: 'Correo', tipo: 'email', requerido: true },
  { campo: 'documento', label: 'Documento (opcional)', tipo: 'text', requerido: false },
  { campo: 'celular', label: 'Celular (opcional)', tipo: 'tel', requerido: false },
];

const PresencialForm = ({
  modal,
  usuarios,
  librosDisponibles,
  onChangeFechaDevolucion,
  onChangeModoUsuario,
  onSeleccionarUsuario,
  onCambiarCampoUsuarioNuevo,
  onSeleccionarLibro,
}) => (
  <div className="d-flex flex-column gap-3">
    <div>
      <label className="form-label d-block">¿La persona ya tiene cuenta?</label>
      <div className="btn-group btn-group-sm">
        <button
          type="button"
          className={`btn ${modal.modoUsuario === 'buscar' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => onChangeModoUsuario('buscar')}
        >
          Usuario registrado
        </button>
        <button
          type="button"
          className={`btn ${modal.modoUsuario === 'nuevo' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => onChangeModoUsuario('nuevo')}
        >
          Usuario nuevo
        </button>
      </div>
    </div>

    {modal.modoUsuario === 'buscar' ? (
      modal.usuarioSeleccionado ? (
        <div className="d-flex justify-content-between align-items-center border rounded p-2">
          <div>
            <div className="fw-semibold">{modal.usuarioSeleccionado.nombres} {modal.usuarioSeleccionado.apellidos}</div>
            <div className="small text-muted">
              {modal.usuarioSeleccionado.email}
              {modal.usuarioSeleccionado.documento ? ` · ${modal.usuarioSeleccionado.documento}` : ''}
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-link" onClick={() => onSeleccionarUsuario(null)}>Cambiar</button>
        </div>
      ) : (
        <div>
          <label className="form-label">Buscar por nombre, documento o correo</label>
          <BuscadorSelect
            items={usuarios}
            getKey={(u) => u.id}
            getLabel={(u) => `${u.nombres} ${u.apellidos} — ${u.documento || u.email}`}
            placeholder="Escribe para buscar..."
            onSelect={onSeleccionarUsuario}
          />
        </div>
      )
    ) : (
      <div className="row g-2">
        {CAMPOS_USUARIO_NUEVO.map(({ campo, label, tipo, requerido }) => (
          <div className="col-md-6" key={campo}>
            <label className="form-label">{label}</label>
            <input
              type={tipo}
              className="form-control"
              required={requerido}
              value={modal.usuarioNuevo[campo]}
              onChange={(e) => onCambiarCampoUsuarioNuevo(campo, e.target.value)}
            />
          </div>
        ))}
      </div>
    )}

    <div>
      <label className="form-label">Libro</label>
      {modal.libroSeleccionado ? (
        <div className="d-flex justify-content-between align-items-center border rounded p-2">
          <div className="fw-semibold">{modal.libroSeleccionado.titulo}</div>
          <button type="button" className="btn btn-sm btn-link" onClick={() => onSeleccionarLibro(null)}>Cambiar</button>
        </div>
      ) : (
        <BuscadorSelect
          items={librosDisponibles}
          getKey={(l) => l.id}
          getLabel={(l) => `${l.titulo} (${l.copiasDisponibles} disponibles)`}
          placeholder="Escribe el título..."
          onSelect={onSeleccionarLibro}
        />
      )}
      {librosDisponibles.length === 0 && (
        <small className="text-muted">No hay libros con copias disponibles en este momento.</small>
      )}
    </div>

    <div>
      <label className="form-label">Fecha de devolución estimada</label>
      <input
        type="date"
        className="form-control"
        min={new Date().toISOString().slice(0, 10)}
        value={modal.fechaDevolucionEstimada}
        onChange={(e) => onChangeFechaDevolucion(e.target.value)}
      />
    </div>
  </div>
);

const PrestamoActionModal = ({
  modal,
  procesando,
  usuarios,
  librosDisponibles,
  onClose,
  onChangeObservaciones,
  onChangeFechaDevolucion,
  onChangeModoUsuario,
  onSeleccionarUsuario,
  onCambiarCampoUsuarioNuevo,
  onSeleccionarLibro,
  onConfirm,
}) => {
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

  const deshabilitarConfirmar =
    procesando ||
    (modal.tipo === 'presencial' &&
      (!modal.libroSeleccionado ||
        (modal.modoUsuario === 'buscar' && !modal.usuarioSeleccionado) ||
        (modal.modoUsuario === 'nuevo' && (!modal.usuarioNuevo.nombres || !modal.usuarioNuevo.apellidos || !modal.usuarioNuevo.email))));

  return (
    <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{TITULOS[modal.tipo]}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {modal.tipo === 'presencial' ? (
              <PresencialForm
                modal={modal}
                usuarios={usuarios}
                librosDisponibles={librosDisponibles}
                onChangeFechaDevolucion={onChangeFechaDevolucion}
                onChangeModoUsuario={onChangeModoUsuario}
                onSeleccionarUsuario={onSeleccionarUsuario}
                onCambiarCampoUsuarioNuevo={onCambiarCampoUsuarioNuevo}
                onSeleccionarLibro={onSeleccionarLibro}
              />
            ) : (
              <>
                <p>
                  <strong>{modal.prestamo.libro?.titulo}</strong> — {modal.prestamo.usuario?.nombres} {modal.prestamo.usuario?.apellidos}
                </p>
                {modal.tipo === 'aprobar' && (
                  <div>
                    <label className="form-label">Fecha de devolución estimada</label>
                    <input
                      type="date"
                      className="form-control"
                      min={modal.prestamo.fechaPrestamo}
                      value={modal.fechaDevolucionEstimada}
                      onChange={(e) => onChangeFechaDevolucion(e.target.value)}
                    />
                    <small className="text-muted">No puede ser anterior al día de la solicitud ({modal.prestamo.fechaPrestamo}).</small>
                  </div>
                )}
                {(modal.tipo === 'rechazar' || modal.tipo === 'devolver') && (
                  <div>
                    <label className="form-label">Observaciones (opcional)</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      maxLength={1000}
                      placeholder={modal.tipo === 'rechazar' ? 'Ej: no cumple los requisitos de préstamo' : 'Ej: libro devuelto con daños en la portada'}
                      value={modal.observaciones}
                      onChange={(e) => onChangeObservaciones(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={deshabilitarConfirmar} onClick={onConfirm}>
              {procesando ? 'Guardando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestamoActionModal;

// src/pages/home/components/ResumenPrestamos.jsx
// Contenido de la tarjeta de la columna "login" del inicio cuando ya hay
// sesión iniciada: resumen de préstamos activos y avisos relevantes.
const ResumenPrestamos = ({ user, stats, isStaff, dias }) => (
  <div className="card h-100">
    <div className="card-header bg-white border-bottom">
      <i className="fas fa-chart-simple me-2"></i>Resumen
    </div>
    <div className="card-body">
      <p className="mb-3">Hola, <strong>{user.nombres}</strong>.</p>

      {!stats ? (
        <div className="text-center py-3"><div className="spinner-border spinner-border-sm" role="status"></div></div>
      ) : (
        <div className="d-flex flex-column gap-2">
          <div className="d-flex align-items-center gap-2">
            <i className="fas fa-book-open text-muted"></i>
            <span>Préstamos activos: <strong>{stats.activos}</strong></span>
          </div>

          {stats.pendientesPropios > 0 && (
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-hourglass-half text-muted"></i>
              <span>Solicitudes tuyas por aprobar: <strong>{stats.pendientesPropios}</strong></span>
            </div>
          )}

          {stats.proximaDevolucion && (
            <div className={`alert py-2 px-3 mb-0 small ${dias < 0 ? 'alert-danger' : dias <= 3 ? 'alert-warning' : 'alert-light border'}`}>
              <i className="fas fa-clock me-1"></i>
              {dias < 0
                ? <>Venciste la devolución de <strong>{stats.proximaDevolucion.libro?.titulo}</strong> hace {Math.abs(dias)} día{Math.abs(dias) === 1 ? '' : 's'}.</>
                : dias === 0
                  ? <>Debes devolver <strong>{stats.proximaDevolucion.libro?.titulo}</strong> hoy.</>
                  : <>Debes devolver <strong>{stats.proximaDevolucion.libro?.titulo}</strong> en {dias} día{dias === 1 ? '' : 's'}.</>}
            </div>
          )}

          {isStaff && stats.pendientesStaff > 0 && (
            <div className="alert alert-info py-2 px-3 mb-0 small">
              <i className="fas fa-bell me-1"></i>
              Hay <strong>{stats.pendientesStaff}</strong> préstamo{stats.pendientesStaff === 1 ? '' : 's'} esperando aprobación.
            </div>
          )}

          {stats.activos === 0 && !stats.proximaDevolucion && stats.pendientesPropios === 0 && (!isStaff || !stats.pendientesStaff) && (
            <p className="text-muted small mb-0">No tienes préstamos activos en este momento.</p>
          )}
        </div>
      )}
    </div>
  </div>
);

export default ResumenPrestamos;

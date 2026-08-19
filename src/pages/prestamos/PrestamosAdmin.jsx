import { usePrestamosAdmin } from './hooks/usePrestamosAdmin';
import PrestamoRow from './components/PrestamoRow';
import PrestamoActionModal from './components/PrestamoActionModal';

const PrestamosAdmin = () => {
  const {
    prestamos,
    loading,
    filtro,
    setFiltro,
    procesando,
    modal,
    abrirModal,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    confirmarModal,
  } = usePrestamosAdmin();

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
              <PrestamoRow key={p.id} prestamo={p} onAbrirModal={abrirModal} onVerObservacion={verObservacion} />
            ))}
          </tbody>
        </table>
      )}

      <PrestamoActionModal
        modal={modal}
        procesando={procesando}
        onClose={cerrarModal}
        onChangeObservaciones={cambiarObservaciones}
        onConfirm={confirmarModal}
      />
    </div>
  );
};

export default PrestamosAdmin;

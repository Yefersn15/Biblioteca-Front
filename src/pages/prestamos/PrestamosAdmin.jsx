import { usePrestamosAdmin } from './hooks/usePrestamosAdmin';
import PrestamosAdminFiltros from './components/PrestamosAdminFiltros';
import PrestamoRow from './components/PrestamoRow';
import PrestamoActionModal from './components/PrestamoActionModal';
import { usePaginacion } from '../../hooks/usePaginacion';
import AdminTable from '../../components/AdminTable';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const PrestamosAdmin = () => {
  useAyudaPagina({
    titulo: 'Préstamos (admin)',
    contenido: (
      <>
        <p>Gestiona todas las solicitudes de préstamo: aprobar (define la fecha estimada de devolución), rechazar, o marcar como devuelto.</p>
        <p>Al aprobar se descuenta una copia disponible del libro; al devolver, se suma de nuevo. Si no quedan copias al momento de aprobar, la solicitud se rechaza automáticamente.</p>
        <p>"Registrar préstamo" es para cuando alguien pide el libro en persona en el mostrador: queda aprobado de una vez, sin pasar por "pendiente". Si la persona no tiene cuenta, se le crea una mínima ahí mismo con los datos que indiques.</p>
      </>
    ),
  });
  const {
    prestamos,
    loading,
    filtro,
    setFiltro,
    search,
    setSearch,
    procesando,
    modal,
    usuarios,
    librosDisponibles,
    abrirModal,
    abrirModalPresencial,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    cambiarFechaDevolucion,
    cambiarModoUsuario,
    seleccionarUsuarioPresencial,
    cambiarCampoUsuarioNuevo,
    seleccionarLibroPresencial,
    confirmarModal,
  } = usePrestamosAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(prestamos, 5, [filtro, search]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Préstamos</h2>
        <button type="button" className="btn btn-primary" onClick={abrirModalPresencial}>
          <i className="fas fa-plus me-1"></i>Registrar préstamo
        </button>
      </div>

      <PrestamosAdminFiltros search={search} setSearch={setSearch} filtro={filtro} setFiltro={setFiltro} />

      <AdminTable
        loading={loading}
        isEmpty={prestamos.length === 0}
        emptyMessage="No hay préstamos con ese filtro."
        headers={<><th>Libro</th><th>Solicitante</th><th>Contacto</th><th>Solicitado</th><th>Devolución estimada</th><th>Estado</th><th style={{ width: 260 }}></th></>}
        pagina={pagina}
        totalPaginas={totalPaginas}
        onCambiarPagina={setPagina}
      >
        {itemsPagina.map((p) => (
          <PrestamoRow key={p.id} prestamo={p} onAbrirModal={abrirModal} onVerObservacion={verObservacion} />
        ))}
      </AdminTable>

      <PrestamoActionModal
        modal={modal}
        procesando={procesando}
        usuarios={usuarios}
        librosDisponibles={librosDisponibles}
        onClose={cerrarModal}
        onChangeObservaciones={cambiarObservaciones}
        onChangeFechaDevolucion={cambiarFechaDevolucion}
        onChangeModoUsuario={cambiarModoUsuario}
        onSeleccionarUsuario={seleccionarUsuarioPresencial}
        onCambiarCampoUsuarioNuevo={cambiarCampoUsuarioNuevo}
        onSeleccionarLibro={seleccionarLibroPresencial}
        onConfirm={confirmarModal}
      />
    </div>
  );
};

export default PrestamosAdmin;

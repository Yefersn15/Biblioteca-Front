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
    abrirModal,
    cerrarModal,
    verObservacion,
    cambiarObservaciones,
    cambiarFechaDevolucion,
    confirmarModal,
  } = usePrestamosAdmin();
  const { pagina, setPagina, totalPaginas, itemsPagina } = usePaginacion(prestamos, 5, [filtro, search]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Préstamos</h2>
        <PrestamosAdminFiltros search={search} setSearch={setSearch} filtro={filtro} setFiltro={setFiltro} />
      </div>

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
        onClose={cerrarModal}
        onChangeObservaciones={cambiarObservaciones}
        onChangeFechaDevolucion={cambiarFechaDevolucion}
        onConfirm={confirmarModal}
      />
    </div>
  );
};

export default PrestamosAdmin;

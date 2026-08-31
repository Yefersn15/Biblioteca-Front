// Fila "Tema" (claro/oscuro) reutilizada dentro del menú de preferencias del
// sitio público y del panel admin, para no repetir el mismo par de botones
// en los dos lugares donde vive ese menú.
const SelectorModoOscuro = ({ modoOscuro, toggleModoOscuro }) => (
  <div className="mb-3">
    <div className="small text-muted mb-1">Tema</div>
    <div className="btn-group btn-group-sm w-100">
      <button
        type="button"
        className={`btn ${!modoOscuro ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => modoOscuro && toggleModoOscuro()}
      >
        <i className="fas fa-sun me-1"></i>Claro
      </button>
      <button
        type="button"
        className={`btn ${modoOscuro ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => !modoOscuro && toggleModoOscuro()}
      >
        <i className="fas fa-moon me-1"></i>Oscuro
      </button>
    </div>
  </div>
);

export default SelectorModoOscuro;

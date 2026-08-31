import SelectorModoOscuro from './SelectorModoOscuro';

// Menú de preferencias del sitio público: tema (claro/oscuro) y la vista de
// la página de inicio (clásica o llamativa). Vive en el encabezado, igual
// que el menú equivalente del panel admin (MenuPersonalizarLayout), para no
// tener un botón de tema por un lado y otro control suelto por otro.
const MenuPreferenciasPublico = ({ modoOscuro, toggleModoOscuro, vistaLlamativa, setVistaLlamativa }) => (
  <div className="dropdown">
    <button className="nav-link btn btn-link dropdown-toggle" data-bs-toggle="dropdown" title="Preferencias">
      <i className="fas fa-sliders"></i>
    </button>
    <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 220 }}>
      <SelectorModoOscuro modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />

      <div className="small text-muted mb-1">Vista de inicio</div>
      <div className="btn-group btn-group-sm w-100">
        <button
          type="button"
          className={`btn ${!vistaLlamativa ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setVistaLlamativa(false)}
        >
          <i className="fas fa-list me-1"></i>Clásica
        </button>
        <button
          type="button"
          className={`btn ${vistaLlamativa ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setVistaLlamativa(true)}
        >
          <i className="fas fa-wand-magic-sparkles me-1"></i>Llamativa
        </button>
      </div>
    </div>
  </div>
);

export default MenuPreferenciasPublico;

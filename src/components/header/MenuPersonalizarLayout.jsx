import SelectorModoOscuro from './SelectorModoOscuro';

// Menú de preferencias del panel admin: tema (claro/oscuro) y cómo se ve el
// menú (posición lateral/superior y modo compacto). La posición y el modo
// compacto solo aplican en escritorio (md en adelante) — en móvil siempre se
// usa el menú colapsable — así que esa sección se oculta ahí, pero el tema
// se mantiene visible en cualquier ancho. Todo se guarda en localStorage vía
// useAdminLayoutPrefs/useModoOscuro, así que cada quien lo deja como
// prefiera.
const MenuPersonalizarLayout = ({ modoOscuro, toggleModoOscuro, esLateral, compacto, setPosicion, toggleCompacto }) => (
  <div className="dropdown">
    <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown" title="Preferencias">
      <i className="fas fa-sliders"></i>
    </button>
    <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 220 }}>
      <SelectorModoOscuro modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />

      <div className="d-none d-md-block">
        <div className="small text-muted mb-1">Posición del menú</div>
        <div className="btn-group btn-group-sm w-100 mb-3">
          <button type="button" className={`btn ${esLateral ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPosicion('lateral')}>
            <i className="fas fa-table-columns me-1"></i>Lateral
          </button>
          <button type="button" className={`btn ${!esLateral ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => setPosicion('superior')}>
            <i className="fas fa-bars me-1"></i>Superior
          </button>
        </div>
        <div className="form-check form-switch mb-0">
          <input className="form-check-input" type="checkbox" role="switch" id="switchCompacto" checked={compacto} onChange={toggleCompacto} />
          <label className="form-check-label small" htmlFor="switchCompacto">Solo iconos</label>
        </div>
      </div>
    </div>
  </div>
);

export default MenuPersonalizarLayout;

// Menú para elegir posición (lateral/superior) y modo compacto (solo
// iconos) del panel admin. Se guarda en localStorage vía useAdminLayoutPrefs,
// así que cada quien lo deja como prefiera. Ambas preferencias solo aplican
// en escritorio (md en adelante) — en móvil siempre se usa el menú colapsable.
const MenuPersonalizarLayout = ({ esLateral, compacto, setPosicion, toggleCompacto }) => (
  <div className="dropdown d-none d-md-block">
    <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown" title="Personalizar menú">
      <i className="fas fa-sliders"></i>
    </button>
    <div className="dropdown-menu dropdown-menu-end p-3" style={{ minWidth: 220 }}>
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
);

export default MenuPersonalizarLayout;

// Botón de modo claro/oscuro. Igual en el sitio público (Header.jsx) y en el
// panel admin (AdminLayout.jsx): cada uno le pasa su propia clase para
// combinar con su barra (Bootstrap navbar vs. barra propia del admin).
const ThemeToggleButton = ({ modoOscuro, toggleModoOscuro, className }) => (
  <button
    type="button"
    className={className}
    onClick={toggleModoOscuro}
    title={modoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
  >
    <i className={`fas ${modoOscuro ? 'fa-sun' : 'fa-moon'}`}></i>
  </button>
);

export default ThemeToggleButton;

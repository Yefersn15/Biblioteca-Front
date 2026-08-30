// Ícono de marca (Folio): un libro abierto reducido a dos hojas curvas y un
// pliegue central. Usa currentColor a propósito, igual que el ícono
// genérico que reemplaza, para heredar el color de texto del encabezado
// (cambia con el tema claro/oscuro/personalizado sin necesitar variantes).
const BrandIcon = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 96 96" fill="none" className={className} aria-hidden="true">
    <path
      d="M10 30 C10 25 15 23 21 24.5 L47 32 L47 78 L21 70.5 C15 69 10 66 10 61 Z"
      fill="currentColor"
    />
    <path
      d="M86 30 C86 25 81 23 75 24.5 L49 32 L49 78 L75 70.5 C81 69 86 66 86 61 Z"
      fill="currentColor"
      opacity="0.55"
    />
    <line x1="48" y1="30" x2="48" y2="80" stroke="var(--tema-encabezado, #fff)" strokeWidth="2.5" />
  </svg>
);

export default BrandIcon;

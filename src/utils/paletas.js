// Catálogo de paletas predefinidas para el selector de tema del sitio.
// Cada paleta define 3 colores de marca: fondo (tinte pálido de página),
// encabezado (navbar/sidebar/footer) y acento (botones/enlaces). El texto
// legible sobre cada uno se calcula aparte con `contrasteTexto` (ver color.js).
export const PALETAS = [
  { id: 'oceano', nombre: 'Océano', fondo: '#eef5f9', encabezado: '#0b3d5c', acento: '#1f8fce' },
  { id: 'bosque', nombre: 'Bosque', fondo: '#f1f6ee', encabezado: '#234d35', acento: '#3c9a5c' },
  { id: 'atardecer', nombre: 'Atardecer', fondo: '#fdf3ec', encabezado: '#7a3b2e', acento: '#e8703a' },
  { id: 'grafito', nombre: 'Grafito', fondo: '#f4f4f5', encabezado: '#212529', acento: '#6c63ff' },
  { id: 'lavanda', nombre: 'Lavanda', fondo: '#f7f3fb', encabezado: '#4a2f6b', acento: '#8a5cd6' },
  { id: 'coral', nombre: 'Coral', fondo: '#fdf1f0', encabezado: '#7a2c2c', acento: '#ef6f6f' },
  { id: 'menta', nombre: 'Menta', fondo: '#eefaf6', encabezado: '#0f3d36', acento: '#1fb894' },
  { id: 'arena', nombre: 'Arena', fondo: '#f8f4ec', encabezado: '#5c4326', acento: '#c8945a' },
];

export const obtenerPaleta = (id) => PALETAS.find((p) => p.id === id) || null;

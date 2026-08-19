import { contrasteTexto } from './color';
import { obtenerPaleta } from './paletas';

// Colores neutros usados cuando no hay tema personalizado ("lienzo en blanco").
const TEMA_NEUTRO = { fondo: '#ffffff', encabezado: '#ffffff', acento: '#0d6efd' };

// Resuelve el `tema` guardado en Configuracion ({modo, paletaId, colores}) a un
// objeto completo con los 3 colores de marca + su texto legible calculado.
// Siempre devuelve una forma completa: 'NINGUNO' (o un `tema` todavía sin
// cargar) simplemente resuelve al set neutro, sin ser un caso especial para
// quien consume el resultado.
export const resolverTema = (tema) => {
  let base = TEMA_NEUTRO;

  if (tema?.modo === 'PREDEFINIDO' && tema.paletaId) {
    const paleta = obtenerPaleta(tema.paletaId);
    if (paleta) base = paleta;
  } else if (tema?.modo === 'PERSONALIZADO' && tema.colores) {
    base = tema.colores;
  }

  return {
    fondo: base.fondo,
    fondoTexto: contrasteTexto(base.fondo),
    encabezado: base.encabezado,
    encabezadoTexto: contrasteTexto(base.encabezado),
    acento: base.acento,
    acentoTexto: contrasteTexto(base.acento),
  };
};

// Aplica el tema resuelto como variables CSS en :root, consumidas por index.css.
export const aplicarTemaCss = (temaResuelto) => {
  const root = document.documentElement.style;
  root.setProperty('--tema-fondo', temaResuelto.fondo);
  root.setProperty('--tema-fondo-texto', temaResuelto.fondoTexto);
  root.setProperty('--tema-encabezado', temaResuelto.encabezado);
  root.setProperty('--tema-encabezado-texto', temaResuelto.encabezadoTexto);
  root.setProperty('--tema-acento', temaResuelto.acento);
  root.setProperty('--tema-acento-texto', temaResuelto.acentoTexto);
};

import { contrasteTexto } from './color';
import { obtenerPaleta } from './paletas';
import { TEMA_OSCURO_BASE } from './temaOscuro';

// Colores neutros usados cuando no hay tema personalizado ("lienzo en blanco").
const TEMA_NEUTRO = {
  fondo: '#ffffff',
  superficie: '#ffffff',
  encabezado: '#ffffff',
  acento: '#0d6efd',
  secundario: '#6c757d', // gris secundario por defecto de Bootstrap
};

// Resuelve el `tema` guardado en Configuracion ({modo, paletaId, colores}) +
// el modo oscuro (preferencia del visitante, no se guarda en el sitio) a un
// objeto completo con los 5 colores de marca + su texto legible calculado.
// El modo oscuro reemplaza fondo/superficie/encabezado por una paleta gris
// fija y profesional, pero mantiene el acento/secundario de la paleta de
// marca elegida — así el sitio se ve oscuro sin perder su identidad.
export const resolverTema = (tema, modoOscuro = false) => {
  let base = TEMA_NEUTRO;

  if (tema?.modo === 'PREDEFINIDO' && tema.paletaId) {
    const paleta = obtenerPaleta(tema.paletaId);
    if (paleta) base = paleta;
  } else if (tema?.modo === 'PERSONALIZADO' && tema.colores) {
    base = tema.colores;
  }

  const colores = modoOscuro
    ? { ...base, fondo: TEMA_OSCURO_BASE.fondo, superficie: TEMA_OSCURO_BASE.superficie, encabezado: TEMA_OSCURO_BASE.encabezado }
    : base;

  return {
    fondo: colores.fondo,
    fondoTexto: contrasteTexto(colores.fondo),
    superficie: colores.superficie,
    superficieTexto: contrasteTexto(colores.superficie),
    encabezado: colores.encabezado,
    encabezadoTexto: contrasteTexto(colores.encabezado),
    acento: colores.acento,
    acentoTexto: contrasteTexto(colores.acento),
    secundario: colores.secundario,
    secundarioTexto: contrasteTexto(colores.secundario),
  };
};

// Aplica el tema resuelto como variables CSS en :root, consumidas por index.css.
export const aplicarTemaCss = (temaResuelto) => {
  const root = document.documentElement.style;
  root.setProperty('--tema-fondo', temaResuelto.fondo);
  root.setProperty('--tema-fondo-texto', temaResuelto.fondoTexto);
  root.setProperty('--tema-superficie', temaResuelto.superficie);
  root.setProperty('--tema-superficie-texto', temaResuelto.superficieTexto);
  root.setProperty('--tema-encabezado', temaResuelto.encabezado);
  root.setProperty('--tema-encabezado-texto', temaResuelto.encabezadoTexto);
  root.setProperty('--tema-acento', temaResuelto.acento);
  root.setProperty('--tema-acento-texto', temaResuelto.acentoTexto);
  root.setProperty('--tema-secundario', temaResuelto.secundario);
  root.setProperty('--tema-secundario-texto', temaResuelto.secundarioTexto);
};

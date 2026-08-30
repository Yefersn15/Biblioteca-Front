// src/pages/banners/hooks/bannerTemplates.js
// Plantillas fijas de collage. `areas`/`cols`/`rows`/`maxWidth` solo se usan
// cuando el contenido es "Imágenes personalizadas" (`areas` usa
// grid-template-areas con letras a, b, c... asignadas en orden a cada
// casilla; `maxWidth` limita el ancho con el que se sube cada imagen a
// Cloudinary, más chico entre más casillas tiene la plantilla).
//
// Para contenido "vivo" (autores), esa cuadrícula NO se usa para el tamaño
// de cada casilla — cada una respeta su propia proporción real (foto
// cuadrada, ver BannerCollage) y solo se toman `slots` (cuántas) y
// `featuredSlot` (cuál se ve más grande) de la plantilla elegida.
export const BANNER_TEMPLATES = [
  {
    key: 'single',
    label: 'Imagen única',
    slots: 1,
    areas: '"a"',
    cols: '1fr',
    rows: '1fr',
    maxWidth: 1600,
    featuredSlot: 0,
  },
  {
    key: 'duo',
    label: 'Dos imágenes',
    slots: 2,
    areas: '"a b"',
    cols: '1fr 1fr',
    rows: '1fr',
    maxWidth: 1300,
    featuredSlot: 0,
  },
  {
    key: 'trio',
    label: 'Una grande + dos',
    slots: 3,
    areas: '"a b" "a c"',
    cols: '1.4fr 1fr',
    rows: '1fr 1fr',
    maxWidth: 1000,
    featuredSlot: 0,
  },
  {
    key: 'grid-4',
    label: 'Cuadrícula 2x2',
    slots: 4,
    areas: '"a b" "c d"',
    cols: '1fr 1fr',
    rows: '1fr 1fr',
    maxWidth: 1000,
    featuredSlot: 0,
  },
  {
    key: 'grid-6',
    label: 'Cuadrícula 3x2',
    slots: 6,
    areas: '"a b c" "d e f"',
    cols: '1fr 1fr 1fr',
    rows: '1fr 1fr',
    maxWidth: 700,
    featuredSlot: 0,
  },
  {
    key: 'mosaic-8',
    label: 'Mosaico 4x2',
    slots: 8,
    areas: '"a b c d" "e f g h"',
    cols: '1fr 1fr 1fr 1fr',
    rows: '1fr 1fr',
    maxWidth: 700,
    featuredSlot: 0,
  },
  {
    key: 'big-4',
    label: '1 grande + 4 pequeños',
    slots: 5,
    areas: '"a b c" "a d e"',
    cols: '1.3fr 1fr 1fr',
    rows: '1fr 1fr',
    maxWidth: 900,
    featuredSlot: 0,
  },
  {
    key: 'duo-big-right',
    label: '2 a la izquierda + 1 grande',
    slots: 3,
    areas: '"a c" "b c"',
    cols: '1fr 1.3fr',
    rows: '1fr 1fr',
    maxWidth: 1000,
    featuredSlot: 2,
  },
  {
    key: 'row-5',
    label: '5 imágenes',
    slots: 5,
    areas: '"a b c d e"',
    cols: '1fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    maxWidth: 700,
    featuredSlot: 0,
  },
  {
    key: 'shelf-4',
    label: 'Fila de 4',
    slots: 4,
    areas: '"a b c d"',
    cols: '1fr 1fr 1fr 1fr',
    rows: '1fr',
    maxWidth: 500,
    featuredSlot: 0,
  },
  {
    key: 'shelf-6',
    label: 'Fila de 6',
    slots: 6,
    areas: '"a b c d e f"',
    cols: '1fr 1fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    maxWidth: 380,
    featuredSlot: 0,
  },
  {
    key: 'shelf-featured-4',
    label: '1 destacado + fila de 4',
    slots: 5,
    areas: '"a b c d e"',
    cols: '1.6fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    maxWidth: 500,
    featuredSlot: 0,
  },
  {
    key: 'shelf-featured-6',
    label: '1 destacado + fila de 6',
    slots: 7,
    areas: '"a b c d e f g"',
    cols: '1.6fr 1fr 1fr 1fr 1fr 1fr 1fr',
    rows: '1fr',
    maxWidth: 380,
    featuredSlot: 0,
  },
];

export const SLOT_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const getTemplate = (key) => BANNER_TEMPLATES.find(t => t.key === key) || BANNER_TEMPLATES[0];

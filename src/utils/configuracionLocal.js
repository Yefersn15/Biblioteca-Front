// src/utils/configuracionLocal.js
// La configuración de apariencia de la biblioteca (nombre, logo, contacto,
// horario, tema) vive solo en el navegador de quien la edita (localStorage),
// no en el backend: así un cambio malicioso o de mal gusto en el diseño no
// se propaga a todos los visitantes del sitio.
const CLAVE_STORAGE = 'biblioteca:configuracion';

export const DEFECTO = {
  nombreInstitucion: 'Biblioteca Web',
  logoUrl: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  email: '',
  horario: [],
  mapaEmbedUrl: '',
  tema: { modo: 'NINGUNO', paletaId: null, colores: null },
};

export const leerConfigLocal = () => {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? { ...DEFECTO, ...JSON.parse(guardado) } : DEFECTO;
  } catch {
    return DEFECTO;
  }
};

export const guardarConfigLocal = (config) => {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(config));
};

// src/validations/isbn.js
// Validación de formato (no de dígito verificador): ISBN-10 o ISBN-13,
// ignorando guiones y espacios que la gente suele escribir al copiarlo.
// El campo es opcional, así que una cadena vacía siempre se considera válida.
export const isbnEsValido = (valor) => {
  if (!valor?.trim()) return true;
  const limpio = valor.replace(/[-\s]/g, '');
  return /^\d{9}[\dXx]$/.test(limpio) || /^\d{13}$/.test(limpio);
};

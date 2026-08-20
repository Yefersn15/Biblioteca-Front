import { useState, useEffect } from 'react';

const STORAGE_KEY = 'modoOscuro';

// Preferencia de modo claro/oscuro de quien visita el sitio (no es una
// configuración del admin: cada navegador guarda la suya en localStorage,
// igual que useAdminLayoutPrefs pero para esta sola preferencia).
export const useModoOscuro = () => {
  const [modoOscuro, setModoOscuro] = useState(() => localStorage.getItem(STORAGE_KEY) === '1');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, modoOscuro ? '1' : '0');
  }, [modoOscuro]);

  return { modoOscuro, toggleModoOscuro: () => setModoOscuro((m) => !m) };
};

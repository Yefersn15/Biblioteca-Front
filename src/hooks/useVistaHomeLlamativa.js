import { useState, useEffect } from 'react';

const STORAGE_KEY = 'home:vistaLlamativa';

// Preferencia de cómo se ve la página de inicio (clásica o llamativa, con
// carruseles en los bordes). Vive en Layout —junto al modo oscuro— porque el
// control está en el encabezado, visible en todas las páginas; Home la lee
// mediante el contexto del <Outlet> en vez de tener su propio estado.
export const useVistaHomeLlamativa = () => {
  const [vistaLlamativa, setVistaLlamativa] = useState(() => localStorage.getItem(STORAGE_KEY) === '1');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, vistaLlamativa ? '1' : '0');
  }, [vistaLlamativa]);

  return { vistaLlamativa, setVistaLlamativa };
};

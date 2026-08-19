import { useState, useEffect } from 'react';

const STORAGE_KEY = 'adminLayoutPrefs';

const leerGuardado = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

// Preferencia de cómo se ve el menú del panel de administración: en el
// costado o arriba, y con o sin texto junto a los iconos. Se guarda en
// localStorage para que cada quien lo deje como prefiera entre sesiones.
export const useAdminLayoutPrefs = () => {
  const [posicion, setPosicionState] = useState(() => leerGuardado().posicion || 'lateral');
  const [compacto, setCompactoState] = useState(() => leerGuardado().compacto || false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ posicion, compacto }));
  }, [posicion, compacto]);

  return {
    posicion,
    compacto,
    setPosicion: setPosicionState,
    toggleCompacto: () => setCompactoState((c) => !c),
  };
};

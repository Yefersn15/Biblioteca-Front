import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { resolverTema, aplicarTemaCss } from '../utils/tema';
import { useModoOscuro } from '../hooks/useModoOscuro';
import { DEFECTO, leerConfigLocal } from '../utils/configuracionLocal';

const ConfiguracionContext = createContext(DEFECTO);

export const ConfiguracionProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFECTO);
  const [loading, setLoading] = useState(true);

  const recargar = () => {
    setConfig(leerConfigLocal());
    return Promise.resolve();
  };

  useEffect(() => {
    recargar().finally(() => setLoading(false));
  }, []);

  const { modoOscuro, toggleModoOscuro } = useModoOscuro();

  const temaResuelto = useMemo(() => resolverTema(config.tema, modoOscuro), [config.tema, modoOscuro]);

  useEffect(() => {
    aplicarTemaCss(temaResuelto);
  }, [temaResuelto]);

  return (
    <ConfiguracionContext.Provider value={{ ...config, loading, recargar, temaResuelto, modoOscuro, toggleModoOscuro }}>
      {children}
    </ConfiguracionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- hook co-ubicado a propósito con su Provider
export const useConfiguracion = () => useContext(ConfiguracionContext);

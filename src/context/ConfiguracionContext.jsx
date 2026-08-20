import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getConfiguracion } from '../services/api/configuracion.api';
import { resolverTema, aplicarTemaCss } from '../utils/tema';
import { useModoOscuro } from '../hooks/useModoOscuro';

const DEFECTO = {
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

const ConfiguracionContext = createContext(DEFECTO);

export const ConfiguracionProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFECTO);
  const [loading, setLoading] = useState(true);

  const recargar = () => getConfiguracion().then(setConfig).catch(() => setConfig(DEFECTO));

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

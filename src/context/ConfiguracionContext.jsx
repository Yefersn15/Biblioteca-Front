import { createContext, useContext, useState, useEffect } from 'react';
import { getConfiguracion } from '../services/api/configuracion.api';

const DEFECTO = {
  nombreInstitucion: 'Biblioteca Web',
  logoUrl: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  email: '',
  horario: [],
  mapaEmbedUrl: '',
  colorPrimario: '',
};

const ConfiguracionContext = createContext(DEFECTO);

export const ConfiguracionProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFECTO);
  const [loading, setLoading] = useState(true);

  const recargar = () => getConfiguracion().then(setConfig).catch(() => setConfig(DEFECTO));

  useEffect(() => {
    recargar().finally(() => setLoading(false));
  }, []);

  return (
    <ConfiguracionContext.Provider value={{ ...config, loading, recargar }}>
      {children}
    </ConfiguracionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- hook co-ubicado a propósito con su Provider
export const useConfiguracion = () => useContext(ConfiguracionContext);

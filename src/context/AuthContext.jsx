import { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../services/api/auth.api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuarioGuardado = localStorage.getItem('usuario');
    if (token && usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
      // Verifica que el token siga siendo válido y refresca los datos del usuario.
      authApi
        .obtenerPerfil()
        .then((usuario) => {
          setUser(usuario);
          localStorage.setItem('usuario', JSON.stringify(usuario));
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { usuario, token } = await authApi.login(email, password);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUser(usuario);
    return usuario;
  };

  const registrar = async (datos) => {
    const { usuario, token } = await authApi.registrar(datos);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setUser(usuario);
    return usuario;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUser(null);
  };

  const actualizarUsuarioLocal = (usuario) => {
    setUser(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const isStaff = user && ['ADMIN', 'BIBLIOTECARIO'].includes(user.rol);
  const isAdmin = user?.rol === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{ user, loading, login, registrar, logout, actualizarUsuarioLocal, isStaff, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- hook co-ubicado a propósito con su Provider
export const useAuth = () => useContext(AuthContext);

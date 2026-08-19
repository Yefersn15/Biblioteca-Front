import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// requireGuest: solo para /login y /registro, redirige si ya hay sesión.
// staffOnly: exige rol ADMIN o BIBLIOTECARIO además de sesión iniciada.
const PrivateRoute = ({ children, requireGuest, staffOnly }) => {
  const { user, isStaff, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (requireGuest) {
    if (!user) return children;
    // El staff siempre entra por el panel de administración; a un usuario
    // normal se le devuelve a la página desde la que lo mandamos a loguearse.
    if (isStaff) return <Navigate to="/admin" replace />;
    return <Navigate to={location.state?.from?.pathname || '/'} replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (staffOnly && !isStaff) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

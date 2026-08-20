// src/pages/home/hooks/useHomeLoginCard.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getPrestamos } from '../../../services/api/prestamos.api';

const hoyISO = () => new Date().toISOString().slice(0, 10);
const diasHasta = (fechaISO) => Math.ceil((new Date(fechaISO) - new Date(hoyISO())) / 86400000);

// Estado de la columna "login" del inicio (al estilo Proyecto_Six): sin sesión,
// deja ingresar sin salir del Home. Con sesión, en vez de repetir accesos que
// ya están en el desplegable del navbar, arma un resumen de préstamos activos,
// recordatorio de devolución próxima/vencida y, para el staff, cuántas
// solicitudes están pendientes de revisar.
export const useHomeLoginCard = () => {
  const { user, login, isStaff } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;
    const peticiones = [getPrestamos({ limit: 100 })];
    if (isStaff) peticiones.push(getPrestamos({ estado: 'PENDIENTE', limit: 1 }));

    Promise.all(peticiones).then(([propios, pendientesStaff]) => {
      const activos = propios.items.filter((p) => p.estado === 'APROBADO');
      const proximaDevolucion = activos
        .slice()
        .sort((a, b) => new Date(a.fechaDevolucionEstimada) - new Date(b.fechaDevolucionEstimada))[0];

      setStats({
        activos: activos.length,
        proximaDevolucion,
        pendientesPropios: propios.items.filter((p) => p.estado === 'PENDIENTE').length,
        pendientesStaff: pendientesStaff?.pagination.total,
      });
    });
  }, [user, isStaff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const usuario = await login(email, password);
      if (['ADMIN', 'BIBLIOTECARIO'].includes(usuario.rol)) navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const dias = stats?.proximaDevolucion ? diasHasta(stats.proximaDevolucion.fechaDevolucionEstimada) : null;

  return {
    user,
    isStaff,
    stats,
    dias,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
};

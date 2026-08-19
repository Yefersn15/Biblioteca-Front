// src/pages/dashboard/hooks/useDashboard.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  getResumenLibros,
  getResumenAutores,
  getResumenEditoriales,
  getResumenCategorias,
  getResumenPrestamos,
  getResumenUsuarios,
  getEstadisticasResumen,
} from '../services/dashboardService';

const total = (respuesta) => respuesta.pagination.total;
export const diasVencido = (fechaISO) => Math.floor((new Date() - new Date(fechaISO)) / 86400000);

export const useDashboard = () => {
  const { isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [vencidos, setVencidos] = useState(null);

  useEffect(() => {
    const peticiones = [
      getResumenLibros({ limit: 1 }),
      getResumenAutores({ limit: 1 }),
      getResumenEditoriales({ limit: 1 }),
      getResumenCategorias({ limit: 1 }),
      getResumenPrestamos({ limit: 1, estado: 'APROBADO' }),
      getResumenPrestamos({ limit: 1, estado: 'PENDIENTE' }),
      getResumenLibros({ limit: 1, agotados: true }),
    ];
    if (isAdmin) peticiones.push(getResumenUsuarios({ limit: 1 }));

    Promise.all(peticiones).then(([libros, autores, editoriales, categorias, activos, pendientes, agotados, usuarios]) => {
      setStats({
        libros: total(libros),
        autores: total(autores),
        editoriales: total(editoriales),
        categorias: total(categorias),
        activos: total(activos),
        pendientes: total(pendientes),
        agotados: total(agotados),
        usuarios: usuarios ? total(usuarios) : null,
      });
    });

    getEstadisticasResumen().then(setResumen);
    getResumenPrestamos({ vencidos: true, limit: 20 }).then(({ items }) => setVencidos(items));
  }, [isAdmin]);

  return { isAdmin, stats, resumen, vencidos };
};

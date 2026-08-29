// src/hooks/usePaginacion.js
import { useState, useEffect, useMemo } from 'react';

// Paginación en cliente sobre una lista ya cargada. `resetDeps` son los
// valores (filtros, búsqueda) que al cambiar deben volver a la página 1.
export const usePaginacion = (items, pageSize = 5, resetDeps = []) => {
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    setPagina(1);
  }, resetDeps);

  const totalPaginas = Math.max(1, Math.ceil(items.length / pageSize));

  useEffect(() => {
    if (pagina > totalPaginas) setPagina(totalPaginas);
  }, [totalPaginas, pagina]);

  const itemsPagina = useMemo(() => {
    const inicio = (pagina - 1) * pageSize;
    return items.slice(inicio, inicio + pageSize);
  }, [items, pagina, pageSize]);

  return { pagina, setPagina, totalPaginas, itemsPagina };
};

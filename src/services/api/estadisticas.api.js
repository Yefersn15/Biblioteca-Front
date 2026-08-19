import client from './client';

export const getResumenEstadisticas = () =>
  client.get('/estadisticas/resumen').then((r) => r.data.data);

import client from './client';

export const getConfiguracion = () => client.get('/configuracion').then((r) => r.data.data);

export const actualizarConfiguracion = (data) =>
  client.put('/configuracion', data).then((r) => r.data.data);

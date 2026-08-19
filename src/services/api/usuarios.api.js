import client from './client';

export const getUsuarios = (params) =>
  client.get('/usuarios', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getUsuario = (id) => client.get(`/usuarios/${id}`).then((r) => r.data.data);

export const crearUsuario = (data) => client.post('/usuarios', data).then((r) => r.data.data);

export const actualizarUsuario = (id, data) => client.put(`/usuarios/${id}`, data).then((r) => r.data.data);

export const eliminarUsuario = (id) => client.delete(`/usuarios/${id}`).then((r) => r.data);

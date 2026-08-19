import client from './client';

export const getLibros = (params) =>
  client.get('/libros', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getLibro = (id) => client.get(`/libros/${id}`).then((r) => r.data.data);

export const getLibrosPopulares = (limit = 6) =>
  client.get('/libros/populares', { params: { limit } }).then((r) => r.data.data);

export const crearLibro = (data) => client.post('/libros', data).then((r) => r.data.data);

export const actualizarLibro = (id, data) => client.put(`/libros/${id}`, data).then((r) => r.data.data);

export const eliminarLibro = (id) => client.delete(`/libros/${id}`).then((r) => r.data);

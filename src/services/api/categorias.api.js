import client from './client';

export const getAll = (params) =>
  client.get('/categorias', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getById = (id) => client.get(`/categorias/${id}`).then((r) => r.data.data);

export const create = (data) => client.post('/categorias', data).then((r) => r.data.data);

export const update = (id, data) => client.put(`/categorias/${id}`, data).then((r) => r.data.data);

export const remove = (id) => client.delete(`/categorias/${id}`).then((r) => r.data);

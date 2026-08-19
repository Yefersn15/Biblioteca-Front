import client from './client';

export const getAll = (params) =>
  client.get('/autores', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getById = (id) => client.get(`/autores/${id}`).then((r) => r.data.data);

export const create = (data) => client.post('/autores', data).then((r) => r.data.data);

export const update = (id, data) => client.put(`/autores/${id}`, data).then((r) => r.data.data);

export const remove = (id) => client.delete(`/autores/${id}`).then((r) => r.data);

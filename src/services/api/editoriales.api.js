import client from './client';

export const getAll = (params) =>
  client.get('/editoriales', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getById = (id) => client.get(`/editoriales/${id}`).then((r) => r.data.data);

export const create = (data) => client.post('/editoriales', data).then((r) => r.data.data);

export const update = (id, data) => client.put(`/editoriales/${id}`, data).then((r) => r.data.data);

export const remove = (id) => client.delete(`/editoriales/${id}`).then((r) => r.data);

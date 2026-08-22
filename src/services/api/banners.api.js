import client from './client';

// getBanners devuelve el arreglo de banners directamente (no la envoltura de
// paginación) porque así lo consumen bannersService.js y useBannersAdmin.js.
export const getBanners = (params = {}) =>
  client.get('/banners', { params: { limit: 100, ...params } }).then((r) => r.data.data);

export const createBanner = (data) => client.post('/banners', data).then((r) => r.data.data);

export const updateBanner = (id, data) => client.put(`/banners/${id}`, data).then((r) => r.data.data);

export const deleteBanner = (id) => client.delete(`/banners/${id}`).then((r) => r.data);

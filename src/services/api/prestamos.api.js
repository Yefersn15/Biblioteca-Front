import client from './client';

export const getPrestamos = (params) =>
  client.get('/prestamos', { params }).then((r) => ({ items: r.data.data, pagination: r.data.pagination }));

export const getPrestamo = (id) => client.get(`/prestamos/${id}`).then((r) => r.data.data);

export const solicitarPrestamo = (data) => client.post('/prestamos', data).then((r) => r.data.data);

export const registrarPrestamoPresencial = (data) => client.post('/prestamos/presencial', data).then((r) => r.data.data);

export const aprobarPrestamo = (id, fechaDevolucionEstimada) =>
  client.put(`/prestamos/${id}/aprobar`, { fechaDevolucionEstimada }).then((r) => r.data.data);

export const rechazarPrestamo = (id, observaciones) =>
  client.put(`/prestamos/${id}/rechazar`, { observaciones }).then((r) => r.data.data);

export const devolverPrestamo = (id, observaciones) =>
  client.put(`/prestamos/${id}/devolver`, { observaciones }).then((r) => r.data.data);

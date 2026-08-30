import client from './client';

export const login = (email, password) =>
  client.post('/auth/login', { email, password }).then((r) => r.data.data);

export const registrar = (datos) =>
  client.post('/auth/registro', datos).then((r) => r.data.data);

export const obtenerPerfil = () =>
  client.get('/auth/perfil').then((r) => r.data.data);

export const solicitarRecuperacion = (email) =>
  client.post('/auth/forgot-password', { email }).then((r) => r.data.data);

export const verificarToken = (email, token) =>
  client.post('/auth/verify-token', { email, token }).then((r) => r.data.data);

export const restablecerPassword = (email, token, password) =>
  client.post('/auth/reset-password', { email, token, password }).then((r) => r.data.data);

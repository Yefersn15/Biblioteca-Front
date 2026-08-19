import client from './client';

export const login = (email, password) =>
  client.post('/auth/login', { email, password }).then((r) => r.data.data);

export const registrar = (datos) =>
  client.post('/auth/registro', datos).then((r) => r.data.data);

export const obtenerPerfil = () =>
  client.get('/auth/perfil').then((r) => r.data.data);

export const solicitarRecuperacion = (email) =>
  client.post('/auth/forgot-password', { email }).then((r) => r.data.data);

export const verificarCodigo = (email, codigo) =>
  client.post('/auth/verify-code', { email, codigo }).then((r) => r.data.data);

export const restablecerPassword = (email, codigo, password) =>
  client.post('/auth/reset-password', { email, codigo, password }).then((r) => r.data.data);

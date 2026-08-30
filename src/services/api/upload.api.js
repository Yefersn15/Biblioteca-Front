import client from './client';

export const uploadImagen = (file, folder = 'general') => {
  const formData = new FormData();
  formData.append('imagen', file);
  formData.append('folder', folder);
  return client
    .post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data.data);
};

// Sin sesión: solo para la foto de perfil en el registro público (todavía no
// hay token en ese momento). El backend fuerza la carpeta "avatares" y limita
// muchas menos subidas por IP que la ruta autenticada (ver upload.routes.js).
export const uploadAvatarPublico = (file) => {
  const formData = new FormData();
  formData.append('imagen', file);
  return client
    .post('/upload/publico/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data.data);
};

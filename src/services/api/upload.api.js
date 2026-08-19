import client from './client';

export const uploadImagen = (file, folder = 'general') => {
  const formData = new FormData();
  formData.append('imagen', file);
  formData.append('folder', folder);
  return client
    .post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data.data);
};

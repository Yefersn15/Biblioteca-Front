// src/pages/banners/hooks/useBannerForm.js
import { useState } from 'react';
import { getTemplate } from './bannerTemplates';

const TIPOS_CON_REFIDS = ['LIBROS', 'AUTORES', 'EDITORIALES', 'CATEGORIAS'];
const NOMBRE_REFIDS = { LIBROS: 'libro(s)', AUTORES: 'autor(es)', EDITORIALES: 'editorial(es)', CATEGORIAS: 'categoría(s)' };

const FORM_INICIAL = {
  layout: 'single',
  contentType: 'IMAGENES',
  images: [{ slot: 0, url: '' }],
  origen: null,
  origenId: null,
  refIds: [],
  titulo: '',
  texto: '',
  textPosition: 'none',
  displayOrder: 0,
  estado: true,
};

export const useBannerForm = (initialData) => {
  const [form, setForm] = useState(initialData || FORM_INICIAL);
  const [errors, setErrors] = useState({});

  const setLayout = (layout) => {
    const slots = getTemplate(layout).slots;
    setForm(prev => {
      const images = Array.from({ length: slots }, (_, i) => prev.images[i] || { slot: i, url: '' });
      const refIds = prev.refIds.slice(0, slots);
      return { ...prev, layout, images, refIds };
    });
  };

  const setImageUrl = (slotIndex, url) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === slotIndex ? { ...img, url } : img)),
    }));
  };

  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Cambiar el tipo de contenido (o, en "Populares", de dónde salen los
  // libros) reinicia la selección: mezclar ids de libros con ids de autores,
  // por ejemplo, no tiene sentido.
  const setContentType = (contentType) => setForm(prev => ({ ...prev, contentType, origen: null, origenId: null, refIds: [] }));
  const setOrigen = (origen) => setForm(prev => ({ ...prev, origen, origenId: null }));

  const validate = () => {
    const newErrors = {};
    const slots = getTemplate(form.layout).slots;

    if (form.contentType === 'IMAGENES') {
      if (form.images.some(img => !img.url?.trim())) {
        newErrors.images = 'Todas las casillas de imagen deben tener una URL';
      }
    } else if (TIPOS_CON_REFIDS.includes(form.contentType)) {
      if (form.refIds.length !== slots) {
        newErrors.refIds = `Selecciona ${slots} ${NOMBRE_REFIDS[form.contentType]}`;
      }
    } else if (form.contentType === 'POPULARES') {
      if (!form.origen) newErrors.origen = 'Elige si los libros populares son de una categoría, un autor o una editorial';
      else if (!form.origenId) newErrors.origenId = 'Elige de cuál';
    }

    if (form.textPosition !== 'none' && !form.titulo?.trim() && !form.texto?.trim()) {
      newErrors.texto = 'Agrega un título o texto, o elige "Sin texto"';
    }
    setErrors(newErrors);
    return newErrors;
  };

  return { form, setForm, errors, setLayout, setImageUrl, setField, setContentType, setOrigen, validate };
};

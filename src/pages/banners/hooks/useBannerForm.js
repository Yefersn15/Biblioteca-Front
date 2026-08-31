// src/pages/banners/hooks/useBannerForm.js
import { useState } from 'react';
import { getTemplate } from './bannerTemplates';

const TIPOS_CON_REFIDS = ['AUTORES'];
const NOMBRE_REFIDS = { AUTORES: 'autor(es)' };

const FORM_INICIAL = {
  layout: 'single',
  contentType: 'IMAGENES',
  images: [{ slot: 0, url: '', publicId: null }],
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
      const images = Array.from({ length: slots }, (_, i) => prev.images[i] || { slot: i, url: '', publicId: null });
      const refIds = prev.refIds.slice(0, slots);
      return { ...prev, layout, images, refIds };
    });
  };

  const setImageUrl = (slotIndex, url, publicId = null) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === slotIndex ? { ...img, url, publicId } : img)),
    }));
  };

  const setField = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Cambiar el tipo de contenido reinicia la selección de referencias:
  // mezclar ids de un tipo con otro no tiene sentido.
  const setContentType = (contentType) => setForm(prev => ({ ...prev, contentType, refIds: [] }));

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
    }

    if (form.textPosition !== 'none' && !form.titulo?.trim() && !form.texto?.trim()) {
      newErrors.texto = 'Agrega un título o texto, o elige "Sin texto"';
    }
    setErrors(newErrors);
    return newErrors;
  };

  return { form, setForm, errors, setLayout, setImageUrl, setField, setContentType, validate };
};

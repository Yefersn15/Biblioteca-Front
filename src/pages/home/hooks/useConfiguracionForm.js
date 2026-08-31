// src/pages/home/hooks/useConfiguracionForm.js
import { useState, useEffect, useRef } from 'react';
import { useConfiguracion } from '../../../context/ConfiguracionContext';
import { guardarConfigLocal } from '../../../utils/configuracionLocal';
import { useToast } from '../../../context/ToastContext';

// Estado local del FORMULARIO de edición de configuración (precargado desde el
// contexto global de configuración una vez termina de cargar). No duplica el
// estado global: solo lo copia a un borrador editable y, al guardar, pide al
// contexto que se recargue con los datos ya persistidos.
export const useConfiguracionForm = () => {
  const config = useConfiguracion();
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    if (!config.loading) {
      setForm({
        nombreInstitucion: config.nombreInstitucion || '',
        logoUrl: config.logoUrl || '',
        descripcion: config.descripcion || '',
        direccion: config.direccion || '',
        telefono: config.telefono || '',
        email: config.email || '',
        horario: config.horario?.length ? config.horario : [],
        mapaEmbedUrl: config.mapaEmbedUrl || '',
        tema: config.tema || { modo: 'NINGUNO', paletaId: null, colores: null },
      });
    }
  }, [config.loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const resuelto = await logoRef.current?.resolverPendiente();
      if (resuelto?.ok === false) {
        setGuardando(false);
        return;
      }
      const formFinal = resuelto?.changed ? { ...form, logoUrl: resuelto.url } : form;
      guardarConfigLocal(formFinal);
      await config.recargar();
      toast.success('Configuración actualizada (guardada en este navegador)');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return { form, setForm, guardando, handleSubmit, logoRef };
};

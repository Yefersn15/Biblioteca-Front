// src/pages/home/hooks/useConfiguracionForm.js
import { useState, useEffect, useRef } from 'react';
import { useConfiguracion } from '../../../context/ConfiguracionContext';
import { guardarConfigLocal } from '../../../utils/configuracionLocal';
import { useToast } from '../../../context/ToastContext';

export const TOTAL_PASOS = 3;

// Estado local del FORMULARIO de edición de configuración (precargado desde el
// contexto global de configuración una vez termina de cargar). No duplica el
// estado global: solo lo copia a un borrador editable y, al guardar, pide al
// contexto que se recargue con los datos ya persistidos.
export const useConfiguracionForm = () => {
  const config = useConfiguracion();
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [paso, setPaso] = useState(1);
  // Igual que en los wizards de SISGEM (useRegisterForm/useUsuarioForm):
  // recién tras un intento de avanzar con el paso inválido se muestra el
  // error debajo del campo.
  const [pasosConIntento, setPasosConIntento] = useState({});
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

  // Único campo realmente obligatorio de toda la configuración: los demás
  // (contacto, horario) son opcionales, por eso solo el paso 1 valida algo.
  const pasoEsValido = (numeroPaso) => {
    if (numeroPaso === 1) {
      return Boolean(form.nombreInstitucion.trim().length >= 2);
    }
    return true;
  };

  const siguientePaso = () => {
    if (!pasoEsValido(paso)) {
      setPasosConIntento((prev) => ({ ...prev, [paso]: true }));
      return;
    }
    setPaso((p) => Math.min(p + 1, TOTAL_PASOS));
  };

  const pasoAnterior = () => {
    setPaso((p) => Math.max(p - 1, 1));
  };

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

  return {
    form,
    setForm,
    guardando,
    handleSubmit,
    logoRef,
    paso,
    mostrarErrores: Boolean(pasosConIntento[paso]),
    siguientePaso,
    pasoAnterior,
  };
};

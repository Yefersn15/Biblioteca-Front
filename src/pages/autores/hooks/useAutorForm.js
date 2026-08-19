// src/pages/autores/hooks/useAutorForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../services/autoresService';
import { useToast } from '../../../context/ToastContext';

const FORM_INICIAL = {
  nombre: '',
  apellido: '',
  nacionalidad: '',
  generoLiterario: '',
  biografia: '',
  fotografiaUrl: '',
  idiomaPrincipal: '',
  obrasDestacadas: '',
  premios: '',
  redesSociales: { facebook: '', twitter: '', instagram: '', portafolio: '' },
};

export const useAutorForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!editando) return;
    getById(id).then((a) => {
      setForm({
        nombre: a.nombre,
        apellido: a.apellido || '',
        nacionalidad: a.nacionalidad || '',
        generoLiterario: a.generoLiterario || '',
        biografia: a.biografia || '',
        fotografiaUrl: a.fotografiaUrl || '',
        idiomaPrincipal: a.idiomaPrincipal || '',
        obrasDestacadas: (a.obrasDestacadas || []).join(', '),
        premios: (a.premios || []).join(', '),
        redesSociales: { facebook: '', twitter: '', instagram: '', portafolio: '', ...(a.redesSociales || {}) },
      });
      setCargando(false);
    });
  }, [id]);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const setRedSocial = (red, value) =>
    setForm((prev) => ({ ...prev, redesSociales: { ...prev.redesSociales, [red]: value } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const payload = {
        ...form,
        obrasDestacadas: form.obrasDestacadas.split(',').map((s) => s.trim()).filter(Boolean),
        premios: form.premios.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (editando) {
        await update(id, payload);
        toast.success('Autor actualizado');
      } else {
        await create(payload);
        toast.success('Autor creado');
      }
      navigate('/admin/autores');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return { form, setField, setRedSocial, editando, cargando, guardando, handleSubmit, navigate };
};

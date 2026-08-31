// src/pages/autores/hooks/useAutorForm.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../services/autoresService';
import { getAll as getCategorias } from '../../../services/api/categorias.api';
import { getLibros } from '../../../services/api/libros.api';
import { useToast } from '../../../context/ToastContext';

const FORM_INICIAL = {
  nombre: '',
  apellido: '',
  nacionalidad: '',
  generoLiterario: [],
  biografia: '',
  fotografiaUrl: '',
  fotografiaPublicId: '',
  idiomaPrincipal: '',
  obrasDestacadas: [],
  premios: '',
  redesSociales: { facebook: '', twitter: '', instagram: '', biografiaUrl: '' },
};

export const useAutorForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [categorias, setCategorias] = useState([]);
  const [librosPropios, setLibrosPropios] = useState([]);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const fotografiaRef = useRef(null);

  useEffect(() => {
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
  }, []);

  useEffect(() => {
    if (!editando) return;
    Promise.all([getById(id), getLibros({ autorId: id, limit: 100 })]).then(([a, { items: libros }]) => {
      setForm({
        nombre: a.nombre,
        apellido: a.apellido || '',
        nacionalidad: a.nacionalidad || '',
        generoLiterario: a.generoLiterario || [],
        biografia: a.biografia || '',
        fotografiaUrl: a.fotografiaUrl || '',
        fotografiaPublicId: a.fotografiaPublicId || '',
        idiomaPrincipal: a.idiomaPrincipal || '',
        obrasDestacadas: a.obrasDestacadas || [],
        premios: (a.premios || []).join(', '),
        redesSociales: { facebook: '', twitter: '', instagram: '', biografiaUrl: '', ...(a.redesSociales || {}) },
      });
      setLibrosPropios(libros);
      setCargando(false);
    });
  }, [id]);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const setRedSocial = (red, value) =>
    setForm((prev) => ({ ...prev, redesSociales: { ...prev.redesSociales, [red]: value } }));

  const toggleEnLista = (campo, valorId) => {
    setForm((prev) => ({
      ...prev,
      [campo]: prev[campo].includes(valorId)
        ? prev[campo].filter((i) => i !== valorId)
        : [...prev[campo], valorId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const resuelto = await fotografiaRef.current?.resolverPendiente();
      if (resuelto?.ok === false) {
        setGuardando(false);
        return;
      }
      const payload = {
        ...form,
        premios: form.premios.split(',').map((s) => s.trim()).filter(Boolean),
      };
      if (resuelto?.changed) {
        payload.fotografiaUrl = resuelto.url;
        payload.fotografiaPublicId = resuelto.publicId;
      }
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

  return {
    form,
    setField,
    setRedSocial,
    toggleEnLista,
    categorias,
    librosPropios,
    editando,
    cargando,
    guardando,
    handleSubmit,
    navigate,
    fotografiaRef,
  };
};

// src/pages/editoriales/hooks/useEditorialForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../services/editorialesService';
import { useToast } from '../../../context/ToastContext';

const FORM_INICIAL = { nombre: '', descripcion: '', logoUrl: '', sitioWeb: '' };

export const useEditorialForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!editando) return;
    getById(id).then((e) => {
      setForm({
        nombre: e.nombre,
        descripcion: e.descripcion || '',
        logoUrl: e.logoUrl || '',
        sitioWeb: e.sitioWeb || '',
      });
      setCargando(false);
    });
  }, [id]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      if (editando) {
        await update(id, form);
        toast.success('Editorial actualizada');
      } else {
        await create(form);
        toast.success('Editorial creada');
      }
      navigate('/admin/editoriales');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return { editando, form, setField, cargando, guardando, handleSubmit, navigate };
};

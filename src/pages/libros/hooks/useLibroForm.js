// src/pages/libros/hooks/useLibroForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLibro, crearLibro, actualizarLibro } from '../services/librosService';
import * as autoresApi from '../../../services/api/autores.api';
import * as editorialesApi from '../../../services/api/editoriales.api';
import * as categoriasApi from '../../../services/api/categorias.api';
import { useToast } from '../../../context/ToastContext';

const FORM_INICIAL = {
  titulo: '',
  autorIds: [],
  editorialId: '',
  tipo: 'LIBRO',
  descripcion: '',
  portadaUrl: '',
  isbn: '',
  anioPublicacion: '',
  idioma: '',
  archivoUrl: '',
  paginas: '',
  copiasTotales: 1,
  categoriaIds: [],
  estado: true,
};

export const useLibroForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState(FORM_INICIAL);
  const [autores, setAutores] = useState([]);
  const [editoriales, setEditoriales] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    (async () => {
      const [{ items: a }, { items: e }, { items: c }] = await Promise.all([
        autoresApi.getAll({ limit: 200 }),
        editorialesApi.getAll({ limit: 200 }),
        categoriasApi.getAll({ limit: 200 }),
      ]);
      setAutores(a);
      setEditoriales(e);
      setCategorias(c);

      if (editando) {
        const libro = await getLibro(id);
        setForm({
          titulo: libro.titulo,
          autorIds: libro.autores?.map((a) => a.id) || [],
          editorialId: libro.editorialId || '',
          tipo: libro.tipo,
          descripcion: libro.descripcion || '',
          portadaUrl: libro.portadaUrl || '',
          isbn: libro.isbn || '',
          anioPublicacion: libro.anioPublicacion || '',
          idioma: libro.idioma || '',
          archivoUrl: libro.archivoUrl || '',
          paginas: libro.paginas || '',
          copiasTotales: libro.copiasTotales,
          categoriaIds: libro.categorias?.map((c) => c.id) || [],
          estado: libro.estado,
        });
        setCargando(false);
      }
    })();
  }, [id]);

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
    if (form.autorIds.length === 0) {
      toast.error('Selecciona al menos un autor');
      return;
    }
    setGuardando(true);
    try {
      const payload = {
        ...form,
        editorialId: form.editorialId || undefined,
        anioPublicacion: form.anioPublicacion || undefined,
        isbn: form.isbn || undefined,
        idioma: form.idioma || undefined,
        archivoUrl: form.archivoUrl || undefined,
        paginas: form.paginas || undefined,
      };
      if (editando) {
        await actualizarLibro(id, payload);
        toast.success('Libro actualizado');
      } else {
        await crearLibro(payload);
        toast.success('Libro creado');
      }
      navigate('/admin/libros');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return {
    editando,
    form,
    setForm,
    autores,
    editoriales,
    categorias,
    cargando,
    guardando,
    toggleEnLista,
    handleSubmit,
  };
};

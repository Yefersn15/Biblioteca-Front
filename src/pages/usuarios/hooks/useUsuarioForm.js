// src/pages/usuarios/hooks/useUsuarioForm.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuario, crearUsuario, actualizarUsuario } from '../services/usuariosService';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { usePasswordFields } from '../../../hooks/usePasswordFields';
import { resolverImagenPendiente } from '../../../components/upload/useImageUpload';

const FORM_INICIAL = { nombres: '', apellidos: '', genero: 'HOMBRE', celular: '', avatar: '', avatarPublicId: '', tipoDocumento: 'CC', documento: '', direccion: '', barrio: '' };

// Con :id en la URL es edición (un admin corrige los datos de una cuenta que
// ya existe); sin :id es creación (el admin registra una cuenta a mano,
// eligiendo su contraseña y rol de una vez — a diferencia del registro
// público, que siempre crea cuentas con rol USUARIO).
export const useUsuarioForm = () => {
  const { id } = useParams();
  const editando = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();
  const { user: usuarioActual } = useAuth();

  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('USUARIO');
  const [form, setForm] = useState(FORM_INICIAL);
  const [cargando, setCargando] = useState(editando);
  const [guardando, setGuardando] = useState(false);
  const [esAdminPrincipal, setEsAdminPrincipal] = useState(false);
  const avatarRef = useRef(null);
  const { password, setPassword, confirmPassword, setConfirmPassword, noCoinciden, validar } = usePasswordFields();

  useEffect(() => {
    if (!editando) return;
    getUsuario(id).then((u) => {
      setEmail(u.email);
      setEsAdminPrincipal(u.esAdminPrincipal);
      setForm({
        nombres: u.nombres,
        apellidos: u.apellidos,
        genero: u.genero || 'HOMBRE',
        celular: u.celular || '',
        avatar: u.avatar || '',
        avatarPublicId: u.avatarPublicId || '',
        tipoDocumento: u.tipoDocumento || 'CC',
        documento: u.documento || '',
        direccion: u.direccion || '',
        barrio: u.barrio || '',
      });
      setCargando(false);
    });
  }, [id]);

  // Otro admin (incluido otro ADMIN) no puede editar en absoluto la cuenta
  // creada por `npm run seed:db`; ella misma sí puede editar sus datos
  // normales, solo no su rol/estado/contraseña (ver SeguridadForm). No aplica
  // al crear: todavía no hay ninguna cuenta que proteger.
  const bloqueadoCompleto = editando && esAdminPrincipal && usuarioActual?.id !== Number(id);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorPassword = validar({ obligatoria: !editando });
    if (errorPassword) {
      toast.error(errorPassword);
      return;
    }
    setGuardando(true);
    try {
      const imagen = await resolverImagenPendiente(avatarRef, { url: form.avatar, publicId: form.avatarPublicId });
      if (!imagen.ok) {
        setGuardando(false);
        return;
      }
      const payload = { ...form, avatar: imagen.url, avatarPublicId: imagen.publicId };
      if (password) payload.password = password;
      if (editando) {
        await actualizarUsuario(id, payload);
        toast.success('Usuario actualizado');
      } else {
        payload.email = email;
        payload.rol = rol;
        await crearUsuario(payload);
        toast.success('Usuario creado');
      }
      navigate('/admin/usuarios');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return {
    editando,
    email,
    setEmail,
    rol,
    setRol,
    form,
    setField,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    noCoinciden,
    cargando,
    guardando,
    handleSubmit,
    navigate,
    esAdminPrincipal,
    bloqueadoCompleto,
    avatarRef,
  };
};

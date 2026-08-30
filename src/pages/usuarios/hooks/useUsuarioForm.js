// src/pages/usuarios/hooks/useUsuarioForm.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsuario, actualizarUsuario } from '../services/usuariosService';
import { useToast } from '../../../context/ToastContext';
import { passwordEsValida } from '../../../validations/password';

const FORM_INICIAL = { nombres: '', apellidos: '', genero: 'HOMBRE', celular: '', avatar: '', tipoDocumento: 'CC', documento: '', direccion: '', barrio: '' };

// Solo edición: un admin llega aquí desde la fila de un usuario que ya
// existe (no hay pantalla de "crear usuario" — el registro público ya cubre eso).
export const useUsuarioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [form, setForm] = useState(FORM_INICIAL);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    getUsuario(id).then((u) => {
      setEmail(u.email);
      setForm({
        nombres: u.nombres,
        apellidos: u.apellidos,
        genero: u.genero || 'HOMBRE',
        celular: u.celular || '',
        avatar: u.avatar || '',
        tipoDocumento: u.tipoDocumento || 'CC',
        documento: u.documento || '',
        direccion: u.direccion || '',
        barrio: u.barrio || '',
      });
      setCargando(false);
    });
  }, [id]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    if (password && !passwordEsValida(password)) {
      toast.error('La contraseña debe incluir mayúscula, minúscula, número y símbolo');
      return;
    }
    setGuardando(true);
    try {
      const payload = { ...form };
      if (password) payload.password = password;
      await actualizarUsuario(id, payload);
      toast.success('Usuario actualizado');
      navigate('/admin/usuarios');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return { email, form, setField, password, setPassword, confirmPassword, setConfirmPassword, cargando, guardando, handleSubmit, navigate };
};

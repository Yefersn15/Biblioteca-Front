import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import { actualizarUsuario } from '../../services/api/usuarios.api';
import { useToast } from '../../context/ToastContext';
import ImageUploadField from '../../components/upload/ImageUploadField';

const DOCUMENTO_LABEL = { CC: 'CC', TI: 'TI', PASAPORTE: 'Pasaporte', CEDULA_EXTRANJERA: 'CE' };
const ROL_LABEL = { ADMIN: 'Administrador', BIBLIOTECARIO: 'Bibliotecario', USUARIO: 'Usuario' };

const Perfil = () => {
  const { user, actualizarUsuarioLocal } = useAuth();
  const { colorPrimario } = useConfiguracion();
  const acento = colorPrimario || '#0d6efd';
  const toast = useToast();
  const esAdmin = user.rol === 'ADMIN';
  const [form, setForm] = useState({
    nombres: user.nombres,
    apellidos: user.apellidos,
    genero: user.genero || '',
    celular: user.celular || '',
    avatar: user.avatar || '',
    tipoDocumento: user.tipoDocumento || '',
    documento: user.documento || '',
    direccion: user.direccion || '',
    barrio: user.barrio || '',
  });
  const [password, setPassword] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const payload = { nombres: form.nombres, apellidos: form.apellidos, genero: form.genero, celular: form.celular, avatar: form.avatar };
      if (esAdmin) {
        Object.assign(payload, {
          tipoDocumento: form.tipoDocumento,
          documento: form.documento,
          direccion: form.direccion,
          barrio: form.barrio,
        });
      }
      if (password) payload.password = password;
      const usuarioActualizado = await actualizarUsuario(user.id, payload);
      actualizarUsuarioLocal(usuarioActualizado);
      setPassword('');
      toast.success('Perfil actualizado');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      {/* Encabezado con banner + avatar */}
      <div className="card mb-4 overflow-hidden border-0 shadow-sm">
        <div style={{ height: 110, background: acento }} />
        <div className="d-flex flex-column flex-sm-row align-items-center align-items-sm-end px-4" style={{ marginTop: -48 }}>
          {form.avatar ? (
            <img
              src={form.avatar}
              alt=""
              className="rounded-circle border border-4 border-white shadow-sm"
              style={{ width: 96, height: 96, objectFit: 'cover' }}
            />
          ) : (
            <div
              className="rounded-circle border border-4 border-white shadow-sm bg-light d-flex align-items-center justify-content-center text-muted"
              style={{ width: 96, height: 96 }}
            >
              <i className="fas fa-user fa-2x"></i>
            </div>
          )}
          <div className="ms-sm-3 mt-2 mt-sm-0 pb-sm-1 text-center text-sm-start">
            <h4 className="mb-0">{user.nombres} {user.apellidos}</h4>
            <span className="badge" style={{ backgroundColor: acento }}>{ROL_LABEL[user.rol]}</span>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header bg-white border-bottom">
                <i className="fas fa-id-card me-2 text-muted"></i>Datos personales
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">Nombres</label>
                    <input type="text" className="form-control" required value={form.nombres} onChange={(e) => setForm({ ...form, nombres: e.target.value })} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Apellidos</label>
                    <input type="text" className="form-control" required value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Género</label>
                    <select className="form-select" value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })}>
                      <option value="HOMBRE">Hombre</option>
                      <option value="MUJER">Mujer</option>
                      <option value="OTRO">Otro</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Celular</label>
                    <input type="tel" className="form-control" value={form.celular} onChange={(e) => setForm({ ...form, celular: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <ImageUploadField
                      label="Foto de perfil"
                      folder="avatares"
                      value={form.avatar}
                      onValueChange={(url) => setForm({ ...form, avatar: url })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 d-flex flex-column gap-4">
            <div className="card">
              <div className="card-header bg-white border-bottom">
                <i className="fas fa-address-card me-2 text-muted"></i>Documento y ubicación
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-7">
                    <label className="form-label">
                      Tipo de documento {!esAdmin && DOCUMENTO_LABEL[form.tipoDocumento] && <span className="text-muted">({DOCUMENTO_LABEL[form.tipoDocumento]})</span>}
                    </label>
                    <select className="form-select" value={form.tipoDocumento} disabled={!esAdmin} onChange={(e) => setForm({ ...form, tipoDocumento: e.target.value })}>
                      <option value="CC">Cédula de ciudadanía</option>
                      <option value="TI">Tarjeta de identidad</option>
                      <option value="PASAPORTE">Pasaporte</option>
                      <option value="CEDULA_EXTRANJERA">Cédula de extranjería</option>
                    </select>
                  </div>
                  <div className="col-5">
                    <label className="form-label">Número</label>
                    <input type="text" className="form-control" readOnly={!esAdmin} value={form.documento} onChange={(e) => setForm({ ...form, documento: e.target.value })} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" readOnly={!esAdmin} value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Barrio</label>
                    <input type="text" className="form-control" readOnly={!esAdmin} value={form.barrio} onChange={(e) => setForm({ ...form, barrio: e.target.value })} />
                  </div>
                  {!esAdmin && (
                    <div className="col-12">
                      <small className="text-muted">
                        <i className="fas fa-circle-info me-1"></i>Estos datos solo puede modificarlos un administrador.
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header bg-white border-bottom">
                <i className="fas fa-shield-halved me-2 text-muted"></i>Seguridad
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" value={user.email} disabled />
                </div>
                <div>
                  <label className="form-label">Nueva contraseña</label>
                  <input type="password" className="form-control" minLength={8} placeholder="Dejar vacío para no cambiarla" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
};

export default Perfil;

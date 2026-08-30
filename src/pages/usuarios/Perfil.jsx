import { usePerfilForm } from './hooks/usePerfilForm';
import DatosPersonalesForm from './components/DatosPersonalesForm';
import DocumentoUbicacionForm from './components/DocumentoUbicacionForm';
import SeguridadForm from './components/SeguridadForm';

const ROL_LABEL = { ADMIN: 'Administrador', BIBLIOTECARIO: 'Bibliotecario', USUARIO: 'Usuario' };

const Perfil = () => {
  const { user, esAdmin, form, setField, password, setPassword, confirmPassword, setConfirmPassword, guardando, handleSubmit } = usePerfilForm();

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      {/* Encabezado con banner + avatar */}
      <div className="card mb-4 overflow-hidden border-0 shadow-sm">
        <div className="tema-acento-bg" style={{ height: 110 }} />
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
            <span className="badge tema-acento-bg">{ROL_LABEL[user.rol]}</span>
          </div>
        </div>
        <div style={{ height: 20 }} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <DatosPersonalesForm form={form} setField={setField} esAdmin={esAdmin} />
          </div>

          <div className="col-md-6 d-flex flex-column gap-4">
            <DocumentoUbicacionForm form={form} setField={setField} esAdmin={esAdmin} />
            <SeguridadForm
              email={user.email}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-4" disabled={guardando}>
          <i className="fas fa-save me-2"></i>{guardando ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  );
};

export default Perfil;

import { useUsuarioForm } from './hooks/useUsuarioForm';
import DatosPersonalesForm from './components/DatosPersonalesForm';
import DocumentoUbicacionForm from './components/DocumentoUbicacionForm';
import SeguridadForm from './components/SeguridadForm';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const UsuarioForm = () => {
  useAyudaPagina({
    titulo: 'Editar usuario',
    contenido: <p>Corrige los datos personales, de documento/ubicación y contraseña de un usuario en su nombre (por ejemplo, cuando te lo solicita porque no puede editarlos él mismo). No existe pantalla de "crear usuario": las cuentas nuevas se crean desde el registro público.</p>,
  });
  const {
    email,
    form,
    setField,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    cargando,
    guardando,
    handleSubmit,
    navigate,
    esAdminPrincipal,
    bloqueadoCompleto,
  } = useUsuarioForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (bloqueadoCompleto) {
    return (
      <div>
        <h2 className="mb-4">Editar usuario</h2>
        <div className="alert alert-warning">
          <i className="fas fa-lock me-2"></i>
          Esta es la cuenta del administrador principal (creada con <code>npm run seed:db</code>) y no puede ser
          modificada por ningún otro usuario, incluido otro administrador.
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/usuarios')}>
          <i className="fas fa-arrow-left me-2"></i>Volver
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Editar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <DatosPersonalesForm form={form} setField={setField} esAdmin />
          </div>
          <div className="col-md-6 d-flex flex-column gap-4">
            <DocumentoUbicacionForm form={form} setField={setField} esAdmin />
            <SeguridadForm
              email={email}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              bloqueada={esAdminPrincipal}
            />
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={guardando}>
            <i className="fas fa-save me-2"></i>{guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/usuarios')}>
            <i className="fas fa-times me-2"></i>Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsuarioForm;

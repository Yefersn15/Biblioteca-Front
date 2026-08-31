import { useUsuarioForm } from './hooks/useUsuarioForm';
import DatosPersonalesForm from './components/DatosPersonalesForm';
import DocumentoUbicacionForm from './components/DocumentoUbicacionForm';
import SeguridadForm from './components/SeguridadForm';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const UsuarioForm = () => {
  const {
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
  } = useUsuarioForm();

  useAyudaPagina({
    titulo: editando ? 'Editar usuario' : 'Nuevo usuario',
    contenido: editando
      ? <p>Corrige los datos personales, de documento/ubicación y contraseña de un usuario en su nombre (por ejemplo, cuando te lo solicita porque no puede editarlos él mismo).</p>
      : <p>Registra una cuenta a mano, eligiendo su contraseña y su rol de una vez. A diferencia del registro público (que siempre crea cuentas con rol Usuario), aquí puedes darle directamente el rol de Bibliotecario o Administrador.</p>,
  });

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
      <h2 className="mb-4">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-6">
            <DatosPersonalesForm form={form} setField={setField} esAdmin avatarRef={avatarRef} />
          </div>
          <div className="col-md-6 d-flex flex-column gap-4">
            <DocumentoUbicacionForm form={form} setField={setField} esAdmin />
            <SeguridadForm
              editando={editando}
              email={email}
              setEmail={setEmail}
              rol={rol}
              setRol={setRol}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              noCoinciden={noCoinciden}
              bloqueada={esAdminPrincipal}
            />
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={guardando}>
            <i className="fas fa-save me-2"></i>{guardando ? 'Guardando...' : editando ? 'Guardar cambios' : 'Crear usuario'}
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

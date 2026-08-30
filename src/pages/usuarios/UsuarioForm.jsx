import { useUsuarioForm } from './hooks/useUsuarioForm';
import DatosPersonalesForm from './components/DatosPersonalesForm';
import DocumentoUbicacionForm from './components/DocumentoUbicacionForm';
import SeguridadForm from './components/SeguridadForm';

const UsuarioForm = () => {
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
  } = useUsuarioForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
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

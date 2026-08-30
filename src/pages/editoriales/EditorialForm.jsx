import { useEditorialForm } from './hooks/useEditorialForm';
import EditorialFormFields from './components/EditorialFormFields';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const EditorialForm = () => {
  useAyudaPagina({
    titulo: 'Crear/editar editorial',
    contenido: <p>Datos básicos de la editorial: nombre, sitio web, descripción y logo.</p>,
  });
  const { editando, form, setField, cargando, guardando, handleSubmit, navigate } = useEditorialForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2 className="mb-4">{editando ? 'Editar editorial' : 'Nueva editorial'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <EditorialFormFields form={form} setField={setField} />

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : (<><i className="fas fa-save me-2"></i>Guardar</>)}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/editoriales')}>
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditorialForm;

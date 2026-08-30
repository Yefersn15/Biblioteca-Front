import { useCategoriaForm } from './hooks/useCategoriaForm';
import CategoriaFormFields from './components/CategoriaFormFields';

const CategoriaForm = () => {
  const { editando, form, setField, cargando, guardando, handleSubmit, navigate } = useCategoriaForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2 className="mb-4">{editando ? 'Editar categoría' : 'Nueva categoría'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <CategoriaFormFields form={form} setField={setField} />

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : (<><i className="fas fa-save me-2"></i>Guardar</>)}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/categorias')}>
                <i className="fas fa-times me-2"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriaForm;

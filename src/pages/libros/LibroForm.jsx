import { useNavigate } from 'react-router-dom';
import { useLibroForm } from './hooks/useLibroForm';
import LibroFormFields from './components/LibroFormFields';

const LibroForm = () => {
  const navigate = useNavigate();
  const {
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
  } = useLibroForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2 className="mb-4">{editando ? 'Editar libro' : 'Nuevo libro'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <LibroFormFields
              form={form}
              setForm={setForm}
              autores={autores}
              editoriales={editoriales}
              categorias={categorias}
              editando={editando}
              toggleEnLista={toggleEnLista}
            />

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : (<><i className="fas fa-save me-1"></i>Guardar</>)}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/libros')}>
                <i className="fas fa-times me-1"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LibroForm;

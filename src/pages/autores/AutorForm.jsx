import { useAutorForm } from './hooks/useAutorForm';
import AutorFormFields from './components/AutorFormFields';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const AutorForm = () => {
  useAyudaPagina({
    titulo: 'Crear/editar autor',
    contenido: <p>Datos del autor: biografía, nacionalidad, géneros literarios, redes sociales y premios. Al editar puedes ver sus libros propios en el catálogo, pero se administran desde la sección Libros.</p>,
  });
  const {
    form,
    setField,
    setRedSocial,
    toggleEnLista,
    categorias,
    librosPropios,
    editando,
    cargando,
    guardando,
    handleSubmit,
    navigate,
  } = useAutorForm();

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h2 className="mb-4">{editando ? 'Editar autor' : 'Nuevo autor'}</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <AutorFormFields
              form={form}
              setField={setField}
              setRedSocial={setRedSocial}
              toggleEnLista={toggleEnLista}
              categorias={categorias}
              librosPropios={librosPropios}
              editando={editando}
            />

            <div className="mt-4 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={guardando}>
                {guardando ? 'Guardando...' : (<><i className="fas fa-save me-1"></i>Guardar</>)}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/autores')}>
                <i className="fas fa-times me-1"></i>Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AutorForm;

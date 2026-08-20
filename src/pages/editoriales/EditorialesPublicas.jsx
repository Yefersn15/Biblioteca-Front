import { useEditorialesPublicas } from './hooks/useEditorialesPublicas';
import EditorialCard from './components/EditorialCard';

const EditorialesPublicas = () => {
  const { editoriales, loading } = useEditorialesPublicas();

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-building me-2 text-tema-acento"></i>Editoriales</h2>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : editoriales.length === 0 ? (
        <div className="alert alert-info">No hay editoriales en el catálogo todavía.</div>
      ) : (
        <div className="row g-4">
          {editoriales.map((e) => (
            <div className="col-6 col-md-4 col-lg-3" key={e.id}>
              <EditorialCard editorial={e} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditorialesPublicas;

import { useAutoresPublicos } from './hooks/useAutoresPublicos';
import AutorCard from './components/AutorCard';

const AutoresPublicos = () => {
  const { autores, loading } = useAutoresPublicos();

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-feather me-2"></i>Autores</h2>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : autores.length === 0 ? (
        <div className="alert alert-info">No hay autores en el catálogo todavía.</div>
      ) : (
        <div className="row g-4">
          {autores.map((a) => (
            <div className="col-6 col-md-4 col-lg-3" key={a.id}>
              <AutorCard autor={a} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoresPublicos;

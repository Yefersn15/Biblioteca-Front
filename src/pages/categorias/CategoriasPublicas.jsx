import { Link } from 'react-router-dom';
import { useCategoriasPublicas } from './hooks/useCategoriasPublicas';

// A diferencia de Autores/Editoriales, una categoría no tiene contenido
// propio (sin logo/bio) — así que no tiene página individual, cada tarjeta
// lleva directo al catálogo ya filtrado por esa categoría.
const CategoriasPublicas = () => {
  const { categorias, loading } = useCategoriasPublicas();

  return (
    <div className="container py-4">
      <h2 className="mb-4"><i className="fas fa-tags me-2 text-tema-acento"></i>Categorías</h2>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : categorias.length === 0 ? (
        <div className="alert alert-info">No hay categorías en el catálogo todavía.</div>
      ) : (
        <div className="row g-4">
          {categorias.map((c) => (
            <div className="col-6 col-md-4 col-lg-3" key={c.id}>
              <Link to={`/catalogo?categoriaId=${c.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm text-center">
                  <div className="card-body">
                    <i className="fas fa-tag fa-2x mb-2 text-tema-acento"></i>
                    <div className="fw-bold">{c.nombre}</div>
                    {c.descripcion && <div className="small text-muted text-truncate">{c.descripcion}</div>}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriasPublicas;

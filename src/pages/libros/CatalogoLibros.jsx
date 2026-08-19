import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getLibros } from '../../services/api/libros.api';
import { getAll as getCategorias } from '../../services/api/categorias.api';
import { getAll as getAutores } from '../../services/api/autores.api';
import { getById as getEditorial } from '../../services/api/editoriales.api';
import { formatAutores } from '../../utils/formatAutores';

const ORDENES = [
  { value: 'titulo-asc', label: 'Título (A-Z)' },
  { value: 'titulo-desc', label: 'Título (Z-A)' },
  { value: 'disponibles-desc', label: 'Más disponibles primero' },
  { value: 'disponibles-asc', label: 'Agotados primero' },
  { value: 'recientes', label: 'Agregados recientemente' },
];

const CatalogoLibros = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const autorId = searchParams.get('autorId') || '';
  const categoriaId = searchParams.get('categoriaId') || '';
  const editorialId = searchParams.get('editorialId');
  const sort = searchParams.get('sort') || 'titulo-asc';

  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [nombreFiltroEditorial, setNombreFiltroEditorial] = useState('');

  useEffect(() => {
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
    getAutores({ limit: 200 }).then(({ items }) => setAutores(items));
  }, []);

  useEffect(() => {
    if (editorialId) getEditorial(editorialId).then((e) => setNombreFiltroEditorial(e.nombre)).catch(() => setNombreFiltroEditorial(''));
    else setNombreFiltroEditorial('');
  }, [editorialId]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      getLibros({ limit: 40, search: search || undefined, autorId: autorId || undefined, categoriaId: categoriaId || undefined, editorialId, sort }).then(({ items }) => {
        setLibros(items);
        setLoading(false);
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, autorId, categoriaId, editorialId, sort]);

  const actualizarFiltro = (clave, valor) => {
    const next = new URLSearchParams(searchParams);
    if (valor) next.set(clave, valor);
    else next.delete(clave);
    if (clave !== 'editorialId') next.delete('editorialId'); // los filtros de la barra reemplazan el de editorial (venía de un enlace externo)
    setSearchParams(next);
  };

  const limpiarFiltros = () => setSearchParams({});

  const hayFiltros = autorId || categoriaId || editorialId || sort !== 'titulo-asc';

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-book me-2"></i>{nombreFiltroEditorial ? `Editorial: ${nombreFiltroEditorial}` : 'Catálogo'}
        </h2>
        {hayFiltros && <button className="btn btn-sm btn-outline-secondary" onClick={limpiarFiltros}>Quitar filtros</button>}
      </div>

      <div className="row g-2 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={categoriaId} onChange={(e) => actualizarFiltro('categoriaId', e.target.value)}>
            <option value="">Todas las categorías</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-6" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={autorId} onChange={(e) => actualizarFiltro('autorId', e.target.value)}>
            <option value="">Todos los autores</option>
            {autores.map((a) => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={sort} onChange={(e) => actualizarFiltro('sort', e.target.value)}>
            {ORDENES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : libros.length === 0 ? (
        <div className="alert alert-info">No se encontraron libros con esos filtros.</div>
      ) : (
        <div className="row g-4">
          {libros.map((libro) => (
            <div className="col-6 col-md-3 col-lg-2" key={libro.id}>
              <Link to={`/catalogo/${libro.id}`} className="text-decoration-none text-dark">
                <div className="card h-100 shadow-sm">
                  <div style={{ aspectRatio: '2 / 3', background: '#e9ecef', overflow: 'hidden' }}>
                    {libro.portadaUrl ? (
                      <img src={libro.portadaUrl} alt={libro.titulo} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                        <i className="fas fa-book fa-2x"></i>
                      </div>
                    )}
                  </div>
                  <div className="card-body p-2">
                    <div className="small fw-bold text-truncate">{libro.titulo}</div>
                    <div className="small text-muted text-truncate">{formatAutores(libro)}</div>
                    <span className={`badge mt-1 ${libro.copiasDisponibles > 0 ? 'bg-success' : 'bg-secondary'}`}>
                      {libro.copiasDisponibles > 0 ? `${libro.copiasDisponibles} disponibles` : 'Agotado'}
                    </span>
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

export default CatalogoLibros;

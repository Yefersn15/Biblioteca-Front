import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAutoresAdmin } from './hooks/useAutoresAdmin';
import AutorRow from './components/AutorRow';
import { getAll as getCategorias } from '../../services/api/categorias.api';

const AutoresAdmin = () => {
  const {
    autores,
    loading,
    search,
    setSearch,
    nacionalidadFiltro,
    setNacionalidadFiltro,
    generoFiltro,
    setGeneroFiltro,
    estadoFiltro,
    setEstadoFiltro,
    toggleEstado,
    handleEliminar,
  } = useAutoresAdmin();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias({ limit: 200 }).then(({ items }) => setCategorias(items));
  }, []);

  const nacionalidades = [...new Set(autores.map((a) => a.nacionalidad).filter(Boolean))];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Autores</h2>
        <Link to="/admin/autores/nuevo" className="btn btn-primary">
          <i className="fas fa-plus me-1"></i>Nuevo autor
        </Link>
      </div>

      <div className="row g-2 mb-3 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={nacionalidadFiltro} onChange={(e) => setNacionalidadFiltro(e.target.value)}>
            <option value="">Todas las nacionalidades</option>
            {nacionalidades.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-3" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
            <option value="">Todos los géneros</option>
            {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </div>
        <div className="col-6 col-md-2" style={{ flex: '1 1 0' }}>
          <select className="form-select" value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
            <option value="">Todos</option>
            <option value="true">Habilitados</option>
            <option value="false">Inhabilitados</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>
      ) : autores.length === 0 ? (
        <div className="alert alert-info">No hay autores todavía.</div>
      ) : (
        <table className="table table-hover bg-white align-middle">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Género literario</th>
              <th style={{ width: 100 }}></th>
            </tr>
          </thead>
          <tbody>
            {autores.map((a) => (
              <AutorRow key={a.id} autor={a} onEliminar={handleEliminar} toggleEstado={toggleEstado} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AutoresAdmin;

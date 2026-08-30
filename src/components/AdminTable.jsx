import Pagination from './Pagination';

// Bloque repetido en todas las listas admin: spinner mientras carga, mensaje
// cuando no hay resultados, o la tabla + paginación cuando sí los hay. Antes
// estaba copiado (con leves variaciones) dentro de cada página de módulo.
const AdminTable = ({ loading, isEmpty, emptyMessage, headers, pagina, totalPaginas, onCambiarPagina, children }) => {
  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }
  if (isEmpty) {
    return <div className="alert alert-info">{emptyMessage}</div>;
  }
  return (
    <>
      <table className="table table-hover bg-white align-middle">
        <thead><tr>{headers}</tr></thead>
        <tbody>{children}</tbody>
      </table>
      <Pagination pagina={pagina} totalPaginas={totalPaginas} onCambiarPagina={onCambiarPagina} />
    </>
  );
};

export default AdminTable;

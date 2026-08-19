// Un libro puede tener varios autores/coautores; esto arma "Nombre Apellido"
// por cada uno y los une con coma, para mostrar en catálogo/detalle/admin.
export const formatAutores = (libro) =>
  (libro.autores || []).map((a) => `${a.nombre}${a.apellido ? ` ${a.apellido}` : ''}`).join(', ') || 'Sin autor';

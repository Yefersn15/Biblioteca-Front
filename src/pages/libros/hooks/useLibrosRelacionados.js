// src/pages/libros/hooks/useLibrosRelacionados.js
import { useState, useEffect } from 'react';
import { getLibros } from '../services/librosService';

const LIMITE = 6;

// "Relacionados" mezcla dos criterios: mismo autor (cualquiera de los del
// libro actual), o al menos 2 categorías en común (una sola coincidencia es
// demasiado débil — la mayoría de libros comparten alguna categoría amplia).
// No hay endpoint dedicado: se reutilizan los mismos filtros autorId/
// categoriaId que ya usa el catálogo, y la regla de "2 o más" se aplica del
// lado del cliente porque el filtro por categoría del backend es OR, no
// cuenta coincidencias.
export const useLibrosRelacionados = (libro) => {
  const [relacionados, setRelacionados] = useState([]);

  useEffect(() => {
    if (!libro) {
      setRelacionados([]);
      return;
    }

    const autorIds = (libro.autores || []).map((a) => a.id);
    const categoriaIds = (libro.categorias || []).map((c) => c.id);

    const cargar = async () => {
      const [porAutor, porCategoria] = await Promise.all([
        Promise.all(autorIds.map((id) => getLibros({ autorId: id, limit: 20 }))),
        Promise.all(categoriaIds.map((id) => getLibros({ categoriaId: id, limit: 40 }))),
      ]);

      const candidatosAutor = porAutor.flatMap((r) => r.items);
      const candidatosCategoria = porCategoria
        .flatMap((r) => r.items)
        .filter((l) => (l.categorias || []).filter((c) => categoriaIds.includes(c.id)).length >= 2);

      const mapa = new Map();
      for (const l of [...candidatosAutor, ...candidatosCategoria]) {
        if (l.id !== libro.id) mapa.set(l.id, l);
      }

      setRelacionados([...mapa.values()].slice(0, LIMITE));
    };

    cargar();
  }, [libro]);

  return relacionados;
};

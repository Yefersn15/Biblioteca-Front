// Carrusel de scroll automático e infinito: la lista de ítems se duplica una
// vez y la pista se desplaza -50% en loop, así que cuando la primera copia
// termina de salir, la segunda ya está exactamente en su lugar (el loop no
// se nota). Se pausa al pasar el mouse para poder hacer clic con comodidad.
const InfiniteCarousel = ({ items, renderItem, itemWidth = 160, speed = 40 }) => {
  if (items.length === 0) return null;

  const duplicados = [...items, ...items];
  const duracion = Math.max(10, (items.length * itemWidth) / speed);

  return (
    <div className="infinite-carousel">
      <div className="infinite-carousel-track" style={{ animationDuration: `${duracion}s` }}>
        {duplicados.map((item, i) => (
          <div className="infinite-carousel-item" style={{ width: itemWidth }} key={i}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;

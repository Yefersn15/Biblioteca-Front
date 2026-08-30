// src/pages/banners/components/BannerCollage.jsx
import { Link } from 'react-router-dom';
import { getTemplate, SLOT_LETTERS } from '../hooks/bannerTemplates';

// `items`, si se pasa, son casillas "vivas" enlazadas al catálogo (autores
// destacados: {id, imageUrl, label, linkTo, shape} — ver
// banners.service.resolverItems en el backend). Si no se pasa (o es null),
// se usan las imágenes subidas a mano de siempre (`images`), en la
// cuadrícula fija de la plantilla.
//
// Los `items` NO usan la cuadrícula de la plantilla: cada casilla respeta su
// propia proporción real (foto cuadrada, `item.shape`) en vez de estirarse a
// la forma que le tocó en la plantilla — por eso no importa cuál plantilla
// esté elegida, siempre se ven bien. Solo se usa `featuredSlot` de la
// plantilla para saber cuál casilla se muestra más grande.
const BannerCollage = ({ layout, images = [], items = null, titulo, texto, textPosition = 'none', height = 380 }) => {
  const template = getTemplate(layout);
  const usaItems = Array.isArray(items);

  if (usaItems) {
    const featuredSlot = template.featuredSlot ?? 0;
    return (
      <div className="banner-collage-items" style={{ '--banner-item-h': `${height}px` }}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`banner-item-cell ${item?.shape === 'book' ? 'is-book' : 'is-square'} ${i === featuredSlot ? 'is-featured' : ''}`}
          >
            {item ? (
              <Link to={item.linkTo} className="d-block h-100" title={item.label}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.label || ''} />
                ) : (
                  <div className="banner-collage-label">
                    <i className="fas fa-tag"></i>
                    <span>{item.label}</span>
                  </div>
                )}
              </Link>
            ) : (
              <div className="banner-collage-placeholder"><i className="fas fa-image"></i></div>
            )}
          </div>
        ))}

        {textPosition !== 'none' && (titulo || texto) && (
          <div className={`banner-collage-text banner-collage-text-${textPosition}`}>
            {titulo && <h3>{titulo}</h3>}
            {texto && <p>{texto}</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="banner-collage"
      style={{
        gridTemplateAreas: template.areas,
        gridTemplateColumns: template.cols,
        gridTemplateRows: template.rows,
        height,
      }}
    >
      {template.slots > 0 && Array.from({ length: template.slots }).map((_, i) => {
        const img = images[i];
        return (
          <div key={i} className="banner-collage-cell" style={{ gridArea: SLOT_LETTERS[i] }}>
            {img?.url ? (
              <img src={img.url} alt={titulo || ''} />
            ) : (
              <div className="banner-collage-placeholder">
                <i className="fas fa-image"></i>
              </div>
            )}
          </div>
        );
      })}

      {textPosition !== 'none' && (titulo || texto) && (
        <div className={`banner-collage-text banner-collage-text-${textPosition}`}>
          {titulo && <h3>{titulo}</h3>}
          {texto && <p>{texto}</p>}
        </div>
      )}
    </div>
  );
};

export default BannerCollage;

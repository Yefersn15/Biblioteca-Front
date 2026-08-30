import { useState } from 'react';

// Campo de texto que filtra una lista ya cargada (usuarios o libros) a
// medida que se escribe, mostrando los resultados en una lista desplegable;
// al hacer clic en uno se selecciona. `onMouseDown` en vez de `onClick` en
// las opciones: dispara antes que el `onBlur` del input, así el clic sí
// registra en vez de perderse porque el desplegable ya se cerró.
const BuscadorSelect = ({ items, getLabel, getKey, placeholder, onSelect, disabled }) => {
  const [texto, setTexto] = useState('');
  const [abierto, setAbierto] = useState(false);

  const textoNormalizado = texto.trim().toLowerCase();
  const resultados = (textoNormalizado ? items.filter((item) => getLabel(item).toLowerCase().includes(textoNormalizado)) : items).slice(0, 8);

  const elegir = (item) => {
    onSelect(item);
    setTexto('');
    setAbierto(false);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={texto}
        disabled={disabled}
        onChange={(e) => { setTexto(e.target.value); setAbierto(true); }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setTimeout(() => setAbierto(false), 150)}
      />
      {abierto && (
        <ul className="list-group position-absolute w-100 shadow-sm" style={{ zIndex: 20, maxHeight: 220, overflowY: 'auto' }}>
          {resultados.length > 0 ? (
            resultados.map((item) => (
              <li
                key={getKey(item)}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer' }}
                onMouseDown={() => elegir(item)}
              >
                {getLabel(item)}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted small">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BuscadorSelect;

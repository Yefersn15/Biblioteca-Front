import { useEffect, useRef } from 'react';
import { PALETAS } from '../../../utils/paletas';
import { contrasteTexto } from '../../../utils/color';
import { resolverTema, aplicarTemaCss } from '../../../utils/tema';
import { useConfiguracion } from '../../../context/ConfiguracionContext';

const TEMA_NINGUNO = { modo: 'NINGUNO', paletaId: null, colores: null };
const COLORES_PERSONALIZADO_INICIAL = { fondo: '#eef5f9', encabezado: '#0b3d5c', acento: '#1f8fce' };

// Selector de tema del sitio: galería de paletas predefinidas + modo
// personalizado (3 colores: fondo, encabezado, acento). Controlado, igual
// que HorarioBuilder: recibe el `tema` guardado y devuelve la forma completa
// lista para persistir vía onChange.
const SelectorTema = ({ value, onChange }) => {
  const tema = value || TEMA_NINGUNO;
  const { temaResuelto } = useConfiguracion();

  // Vista previa en vivo: cada vez que cambia la selección (antes de guardar)
  // se aplica de una vez a toda la página, para que el admin vea el efecto
  // real en el encabezado/sidebar mientras elige. Si sale de esta página sin
  // guardar, se restaura el tema realmente guardado (temaResuelto al montar).
  const temaGuardadoRef = useRef(temaResuelto);
  useEffect(() => {
    // Se actualiza cada vez que el tema realmente guardado cambia (p. ej.
    // tras un guardar exitoso), para que un "salir sin guardar" posterior
    // restaure lo último persistido y no el valor de cuando se montó.
    temaGuardadoRef.current = temaResuelto;
  }, [temaResuelto]);

  useEffect(() => {
    aplicarTemaCss(resolverTema(tema));
    return () => aplicarTemaCss(temaGuardadoRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tema.modo, tema.paletaId, tema.colores?.fondo, tema.colores?.encabezado, tema.colores?.acento]);

  const elegirNinguno = () => onChange(TEMA_NINGUNO);

  const elegirPaleta = (paleta) =>
    onChange({ modo: 'PREDEFINIDO', paletaId: paleta.id, colores: null });

  const activarPersonalizado = () => {
    const base = tema.modo === 'PERSONALIZADO' && tema.colores ? tema.colores : COLORES_PERSONALIZADO_INICIAL;
    onChange({ modo: 'PERSONALIZADO', paletaId: null, colores: base });
  };

  const cambiarColorPersonalizado = (rol, hex) => {
    const base = tema.modo === 'PERSONALIZADO' && tema.colores ? tema.colores : COLORES_PERSONALIZADO_INICIAL;
    onChange({ modo: 'PERSONALIZADO', paletaId: null, colores: { ...base, [rol]: hex } });
  };

  const coloresPersonalizado = tema.modo === 'PERSONALIZADO' && tema.colores ? tema.colores : COLORES_PERSONALIZADO_INICIAL;

  return (
    <div>
      <div className="row g-3">
        <div className="col-6 col-md-3 col-lg-2">
          <button
            type="button"
            className={`w-100 border rounded p-2 text-start bg-white ${tema.modo === 'NINGUNO' ? 'border-primary border-2' : ''}`}
            onClick={elegirNinguno}
          >
            <div className="d-flex rounded-1 overflow-hidden mb-2" style={{ height: 28 }}>
              <div className="flex-grow-1 bg-white border-end" />
              <div className="flex-grow-1 bg-white" />
            </div>
            <small className="fw-semibold">Ninguna</small>
            <div className="text-muted" style={{ fontSize: '.72rem' }}>Por defecto</div>
          </button>
        </div>

        {PALETAS.map((paleta) => (
          <div className="col-6 col-md-3 col-lg-2" key={paleta.id}>
            <button
              type="button"
              className={`w-100 border rounded p-2 text-start bg-white ${tema.modo === 'PREDEFINIDO' && tema.paletaId === paleta.id ? 'border-primary border-2' : ''}`}
              onClick={() => elegirPaleta(paleta)}
            >
              <div className="d-flex rounded-1 overflow-hidden mb-2" style={{ height: 28 }}>
                <div className="flex-grow-1" style={{ background: paleta.fondo }} />
                <div className="flex-grow-1" style={{ background: paleta.encabezado }} />
                <div className="flex-grow-1" style={{ background: paleta.acento }} />
              </div>
              <small className="fw-semibold">{paleta.nombre}</small>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button
          type="button"
          className={`btn btn-sm ${tema.modo === 'PERSONALIZADO' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={activarPersonalizado}
        >
          <i className="fas fa-sliders me-1"></i>Personalizada
        </button>

        {tema.modo === 'PERSONALIZADO' && (
          <div className="d-flex flex-wrap gap-3 mt-3">
            {[
              { rol: 'fondo', label: 'Fondo' },
              { rol: 'encabezado', label: 'Encabezado y pie' },
              { rol: 'acento', label: 'Acento (botones, enlaces)' },
            ].map(({ rol, label }) => (
              <div key={rol}>
                <label className="form-label small mb-1 d-block">{label}</label>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={coloresPersonalizado[rol]}
                  onChange={(e) => cambiarColorPersonalizado(rol, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {tema.modo !== 'NINGUNO' && (
        <div className="mt-3 p-2 border rounded d-inline-flex align-items-center gap-2">
          <span className="small text-muted">Vista previa:</span>
          {(() => {
            const c = tema.modo === 'PREDEFINIDO' ? PALETAS.find((p) => p.id === tema.paletaId) : coloresPersonalizado;
            if (!c) return null;
            return (
              <span
                className="rounded px-3 py-1 small fw-semibold"
                style={{ background: c.encabezado, color: contrasteTexto(c.encabezado) }}
              >
                Encabezado
              </span>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default SelectorTema;

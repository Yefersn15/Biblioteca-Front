import { useState, useEffect } from 'react';
import { actualizarConfiguracion } from '../../services/api/configuracion.api';
import { useConfiguracion } from '../../context/ConfiguracionContext';
import ImageUploadField from '../../components/upload/ImageUploadField';
import { useToast } from '../../context/ToastContext';
import { DIAS, formatearHorario } from '../../utils/horario';

const REGLA_INICIAL = { dias: [], cerrado: false, apertura: '08:00', cierre: '18:00' };

// Si el admin pega el <iframe> completo que da "Insertar un mapa" en Google
// Maps, se queda solo con la URL del src — así no tiene que editar HTML a mano.
const extraerSrcDeIframe = (valor) => {
  const match = valor.match(/src=["']([^"']+)["']/i);
  return match ? match[1] : valor.trim();
};

const HorarioBuilder = ({ reglas, onChange }) => {
  const actualizarRegla = (i, cambios) => onChange(reglas.map((r, idx) => (idx === i ? { ...r, ...cambios } : r)));
  const toggleDia = (i, dia) => {
    const regla = reglas[i];
    const dias = regla.dias.includes(dia) ? regla.dias.filter((d) => d !== dia) : [...regla.dias, dia];
    actualizarRegla(i, { dias });
  };
  const agregar = () => onChange([...reglas, { ...REGLA_INICIAL }]);
  const quitar = (i) => onChange(reglas.filter((_, idx) => idx !== i));

  const vistaPrevia = formatearHorario(reglas);

  return (
    <div>
      {reglas.map((regla, i) => (
        <div className="border rounded p-3 mb-2" key={i}>
          <div className="d-flex flex-wrap gap-1 mb-2">
            {DIAS.map((d) => (
              <button
                key={d.value}
                type="button"
                className={`btn btn-sm ${regla.dias.includes(d.value) ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => toggleDia(i, d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`cerrado-${i}`}
                checked={regla.cerrado}
                onChange={(e) => actualizarRegla(i, { cerrado: e.target.checked })}
              />
              <label className="form-check-label" htmlFor={`cerrado-${i}`}>Cerrado</label>
            </div>
            {!regla.cerrado && (
              <>
                <div>
                  <label className="form-label small mb-0 d-block">Apertura</label>
                  <input type="time" className="form-control form-control-sm" value={regla.apertura || ''} onChange={(e) => actualizarRegla(i, { apertura: e.target.value })} />
                </div>
                <div>
                  <label className="form-label small mb-0 d-block">Cierre</label>
                  <input type="time" className="form-control form-control-sm" value={regla.cierre || ''} onChange={(e) => actualizarRegla(i, { cierre: e.target.value })} />
                </div>
              </>
            )}
            <button type="button" className="btn btn-sm btn-outline-danger ms-auto" onClick={() => quitar(i)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="btn btn-sm btn-outline-primary" onClick={agregar}>
        <i className="fas fa-plus me-1"></i>Agregar grupo de horario
      </button>

      {vistaPrevia.length > 0 && (
        <div className="mt-3 small text-muted">
          <strong>Así se verá:</strong>
          <ul className="mb-0">
            {vistaPrevia.map((linea, i) => <li key={i}>{linea}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const ConfiguracionAdmin = () => {
  const config = useConfiguracion();
  const toast = useToast();
  const [form, setForm] = useState(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!config.loading) {
      setForm({
        nombreInstitucion: config.nombreInstitucion || '',
        logoUrl: config.logoUrl || '',
        descripcion: config.descripcion || '',
        direccion: config.direccion || '',
        telefono: config.telefono || '',
        email: config.email || '',
        horario: config.horario?.length ? config.horario : [],
        mapaEmbedUrl: config.mapaEmbedUrl || '',
        colorPrimario: config.colorPrimario || '',
      });
    }
  }, [config.loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await actualizarConfiguracion(form);
      await config.recargar();
      toast.success('Configuración actualizada');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setGuardando(false);
    }
  };

  if (!form) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  const mapaPareceValido = !form.mapaEmbedUrl || form.mapaEmbedUrl.includes('google.com/maps/embed');

  return (
    <div>
      <h2 className="mb-2">Configuración de la biblioteca</h2>
      <p className="text-muted mb-4">
        Personaliza el nombre, logo y datos de contacto que se muestran en todo el sitio (encabezado, pie de página, inicio y panel de administración).
      </p>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Nombre de la institución/biblioteca *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={form.nombreInstitucion}
                  onChange={(e) => setForm({ ...form, nombreInstitucion: e.target.value })}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Color principal</label>
                <div className="d-flex gap-2 align-items-center">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    value={form.colorPrimario || '#212529'}
                    onChange={(e) => setForm({ ...form, colorPrimario: e.target.value })}
                  />
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setForm({ ...form, colorPrimario: '' })}>
                    Usar por defecto
                  </button>
                </div>
              </div>

              <div className="col-12">
                <ImageUploadField
                  label="Logo"
                  folder="logo"
                  value={form.logoUrl}
                  onValueChange={(url) => setForm({ ...form, logoUrl: url })}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Frase de bienvenida (se muestra en el inicio)</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Calle 52 #43-31, Medellín"
                  value={form.direccion}
                  onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                />
                <small className="text-muted">Si no defines una URL de mapa abajo, el mapa del inicio se arma con esta dirección.</small>
              </div>
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Correo de contacto</label>
                <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>

              <div className="col-12">
                <label className="form-label">URL de Google Maps (opcional, para un mapa más preciso)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pega aquí el código de Google Maps > Compartir > Insertar un mapa"
                  value={form.mapaEmbedUrl}
                  onChange={(e) => setForm({ ...form, mapaEmbedUrl: extraerSrcDeIframe(e.target.value) })}
                />
                <small className="text-muted d-block">
                  En Google Maps: busca tu ubicación → <strong>Compartir</strong> → pestaña <strong>Insertar un mapa</strong> → <strong>Copiar HTML</strong>, y pégalo aquí (se toma el enlace automáticamente). El enlace normal de "Compartir ubicación" no funciona para insertar, por eso tiene que ser ese.
                </small>
                {!mapaPareceValido && (
                  <div className="alert alert-warning py-2 mt-2 mb-0 small">
                    Esta URL no parece ser de "Insertar un mapa" — puede que no se muestre. Si falla, deja este campo vacío y se usará la dirección de arriba.
                  </div>
                )}
                {form.mapaEmbedUrl && (
                  <div className="mt-2 border rounded overflow-hidden">
                    <iframe title="Vista previa del mapa" src={form.mapaEmbedUrl} width="100%" height="200" style={{ border: 0, display: 'block' }} loading="lazy" />
                  </div>
                )}
              </div>

              <div className="col-12">
                <label className="form-label d-block">Horario</label>
                <HorarioBuilder reglas={form.horario} onChange={(horario) => setForm({ ...form, horario })} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-4" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionAdmin;

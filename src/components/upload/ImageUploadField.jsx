import { useEffect, useImperativeHandle, forwardRef, useRef, useState } from 'react';
import { useImageUpload, validarArchivoImagen } from './useImageUpload';

// Campo de imagen reutilizable. Elegir un archivo NO lo sube todavía: solo
// se guarda en memoria y se muestra una vista previa local (URL.createObjectURL).
// La subida real a Cloudinary (vía el backend) ocurre recién cuando el
// formulario padre llama a `resolverPendiente()` (expuesto por ref) en su
// submit — así nunca se sube una imagen que el usuario termina sin guardar.
// También se puede pegar directamente una URL externa en el campo de texto,
// sin que eso implique ninguna subida.
const ImageUploadField = forwardRef(({ label, name, value, onValueChange, onChange, folder = 'general', publico = false, size = 84, invalid, invalidMessage }, ref) => {
  const { upload, uploading, error, setError } = useImageUpload(folder, publico);
  const inputRef = useRef(null);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const applyValue = (url, publicId) => {
    if (onValueChange) onValueChange(url, publicId);
    else if (onChange) onChange({ target: { name, value: url, type: 'text' } });
  };

  const limpiarPendiente = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(null);
    setPreviewUrl('');
  };

  useImperativeHandle(ref, () => ({
    resolverPendiente: async () => {
      if (!pendingFile) return { ok: true, changed: false };
      const resultado = await upload(pendingFile);
      if (!resultado) return { ok: false, changed: false };
      applyValue(resultado.url, resultado.publicId);
      limpiarPendiente();
      return { ok: true, changed: true, url: resultado.url, publicId: resultado.publicId };
    },
  }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const mensajeInvalido = validarArchivoImagen(file);
    if (mensajeInvalido) {
      setError(mensajeInvalido);
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setError('');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUrlChange = (e) => {
    setError('');
    if (pendingFile) {
      limpiarPendiente();
      if (inputRef.current) inputRef.current.value = '';
    }
    applyValue(e.target.value, null);
  };

  const imagenAMostrar = previewUrl || value;

  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <div className="d-flex align-items-center gap-3 mb-2">
        {imagenAMostrar ? (
          <img
            src={imagenAMostrar}
            alt=""
            style={{ width: size, height: size, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)' }}
            onError={(e) => { e.target.style.visibility = 'hidden'; }}
          />
        ) : (
          <div
            className="text-muted"
            style={{
              width: size,
              height: size,
              borderRadius: 8,
              border: '1px dashed var(--border2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <i className="fas fa-image"></i>
          </div>
        )}
        <div className="flex-grow-1">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {pendingFile && !uploading && <small className="text-muted d-block mt-1"><i className="fas fa-clock me-1"></i>Se subirá al guardar</small>}
          {uploading && <small className="text-muted d-block mt-1"><i className="fas fa-spinner fa-spin me-1"></i>Subiendo imagen...</small>}
          {error && <small className="text-danger d-block mt-1">{error}</small>}
        </div>
      </div>
      <input
        type="url"
        className={`form-control form-control-sm ${invalid ? 'is-invalid' : ''}`}
        placeholder="...o pega una URL de imagen"
        value={value || ''}
        onChange={handleUrlChange}
      />
      {invalid && invalidMessage && <div className="invalid-feedback d-block">{invalidMessage}</div>}
    </div>
  );
});

export default ImageUploadField;

import { useRef } from 'react';
import { useImageUpload } from './useImageUpload';

// Campo de imagen reutilizable: sube el archivo a Cloudinary (vía el backend,
// que guarda solo la URL resultante en la base de datos) o, si se prefiere,
// se puede pegar directamente una URL externa en el campo de texto.
const ImageUploadField = ({ label, name, value, onChange, onValueChange, folder = 'general', size = 84 }) => {
  const { upload, uploading, error, setError } = useImageUpload(folder);
  const inputRef = useRef(null);

  const applyValue = (url) => {
    if (onValueChange) onValueChange(url);
    else if (onChange) onChange({ target: { name, value: url, type: 'text' } });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await upload(file);
    if (result) applyValue(result.url);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleUrlChange = (e) => {
    setError('');
    applyValue(e.target.value);
  };

  return (
    <div>
      {label && <label className="form-label">{label}</label>}
      <div className="d-flex align-items-center gap-3 mb-2">
        {value ? (
          <img
            src={value}
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
          {uploading && <small className="text-muted d-block mt-1"><i className="fas fa-spinner fa-spin me-1"></i>Subiendo imagen...</small>}
          {error && <small className="text-danger d-block mt-1">{error}</small>}
        </div>
      </div>
      <input
        type="url"
        className="form-control form-control-sm"
        placeholder="...o pega una URL de imagen"
        value={value || ''}
        onChange={handleUrlChange}
      />
    </div>
  );
};

export default ImageUploadField;

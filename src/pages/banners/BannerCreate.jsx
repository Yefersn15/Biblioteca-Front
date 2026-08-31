import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBanner } from './services/bannersService';
import { useBannerForm } from './hooks/useBannerForm';
import BannerFormFields from './components/BannerFormFields';
import { useToast } from '../../context/ToastContext';
import { useAyudaPagina } from '../../hooks/useAyudaPagina';

const BannerCreate = () => {
  useAyudaPagina({
    titulo: 'Nuevo banner',
    contenido: (
      <>
        <p>Elige un layout (una imagen, dos, collage...) y luego el tipo de contenido: <strong>Imágenes</strong> (subes tú los archivos) o <strong>Autores</strong> (se arma solo con las fotos de los autores que elijas).</p>
        <p>El orden de visualización decide cuál banner activo aparece primero en el inicio.</p>
      </>
    ),
  });
  const navigate = useNavigate();
  const toast = useToast();
  const { form, errors, setLayout, setImageUrl, setField, setContentType, validate } = useBannerForm();
  const [loading, setLoading] = useState(false);
  const imageRefs = useRef([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      let payload = form;
      if (form.contentType === 'IMAGENES') {
        const resultados = await Promise.all(imageRefs.current.map((r) => r?.resolverPendiente()));
        if (resultados.some((r) => r?.ok === false)) {
          setLoading(false);
          return;
        }
        const images = form.images.map((img, i) => (
          resultados[i]?.changed ? { slot: img.slot, url: resultados[i].url, publicId: resultados[i].publicId } : img
        ));
        payload = { ...form, images };
      }
      await createBanner(payload);
      navigate('/admin/banners');
    } catch (err) {
      toast.error('Error al crear banner: ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ maxWidth: 960 }}>
      <div className="card shadow">
        <div className="card-header bg-success text-white">
          <h2 className="mb-0"><i className="fas fa-plus me-2"></i>Nuevo Banner</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <BannerFormFields
              form={form}
              errors={errors}
              setLayout={setLayout}
              setImageUrl={setImageUrl}
              setField={setField}
              setContentType={setContentType}
              imageRefs={imageRefs}
            />

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary me-md-2" disabled={loading}>
                {loading ? 'Creando...' : (<><i className="fas fa-save me-2"></i>Crear Banner</>)}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/banners')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BannerCreate;

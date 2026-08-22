// src/pages/banners/hooks/useBannersAdmin.js
import { useState, useEffect } from 'react';
import { getBanners, deleteBanner, updateBanner } from '../services/bannersService';
import { useConfirm } from '../../../context/ConfirmContext';

export const useBannersAdmin = () => {
  const confirm = useConfirm();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [layoutFiltro, setLayoutFiltro] = useState('');

  // Debounce: espera 300ms sin cambios antes de disparar la búsqueda, para
  // no hacer una petición por cada tecla presionada.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const cargarBanners = async () => {
    setLoading(true);
    const data = (await getBanners({
      search: debouncedSearch || undefined,
      estado: estadoFiltro === '' ? undefined : estadoFiltro === 'true',
      layout: layoutFiltro || undefined,
      limit: 100,
    })) || [];
    setBanners(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarBanners();
  }, [debouncedSearch, estadoFiltro, layoutFiltro]);

  const handleDelete = async (id) => {
    if (!(await confirm('¿Eliminar este banner?'))) return;
    await deleteBanner(id);
    await cargarBanners();
  };

  const handleToggleEstado = async (banner) => {
    await updateBanner(banner.id, { estado: !banner.estado });
    await cargarBanners();
  };

  return {
    banners,
    loading,
    search,
    setSearch,
    estadoFiltro,
    setEstadoFiltro,
    layoutFiltro,
    setLayoutFiltro,
    cargarBanners,
    handleDelete,
    handleToggleEstado,
  };
};

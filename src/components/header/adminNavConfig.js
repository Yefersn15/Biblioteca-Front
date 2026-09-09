// src/components/header/adminNavConfig.js
// Lista de accesos al panel admin, compartida entre el propio panel
// (AdminLayout.jsx, como sidebar/topbar) y el header público (Header.jsx,
// como un desplegable "Administración" visible solo para staff) — antes
// solo existía en AdminLayout.jsx y el header público apenas tenía un
// único link a "/admin/dashboard".
export const ENLACES_ADMIN_BASE = [
  { to: '/admin/dashboard', label: 'Inicio', icon: 'fa-gauge', end: true },
  { to: '/admin/libros', label: 'Libros', icon: 'fa-book' },
  { to: '/admin/autores', label: 'Autores', icon: 'fa-feather' },
  { to: '/admin/editoriales', label: 'Editoriales', icon: 'fa-building' },
  { to: '/admin/categorias', label: 'Categorías', icon: 'fa-tags' },
  { to: '/admin/prestamos', label: 'Préstamos', icon: 'fa-right-left' },
  { to: '/admin/banners', label: 'Banners', icon: 'fa-images' },
];

// Solo para ADMIN, no BIBLIOTECARIO (ver isAdmin en AdminLayout.jsx/Header.jsx).
export const ENLACES_SOLO_ADMIN = [
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'fa-users' },
  { to: '/admin/configuracion', label: 'Configuración', icon: 'fa-gear' },
];

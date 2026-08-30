import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import AdminLayout from './AdminLayout';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Perfil from '../pages/usuarios/Perfil';
import CatalogoLibros from '../pages/libros/CatalogoLibros';
import LibroDetalle from '../pages/libros/LibroDetalle';
import MisPrestamos from '../pages/prestamos/MisPrestamos';
import AutoresPublicos from '../pages/autores/AutoresPublicos';
import AutorPublico from '../pages/autores/AutorPublico';
import EditorialesPublicas from '../pages/editoriales/EditorialesPublicas';
import EditorialPublica from '../pages/editoriales/EditorialPublica';
import CategoriasPublicas from '../pages/categorias/CategoriasPublicas';

import AdminDashboard from '../pages/dashboard/AdminDashboard';
import LibrosAdmin from '../pages/libros/LibrosAdmin';
import LibroForm from '../pages/libros/LibroForm';
import AutoresAdmin from '../pages/autores/AutoresAdmin';
import AutorForm from '../pages/autores/AutorForm';
import EditorialesAdmin from '../pages/editoriales/EditorialesAdmin';
import EditorialForm from '../pages/editoriales/EditorialForm';
import CategoriasAdmin from '../pages/categorias/CategoriasAdmin';
import CategoriaForm from '../pages/categorias/CategoriaForm';
import PrestamosAdmin from '../pages/prestamos/PrestamosAdmin';
import UsuariosAdmin from '../pages/usuarios/UsuariosAdmin';
import UsuarioForm from '../pages/usuarios/UsuarioForm';
import AdminBanners from '../pages/banners/AdminBanners';
import BannerCreate from '../pages/banners/BannerCreate';
import BannerEdit from '../pages/banners/BannerEdit';
import ConfiguracionAdmin from '../pages/home/ConfiguracionAdmin';

const Rutas = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/catalogo" element={<CatalogoLibros />} />
      <Route path="/catalogo/autores" element={<AutoresPublicos />} />
      <Route path="/catalogo/autores/:id" element={<AutorPublico />} />
      <Route path="/catalogo/editoriales" element={<EditorialesPublicas />} />
      <Route path="/catalogo/editoriales/:id" element={<EditorialPublica />} />
      <Route path="/catalogo/categorias" element={<CategoriasPublicas />} />
      <Route path="/catalogo/:id" element={<LibroDetalle />} />
      <Route path="/login" element={<PrivateRoute requireGuest><Login /></PrivateRoute>} />
      <Route path="/registro" element={<PrivateRoute requireGuest><Register /></PrivateRoute>} />
      <Route path="/recuperar-password" element={<PrivateRoute requireGuest><ForgotPassword /></PrivateRoute>} />
      <Route path="/restablecer-password" element={<PrivateRoute requireGuest><ResetPassword /></PrivateRoute>} />
      <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
      <Route path="/mis-prestamos" element={<PrivateRoute><MisPrestamos /></PrivateRoute>} />
    </Route>

    <Route
      path="/admin"
      element={<PrivateRoute staffOnly><AdminLayout /></PrivateRoute>}
    >
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="libros" element={<LibrosAdmin />} />
      <Route path="libros/nuevo" element={<LibroForm />} />
      <Route path="libros/editar/:id" element={<LibroForm />} />
      <Route path="autores" element={<AutoresAdmin />} />
      <Route path="autores/nuevo" element={<AutorForm />} />
      <Route path="autores/editar/:id" element={<AutorForm />} />
      <Route path="editoriales" element={<EditorialesAdmin />} />
      <Route path="editoriales/nueva" element={<EditorialForm />} />
      <Route path="editoriales/editar/:id" element={<EditorialForm />} />
      <Route path="categorias" element={<CategoriasAdmin />} />
      <Route path="categorias/nueva" element={<CategoriaForm />} />
      <Route path="categorias/editar/:id" element={<CategoriaForm />} />
      <Route path="prestamos" element={<PrestamosAdmin />} />
      <Route path="banners" element={<AdminBanners />} />
      <Route path="banners/nuevo" element={<BannerCreate />} />
      <Route path="banners/editar/:id" element={<BannerEdit />} />
      <Route path="usuarios" element={<UsuariosAdmin />} />
      <Route path="usuarios/editar/:id" element={<UsuarioForm />} />
      <Route path="configuracion" element={<ConfiguracionAdmin />} />
    </Route>
  </Routes>
);

export default Rutas;

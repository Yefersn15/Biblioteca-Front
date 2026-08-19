// src/pages/dashboard/services/dashboardService.js
import { getLibros } from '../../../services/api/libros.api';
import { getAll as getAutores } from '../../../services/api/autores.api';
import { getAll as getEditoriales } from '../../../services/api/editoriales.api';
import { getAll as getCategorias } from '../../../services/api/categorias.api';
import { getPrestamos } from '../../../services/api/prestamos.api';
import { getUsuarios } from '../../../services/api/usuarios.api';
import { getResumenEstadisticas } from '../../../services/api/estadisticas.api';

export const getResumenLibros = (params) => getLibros(params);
export const getResumenAutores = (params) => getAutores(params);
export const getResumenEditoriales = (params) => getEditoriales(params);
export const getResumenCategorias = (params) => getCategorias(params);
export const getResumenPrestamos = (params) => getPrestamos(params);
export const getResumenUsuarios = (params) => getUsuarios(params);
export const getEstadisticasResumen = () => getResumenEstadisticas();

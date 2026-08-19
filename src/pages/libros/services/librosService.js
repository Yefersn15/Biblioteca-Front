// src/pages/libros/services/librosService.js
import * as librosApi from '../../../services/api/libros.api';

export const getLibros = librosApi.getLibros;
export const getLibro = librosApi.getLibro;
export const getLibrosPopulares = librosApi.getLibrosPopulares;
export const crearLibro = librosApi.crearLibro;
export const actualizarLibro = librosApi.actualizarLibro;
export const eliminarLibro = librosApi.eliminarLibro;

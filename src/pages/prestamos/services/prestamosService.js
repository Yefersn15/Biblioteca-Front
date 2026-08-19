// src/pages/prestamos/services/prestamosService.js
import * as prestamosApi from '../../../services/api/prestamos.api';

export const getPrestamos = prestamosApi.getPrestamos;
export const getPrestamo = prestamosApi.getPrestamo;
export const solicitarPrestamo = prestamosApi.solicitarPrestamo;
export const aprobarPrestamo = prestamosApi.aprobarPrestamo;
export const rechazarPrestamo = prestamosApi.rechazarPrestamo;
export const devolverPrestamo = prestamosApi.devolverPrestamo;
